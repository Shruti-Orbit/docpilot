import api from "@/lib/axios";

export const getRecentToolCalls = async (workspaceId: string) => {
  const response = await api.get(`/tools/recent/${workspaceId}`);

  return response.data;
};
