import api from "@/lib/axios";

export const uploadDocument = async (formData: FormData) => {
    const token = localStorage.getItem("token");

    const response = await api.post("/documents/upload", formData, {
        headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getDocuments = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/documents", {
        headers: {
            Authorization: token,
        },
    });

    return response.data;
};

export const deleteDocument = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/documents/${id}`, {
        headers: {
            Authorization: token,
        },
    });

    return response.data;
};