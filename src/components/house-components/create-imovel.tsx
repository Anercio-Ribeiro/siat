"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Import data
import provincias from "@/lib/data/provincias.json";
import municipiosData from "@/lib/data/municipiosData.json";

// Dynamic import for Map component
const MapWithNoSSR = dynamic(() => import("../map-component/map"), {
  ssr: false
});

// Schema definition
const imovelSchema = z.object({
  titulo: z.string().min(3, { message: "O título é obrigatório." }),
  descricao: z.string().min(10, { message: "A descrição é obrigatória." }),
  preco: z.preprocess((val) => Number(val), z.number().min(1, { message: "O preço é obrigatório." })),
  provincia: z.string().min(3, { message: "Selecione a província." }),
  municipio: z.string().min(3, { message: "Selecione o municipio." }),
  bairro: z.string().min(3, { message: "Digite o bairro." }),
  endereco: z.string().min(3, { message: "Digite o endereço." }),
  tipologia: z.string().min(2, { message: "Digite a tipologia." }),
  numeroQuarto: z.preprocess((val) => Number(val), z.number().min(1)),
  numeroCasaBanho: z.preprocess((val) => Number(val), z.number().min(1)),
  garagem: z.preprocess((val) => Number(val), z.number().min(0)),
  latitude: z.number({ required_error: "Selecione a localização no mapa" }),
  longitude: z.number({ required_error: "Selecione a localização no mapa" }),
});

type FormData = z.infer<typeof imovelSchema>;
type FileWithPreview = { file: File; preview: string; };

const RegistrarImovelForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  // Form initialization
  const form = useForm<FormData>({
    resolver: zodResolver(imovelSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      preco: 0,
      provincia: "",
      municipio: "",
      bairro: "",
      endereco: "",
      tipologia: "",
      numeroQuarto: 0,
      numeroCasaBanho: 0,
      garagem: 0,
      latitude: undefined,
      longitude: undefined,
    }
  });

  // File handling
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(prev => ({ ...prev, [file.name]: percent }));
        }
      };

      reader.onloadend = () => {
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
          setTimeout(() => {
            setFiles(prev => [...prev, { file, preview: URL.createObjectURL(file) }]);
            setUploadProgress(prev => {
              const { [file.name]: _, ...rest } = prev;
              return rest;
            });
          }, 500);
        }, 500);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Map handler
  const handleMapClick = (lat: number, lng: number) => {
    form.setValue("latitude", lat);
    form.setValue("longitude", lng);
  };

  // Form handlers
  const handleProvinciaChange = (provinciaId: string) => {
    const novosMunicipios = municipiosData[provinciaId as keyof typeof municipiosData] || [];
    form.setValue("municipio", "");
    setMunicipios(novosMunicipios);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Upload images first
      const imageUrls = await Promise.all(
        files.map(async ({ file }) => {
          const formData = new FormData();
          formData.append("file", file);
          const response = await fetch("/api/imoveis/upload", {
            method: "POST",
            body: formData,
          });
          const { url } = await response.json();
          return url;
        })
      );

      // Create imóvel with images
      const response = await fetch("/api/imoveis/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          imagens: imageUrls,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar imóvel");
      }

      toast.success("Imóvel registrado com sucesso!");
      setIsOpen(false);
      form.reset();
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao registrar imóvel");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Registrar Imóvel</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Registrar Novo Imóvel</DialogTitle>
            <DialogDescription>
              Preencha os dados do imóvel e selecione sua localização no mapa
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="h-[400px] mb-4">
                <MapWithNoSSR
                  onLocationSelected={handleMapClick}
                  selectedLocation={form.watch(["latitude", "longitude"]).every(Boolean) ? {
                    lat: form.watch("latitude"),
                    lng: form.watch("longitude")
                  } : null}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <FormLabel>Preço (AKZ)</FormLabel>
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
                      <Select onValueChange={(value) => {
                        field.onChange(value);
                        handleProvinciaChange(value);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a província" />
                        </SelectTrigger>
                        <SelectContent>
                          {provincias.map((provincia) => (
                            <SelectItem key={provincia.id} value={provincia.id}>
                              {provincia.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="municipio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Município</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o município" />
                        </SelectTrigger>
                        <SelectContent>
                          {municipios.map((municipio) => (
                            <SelectItem key={municipio} value={municipio}>
                              {municipio}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer">
                  <input {...getInputProps()} />
                  <p>Arraste e solte arquivos aqui, ou clique para selecionar arquivos</p>
                </div>

                <ScrollArea className="h-32 mt-2">
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={file.preview}
                          alt={`Preview ${index}`}
                          width={100}
                          height={100}
                          className="rounded object-cover"
                        />
                        <Button
                          type="button"
                          onClick={() => setFiles(files.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {Object.keys(uploadProgress).length > 0 && (
                  <Progress 
                    value={
                      Object.values(uploadProgress).reduce((a, b) => a + b, 0) / 
                      Object.keys(uploadProgress).length
                    } 
                    className="mt-2"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registrando..." : "Registrar Imóvel"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrarImovelForm;