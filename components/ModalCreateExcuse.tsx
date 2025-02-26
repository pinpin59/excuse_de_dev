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

export default function ModalCreateExcuse({ onSuccess }: { onSuccess: () => void }) {
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

      if (onSuccess) onSuccess();
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
      <Modal isOpen={isOpen} size={size}  placement="center" onClose={onClose}
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
                <Form className="w-full mx-auto max-w-xs" onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        errorMessage="Entrez un code HTTP valide"
                        label="Http Code"
                        labelPlacement="outside"
                        name="http_code"
                        placeholder="Entrez le code HTTP"
                        type="number"
                        value={formState.http_code}
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        className="pt-3"
                        errorMessage="Entrez un tag valide"
                        label="Tag"
                        labelPlacement="outside"
                        name="tag"
                        placeholder="Entrez le tag"
                        type="text"
                        value={formState.tag}
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        className="pt-3"
                        errorMessage="Entrez un message valide"
                        label="Excuse"
                        labelPlacement="outside"
                        name="message"
                        placeholder="Entrez votre excuse"
                        type="text"
                        value={formState.message}
                        onChange={handleChange}
                    />
                    <div className="flex justify-between align-middle w-full mt-4">
                      <Button color="danger" variant="light" onPress={onClose}>
                          Fermer
                      </Button>
                      <Button color="success" type="submit" variant="flat">
                          Créer
                      </Button>
                    </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

