'use client';
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

export default function GenerateExcuseButton() {
    const [excuses, setExcuses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/excuses?all=true')
          .then(response => response.json())
          .then(data => {
            setExcuses(data);
            console.log(data)
          })
          .catch(error => console.error('Error fetching excuses:', error));
    }, []);
    console.log('ok');
    
    return (
        <Button color="secondary" size="lg">Trouver une excuse</Button>
    );
}