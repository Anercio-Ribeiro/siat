"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { X } from "lucide-react";

// Definindo a tipagem correta dos arquivos
type FileWithPreview = {
  file: File;
  preview: string;
};

type UploadProgress = {
  [key: string]: number;
};

// Definindo o schema de validação com Zod
const imovelSchema = z.object({
  titulo: z.string().min(3, { message: "O título é obrigatório." }),
  descricao: z.string().min(10, { message: "A descrição é obrigatória." }),
  preco: z.preprocess((val) => Number(val), z.number().min(1, { message: "O preço é obrigatório." })),
  provincia: z.string().min(3, { message: "Selecione a província." }),
  bairro: z.string().min(3, { message: "Digite o bairro." }),
  endereco: z.string().min(3, { message: "Digite o endereço." }),
  tipologia: z.string().min(2, { message: "Digite o tipologia." }),
  numeroQuarto: z.preprocess((val) => Number(val), z.number().min(1)),
  numeroCasaBanho: z.preprocess((val) => Number(val), z.number().min(1)),
  garagem: z.preprocess((val) => Number(val), z.number().min(0)),
});

const RegisterImovelForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(imovelSchema),
  });

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: percent,
          }));
        }
      };

      reader.onloadend = () => {
        setTimeout(() => {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));

          setTimeout(() => {
            setFiles((prev) => [...prev, { file, preview: URL.createObjectURL(file) }]);
            setUploadProgress((prev) => {
              const updatedProgress = { ...prev };
              delete updatedProgress[file.name];
              return updatedProgress;
            });
          }, 500);
        }, 500);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.file.name !== fileName));
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      const imagens = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file.file);

          const uploadResponse = await fetch("/api/imoveis/upload", {
            method: "POST",
            body: formData,
          });
          const { url } = await uploadResponse.json();
          return url;
        })
      );

      const response = await fetch("/api/imoveis/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          imagens,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar o imóvel.");
      }

      const result = await response.json();
      console.log("Imóvel registrado com sucesso:", result);
      setIsOpen(false); // Fechar o popup após o sucesso
      form.reset(); // Resetar o formulário
      setFiles([]); // Limpar os arquivos

    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Registrar Imóvel</Button>

      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="w-[900px]">
          <DialogHeader>
            <DialogTitle>Registrar Imóvel</DialogTitle>
            <DialogDescription>Preencha as informações abaixo para registrar o imóvel.</DialogDescription>
            <DialogClose asChild>
              <Button onClick={() => setIsOpen(false)} variant="ghost" className="absolute right-4 top-4">
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <Form {...form}>
            <form className="grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
              {/* Campos do formulário */}
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
                control={form.control}
                name="tipologia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipologia</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="provincia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Província</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a província" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Luanda">Luanda</SelectItem>
                          <SelectItem value="Benguela">Benguela</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroQuarto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Quartos</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroCasaBanho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Casas de Banho</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="garagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Garagem</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
               <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              
              {/* Dropzone para upload de imagens */}
              <div className="col-span-2">
                <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer">
                  <input {...getInputProps()} />
                  <p>Arraste e solte arquivos aqui, ou clique para selecionar arquivos.</p>
                </div>
                <div className="mt-2">
                  {files.map((file, index) => (
                    <div key={index} className="relative inline-block mr-2 mb-2">
                      <Image
                        src={file.preview}
                        alt={`Preview ${index}`}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                      <Button
                        type="button"
                        className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                        onClick={() => removeFile(file.file.name)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Progress value={Object.values(uploadProgress).reduce((a, b) => a + b, 0) / files.length || 0} />
              </div>
              
              {/* Botão de submit */}
              <div className="col-span-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Registrar Imóvel"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterImovelForm;
