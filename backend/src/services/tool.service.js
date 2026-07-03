const Task = require("../models/Task");
const Note = require("../models/Note");
const ToolCall = require("../models/ToolCall");
const model = require("../config/gemini");
const {
  FunctionCallingMode,
  SchemaType,
} = require("@google/generative-ai");

const toolConfig = {
  tools: [
    {
      functionDeclarations: [
        {
          name: "saveTask",
          description:
            "Save a task the user wants to remember or complete later.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              title: {
                type: SchemaType.STRING,
                description: "Short task title.",
              },
              description: {
                type: SchemaType.STRING,
                description: "Task details.",
              },
            },
            required: ["title", "description"],
          },
        },
        {
          name: "saveNote",
          description:
            "Save a note the user explicitly wants to store.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              title: {
                type: SchemaType.STRING,
                description: "Short note title.",
              },
              content: {
                type: SchemaType.STRING,
                description: "Note content.",
              },
            },
            required: ["title", "content"],
          },
        },
      ],
    },
  ],
  toolConfig: {
    functionCallingConfig: {
      mode: FunctionCallingMode.AUTO,
    },
  },
};

const validateToolCall = (toolName, args) => {
  if (toolName === "saveTask") {
    return Boolean(args.title && args.description);
  }

  if (toolName === "saveNote") {
    return Boolean(args.title && args.content);
  }

  return false;
};

const logToolCall = async ({
  userId,
  workspaceId,
  toolName,
  args,
  success,
}) => {
  await ToolCall.create({
    user: userId,
    workspace: workspaceId,
    toolName,
    arguments: args,
    success,
  });
};

const executeToolCall = async ({
  userId,
  workspaceId,
  toolName,
  args,
}) => {
  if (!validateToolCall(toolName, args)) {
    await logToolCall({
      userId,
      workspaceId,
      toolName,
      args,
      success: false,
    });

    return {
      success: false,
      answer: "I couldn't save that because the tool arguments were incomplete.",
    };
  }

  if (toolName !== "saveTask" && toolName !== "saveNote") {
    await logToolCall({
      userId,
      workspaceId,
      toolName,
      args,
      success: false,
    });

    return {
      success: false,
      answer: "I don't have that tool available.",
    };
  }

  try {
    if (toolName === "saveTask") {
      await Task.create({
        user: userId,
        workspace: workspaceId,
        title: args.title,
        description: args.description,
        status: "pending",
      });
    } else {
      await Note.create({
        user: userId,
        workspace: workspaceId,
        title: args.title,
        content: args.content,
      });
    }
  } catch (error) {
    await logToolCall({
      userId,
      workspaceId,
      toolName,
      args,
      success: false,
    });

    return {
      success: false,
      answer: "I couldn't save that right now.",
    };
  }

  await logToolCall({
    userId,
    workspaceId,
    toolName,
    args,
    success: true,
  });

  return {
    success: true,
    answer:
      toolName === "saveTask"
        ? "Task saved successfully."
        : "Note saved successfully.",
  };
};

const runGeminiToolCalling = async ({
  context,
  question,
  userId,
  workspaceId,
}) => {
  const prompt = `
You are DocPilot AI.

Use the retrieved context to answer the user.

If the user asks you to save a task or note, decide whether to call one of the provided tools.

Retrieved context:

${context}

User question:

${question}
`;

  const firstResult = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    ...toolConfig,
  });

  const functionCall =
    firstResult.response.functionCalls?.()?.[0];

  if (!functionCall) {
    return {
      handled: false,
    };
  }

  const toolResult = await executeToolCall({
    userId,
    workspaceId,
    toolName: functionCall.name,
    args: functionCall.args || {},
  });

  const finalResult = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
      {
        role: "model",
        parts: [{ functionCall }],
      },
      {
        role: "function",
        parts: [
          {
            functionResponse: {
              name: functionCall.name,
              response: toolResult,
            },
          },
        ],
      },
    ],
    ...toolConfig,
  });

  return {
    handled: true,
    answer: finalResult.response.text(),
  };
};

module.exports = {
  executeToolCall,
  runGeminiToolCalling,
};
