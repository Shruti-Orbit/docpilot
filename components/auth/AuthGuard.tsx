"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Checking Authentication...
            </div>
        );
    }

    return <>{children}</>;
}