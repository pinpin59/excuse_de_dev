"use client";
import AlertComponent from "@/components/Alert";
import BreadcrumbComponent from "@/components/Breadcrumb";
import GenerateExcuseButton from "@/components/GenerateExcuseButton";
import ModalCreateExcuse from "@/components/ModalCreateExcuse";
import { Excuse } from "@/types/excuse";
import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {

  const [showButton, setShowButton] = useState(false);
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | null>(null); // État pour stocker l'excuse
  const [alert, setAlert] = useState(false);

  // Callback 
  const handleNewExcuse = (excuse: Excuse) => {
    setCurrentExcuse(excuse); // Met à jour l'excuse dans l'état parent
  };

  //Callback
  const handleSuccessAlert = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 5000); // Cache l'alerte après 3s
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

      <nav className="absolute top-4 gap-4 flex align-center justify-between w-full px-5" aria-label="Navigation principale">
        <div>
          <BreadcrumbComponent />
        </div>
        <div className="flex">
          <Link className="mr-4" href="/excuses">
            <Button  radius="none" color="secondary" size="lg">Voir les excuses</Button>
          </Link>
          <ModalCreateExcuse onSuccess={handleSuccessAlert}  />
        </div>
      </nav>
      {/* Animation du titre */}
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: showButton ? -100 : 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-4"
        >
        Les excuses de Dev 
      </motion.h1>
 
      <p className="text-lg font-delius mb-10">{currentExcuse ? currentExcuse.message : "Pas d'excuses !"}</p>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, delay: 2 }}
      >
        <GenerateExcuseButton onExcuseGenerated={handleNewExcuse} />
      </motion.div>

      {/* Alert */}
      <AnimatePresence>
      {alert && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-4 right-4"
        >
          <AlertComponent color="success" message="Excuse ajoutée avec succès !" />
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

