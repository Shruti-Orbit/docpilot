import api from "@/lib/axios";

export const uploadDocument = async (formData: FormData) => {
  const response = await api.post("/documents/upload", formData);
  return response.data;
};

export const getDocuments = async () => {
  const response = await api.get("/documents");
  return response.data;
};

export const deleteDocument = async (id: string) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};