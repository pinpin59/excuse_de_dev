"use client";
import Footer from "@/components/Footer";
import GenerateExcuseButton from "@/components/GenerateExcuseButton";
import ModalCreateExcuse from "@/components/ModalCreateExcuse";
import { Excuse } from "@/types/excuse";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {

  const [showButton, setShowButton] = useState(false);
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | null>(null); // État pour stocker l'excuse

  const handleNewExcuse = (excuse: Excuse) => {
    setCurrentExcuse(excuse); // Met à jour l'excuse dans l'état parent
  };

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
        <ModalCreateExcuse />
      </div>
 
      <p className="text-lg mb-10">{currentExcuse ? currentExcuse.message : "Pas d'excuses !"}</p>
      <GenerateExcuseButton onExcuseGenerated={handleNewExcuse} />
      <section className="absolute bottom-0 left-0 w-full">
        <Footer />
      </section>
    </div>
  );
}

