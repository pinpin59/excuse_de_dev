"use client";

import AlertError from "@/components/AlertError";
import ExcuseCard from "@/components/ExcuseCard";
import HomeButton from "@/components/HomeButton";
import Loader from "@/components/Spinner";
import { Excuse } from "@/types/excuse";
import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";

export default function Page({ params }: { params: Promise<{ http_code: string }> }) {
  const resolvedParams = use(params); 
  const [data, setData] = useState<Excuse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  useEffect(() => {
    if (!resolvedParams.http_code) return; 

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/excuse-by-code/${resolvedParams.http_code}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const result = await response.json();
        setData(result);
        
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          const timer = setTimeout(() => {
            router.push("/");
            }, 3000);
            return () => clearTimeout(timer);
        } else {
          setError("Une erreur inconnue est survenue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.http_code, router]); // Déclenche le fetch quand resolvedParams.http_code change

    if (loading) return <div className="min-h-screen flex flex-col items-center justify-center"><Loader /></div>;
    if (error) return <AlertError error={error}/>;
  
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
