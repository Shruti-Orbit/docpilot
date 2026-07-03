import api from "@/lib/axios";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");
  const workspaceId = localStorage.getItem("workspaceId");

  const response = await api.get("/dashboard", {
    headers: {
      Authorization: token,
    },
    params: {
      workspaceId,
    },
  });

  return response.data;
};