"use client"; // Obligatoire car on utilise useEffect

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LostPage() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
        router.push("/");
        }, 5000); // Redirection après 3 secondes
    }, []);

    return (
        <div>Lost</div>
    )
}
