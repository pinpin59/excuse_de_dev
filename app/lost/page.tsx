"use client"; // Obligatoire car on utilise useEffect

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LostPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
        router.push("/");
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex justify-center flex-col items-center min-h-screen">
            <p className="text-4xl font-bold text-purple-200">I'm lost</p>
            <img src="/lost.gif" alt="GIF animé" className="w-64 h-64" />
        </div>
    ) 
} 
