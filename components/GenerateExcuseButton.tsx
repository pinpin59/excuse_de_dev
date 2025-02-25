'use client';
import { Excuse } from "@/types/excuse";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import ButtonLoader from "./ButtonLoader";
interface GenerateExcuseButtonProps {
  onExcuseGenerated: (excuse: Excuse) => void; // Callback pour envoyer l'excuse au parent
}
export default function GenerateExcuseButton({ onExcuseGenerated }: GenerateExcuseButtonProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [excuses, setExcuses] = useState<Excuse[]>([]);
    const [usedExcuses, setUsedExcuses] = useState<Excuse[]>([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/api/excuses?all=true`)
          .then(response => response.json())
          .then(data => {
            setExcuses(data);
            console.log(data)
          })
          .catch(error => console.error('Error fetching excuses:', error));
    }, []);
    
    const handleClick = () => {
        setIsLoading(true);
        if (excuses.length === 0) return; 

        // Filtre des excuses non utilisées
        const unusedExcuses = excuses.filter(excuse => !usedExcuses.includes(excuse));

        // Si toutes les excuses ont été utilisées, réinitialiser l'état
        if (unusedExcuses.length === 0) {
            setUsedExcuses([]);
            alert('Toutes les excuses ont été utilisées. Réinitialisation...');
            return;
        }

        // Choisir une excuse aléatoire parmi celles qui n'ont pas encore été utilisées
        const randomIndex = Math.floor(Math.random() * unusedExcuses.length);
        const randomExcuse = unusedExcuses[randomIndex];

        // Mettre à jour l'état pour l'excuse actuelle et marquer cette excuse comme utilisée
        const timer = setTimeout(() => {
          setIsLoading(false);
          onExcuseGenerated(randomExcuse);
          setUsedExcuses(prevUsedExcuses => [...prevUsedExcuses, randomExcuse]);
          return () => clearTimeout(timer);
        }, 1000);
    };

    return (
        isLoading ? 
        (
            <ButtonLoader />
        ) : (
              <Button color="secondary" size="lg" onPress={handleClick}>
                  Générer une excuse
              </Button>
            )
    )
}