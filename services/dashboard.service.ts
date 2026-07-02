import api from "@/lib/axios";

export const getDashboard = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/dashboard", {
        headers: {
            Authorization: token,
        },
    });

    return response.data;
};