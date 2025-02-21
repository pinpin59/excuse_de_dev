'use client';
import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-purple-200">404 - Page non trouvée</h1>
        <p className="text-lg  mt-2">Désolé, la page que vous cherchez n'existe pas.</p>
        <Link className="mt-5" href="/">
            <Button color="secondary" size="lg" className="mt-4">Retour à l'accueil</Button>
        </Link>
      </div>
    );
}