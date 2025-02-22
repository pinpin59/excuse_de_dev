"use client";
import GenerateExcuseButton from "@/components/GenerateExcuseButton";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Après 2 secondes, affiche le bouton et fait monter le titre
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-4">

      {/* Animation du titre */}
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: showButton ? -100 : 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-4"
        >
        Les excuses de Dev 
      </motion.h1>
      <div className="absolute top-4 right-4 flex gap-4">
        <Link href="/excuses">
          <Button  radius="none" color="secondary" size="lg">Voir les excuses</Button>
        </Link>
        <Link href="/lost">
          <Button  radius="none" color="secondary" size="lg">Créer une excuse</Button>
        </Link>
      </div>
 
      <p className="text-lg mb-10">Découvrez une expérience incroyable avec HeroUI.</p>
      <GenerateExcuseButton/>
    </div>
  );
}

