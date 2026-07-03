import api from "@/lib/axios";

export const createWorkspace = async (data: {
  name: string;
  description: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/workspaces", data, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export const getWorkspaces = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/workspaces", {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};