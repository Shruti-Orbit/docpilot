#  DocPilot AI
### Multi-Workspace Document Assistant (RAG & Tool Calling)

DocPilot AI is an AI-powered document assistant that allows users to upload PDF documents, chat with them using Retrieval-Augmented Generation (RAG), manage multiple workspaces, and perform AI-powered tool actions such as saving tasks and notes.

The application ensures strict workspace isolation while storing document embeddings in a shared vector database.

---

#  Features

##  Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

##  Workspace Management

- Create Multiple Workspaces
- Switch Between Workspaces
- Workspace Isolation
- Separate Documents Per Workspace

---

##  Document Management

- Upload PDF Documents
- Automatic Text Extraction
- AI Generated Summary
- Continue Working Section
- Recent Documents

---

##  AI Command Center

- Ask Questions About Uploaded PDFs
- Suggested AI Prompts
- Chat Interface
- Chat History
- Source Citations

---

#  Retrieval-Augmented Generation (RAG)

The application uses Retrieval-Augmented Generation instead of sending the complete document to the LLM.

Workflow:

User Question

↓

Generate Query Embedding

↓

Retrieve Most Relevant Chunks

↓

Workspace Filtering

↓

Gemini

↓

Grounded Response

↓

Source Citations

Only the retrieved chunks are sent to Gemini, making responses faster, cheaper and more accurate.

---

# Shared Vector Store

Instead of creating a separate vector database for every workspace, all document chunks are stored in a single MongoDB collection.

Each chunk contains:

- User ID
- Workspace ID
- Document ID
- Filename
- Chunk Number
- Text Chunk
- Embedding

Workspace filtering ensures complete isolation.

---

#  Workspace Isolation

Every query is filtered using:

- User ID
- Workspace ID

This guarantees that documents from one workspace cannot be retrieved from another workspace.

---

#  Tool Calling

The assistant supports real Gemini Function Calling.

Implemented tools:

###  Save Task

Stores tasks in MongoDB.

Fields:

- Title
- Description
- Status
- Workspace
- User

---

###  Save Note

Stores notes in MongoDB.

Fields:

- Title
- Content
- Workspace
- User

---

The backend validates every tool request before execution.

Every execution is logged.

---

# Tool Call Log

Every successful or failed tool execution is stored.

Fields:

- Tool Name
- Arguments
- Success
- Workspace
- User
- Timestamp

Dashboard displays the latest tool activity.

---

#  Chat History

Every AI conversation is stored per workspace.

Saved Data:

- User Question
- AI Response
- Workspace
- Document
- Timestamp

Switching workspaces automatically loads the corresponding history.

---

#  Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

---

## Backend

- Node.js
- Express.js
- JWT
- Multer
- PDF Parse

---

## Database

- MongoDB Atlas
- Mongoose

---

## AI

- Google Gemini 2.5 Flash
- Cohere Embeddings

---

#  Project Structure

```
DocPilot-AI
│
├── backend
│   ├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   └── config
│
├── components
├── services
├── app
├── public
├── README.md
├── AI_NOTES.md
├── DEPLOYMENT_GUIDE.pdf
└── .env.example
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Frontend

```bash
npm install

npm run dev
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

#  Environment Variables

Backend

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

GEMINI_API_KEY=

COHERE_API_KEY=
```

---

#  Deployment

## Frontend

Vercel

---

## Backend

Render

---

## Database

MongoDB Atlas

---

#  Testing

Verify the following features:

- User Registration
- Login
- Workspace Creation
- Workspace Switching
- PDF Upload
- AI Summary
- RAG Responses
- Source Citations
- Tool Calling
- Chat History
- Continue Working
- Dashboard
- Tool Call Logs

---

#  Future Improvements

- Streaming Responses
- OCR Support
- Hybrid Search
- Re-ranking
- Multi-document Comparison
- Team Collaboration
- Explicit Workspace Sharing

---

#  AI Assistance

AI tools were used only as development assistants for brainstorming, debugging, documentation, and implementation suggestions.

All project integration, testing, architecture decisions, debugging, and validation were performed manually.

More details are available in:

- AI_NOTES.md

---

#  Author

**Shruti Singh**

Frontend Developer

---

#  License

This project was developed for an educational assignment.