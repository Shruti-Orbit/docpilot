import api from "@/lib/axios";

export const askAI = async (data: {
  documentId: string;
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

export const getChats = async (documentId: string) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/chat/${documentId}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
