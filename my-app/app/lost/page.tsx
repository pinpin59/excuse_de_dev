"use client"; // Obligatoire car on utilise useEffect

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LostPage() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
        router.push("/");
        }, 5000);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <img src="/lost.gif" alt="GIF animé" className="w-64 h-64" />
        </div>
    ) 
} 
