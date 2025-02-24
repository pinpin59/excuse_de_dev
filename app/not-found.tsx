'use client';
import HomeButton from "@/components/HomeButton";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-purple-200">404 - Page non trouvée</h1>
        <p className="text-lg  mt-2">Désolé, la page que vous cherchez n'existe pas.</p>
        <HomeButton className="mt-4" />
      </div>
    );
}