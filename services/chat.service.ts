import api from "@/lib/axios";

export const askAI = async (data: {
  documentId: string;
  workspaceId: string;
  question: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/chat", data, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export const getChatHistory = async (workspaceId: string) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/chat/history/${workspaceId}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
