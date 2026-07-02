"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    return {
        authenticated,
    };
}