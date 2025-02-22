"use client";

import ExcuseCard from "@/components/ExcuseCard";
import HomeButton from "@/components/HomeButton";
import { Excuse } from "@/types/excuse";
import { use, useState, useEffect } from "react";

export default function Page({ params }: { params: Promise<{ http_code: string }> }) {
  const resolvedParams = use(params); // Récupérer le http_code avec use()
  const [data, setData] = useState<Excuse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resolvedParams.http_code) return; // Vérifie que le paramètre est bien défini

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/excuse-by-code/${resolvedParams.http_code}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const result = await response.json();
        setData(result);
        console.log(result);
        
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.http_code]); // Déclenche le fetch quand resolvedParams.http_code change

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
        <HomeButton className="absolute top-4 left-4" />
        {data && data.length > 0 ? (
            data.map((e) => 
                <div key={e.id} className="mt-4 p-4">
                    <ExcuseCard excuse={e}/>
                </div>
            )
        ) : (
            <p>Aucune donnée trouvée</p>
        )}
    </div>
  );
  
  
}
