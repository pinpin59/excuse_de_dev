import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Form,
} from "@heroui/react";

export default function ModalCreateExcuse() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full">("md");
  const [formState, setFormState] = useState({ http_code: "", tag: "", message: "" });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleOpen = (size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full") => {
    setSize(size);
    onOpen();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convertir le code HTTP en type number pour l'api
      const payload = {
        ...formState,
        http_code: Number(formState.http_code),
      };
      console.log(payload);
      const response = await fetch(`${API_URL}/api/excuses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données" + response.statusText +  response.status);
      }

      const data = await response.json();
      console.log("Réponse API :", data);

      // Réinitialiser le formulaire après succès
      setFormState({ http_code: "", tag: "", message: "" });
      onClose(); // Fermer le modal
    } catch (error) {
      console.error("Erreur API :", error);
    }
  };


  return (
    <>
      <div className="flex flex-wrap gap-3">
          <Button radius="none" color="secondary" size="lg" key={size} onPress={() => handleOpen(size)}>
                Créer une excuse
          </Button>
      </div>
      <Modal isOpen={isOpen} size={size} onClose={onClose}
      backdrop="opaque"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Créer une excuse</ModalHeader>
              <ModalBody>
                <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        errorMessage="Please enter HTTPCODE VALID"
                        label="Http Code"
                        labelPlacement="outside"
                        name="http_code"
                        placeholder="Enter your http_code"
                        type="number"
                        value={formState.http_code}
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        errorMessage="Please enter a valid tag"
                        label="tag"
                        labelPlacement="outside"
                        name="tag"
                        placeholder="Enter your tag"
                        type="text"
                        value={formState.tag}
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        errorMessage="Please enter a valid excuse"
                        label="message"
                        labelPlacement="outside"
                        name="message"
                        placeholder="Enter your excuse"
                        type="text"
                        value={formState.message}
                        onChange={handleChange}
                    />
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="bordered">
                        Submit
                    </Button>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

