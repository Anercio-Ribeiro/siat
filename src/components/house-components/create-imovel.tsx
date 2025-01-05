
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Import data
import provincias from "@/lib/data/provincias.json";
import municipiosData from "@/lib/data/municipiosData.json";

// Dynamic import for Map component
const MapWithNoSSR = dynamic(() => import("../map-component/map"), {
  ssr: false
});

// Constants
const TIPOS_PROXIMIDADE = [
  "HOSPITAL",
  "ESCOLA",
  "SHOPPING",
  "FARMACIA",
  "RESTAURANTE",
  "SUPERMERCADO",
  "ACADEMIA",
  "BANCO",
  "PARQUE",
] as const;

// Schema definitions
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
});

const proximidadeSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  tipo: z.enum(TIPOS_PROXIMIDADE),
  latitude: z.number(),
  longitude: z.number(),
  distancia: z.number(),
  imovelId: z.string()
});

const registerSchema = z.object({
  imovel: imovelSchema,
  proximidades: z.array(proximidadeSchema)
});

type FormData = z.infer<typeof registerSchema>;
type FileWithPreview = { file: File; preview: string; };

const RegistrarImovelForm = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("imovel");
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(null);
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  // Form initialization
  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      imovel: {
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
      },
      proximidades: []
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

  // Form handlers
  const handleProvinciaChange = (provinciaId: string) => {
    const novosMunicipios = municipiosData[provinciaId as keyof typeof municipiosData] || [];
    form.setValue("imovel.municipio", "");
    setMunicipios(novosMunicipios);
  };

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleAddProximidade = () => {
    if (!selectedLocation) return;
    const proximidades = form.getValues("proximidades");
    form.setValue("proximidades", [
      ...proximidades,
      {
        nome: "",
        tipo: "HOSPITAL",
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        distancia: 0,
        imovelId: ""
      }
    ]);
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
      const imovelResponse = await fetch("/api/imoveis/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data.imovel,
          imagens: imageUrls,
          proximidades: data.proximidades.map(proximidade => ({
            nome: proximidade.nome,
            tipo: proximidade.tipo,
            latitude: proximidade.latitude,
            longitude: proximidade.longitude,
            distancia: proximidade.distancia
          }))
        }),
      });

      const imovel = await imovelResponse.json();

      // Create proximidades
      // if (data.proximidades.length > 0) {
      //   await Promise.all(
      //     data.proximidades.map(proximidade =>
      //       fetch("/api/proximidade/create", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           ...proximidade,
      //           imovelId: imovel.id
      //         })
      //       })
      //     )
      //   );
      // }

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
              Preencha os dados do imóvel e suas áreas de interesse próximas
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="imovel">Dados do Imóvel</TabsTrigger>
              <TabsTrigger value="proximidades">Áreas de Interesse</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="imovel" className="grid grid-cols-2 gap-4">
                

                <FormField
                control={form.control}
                name="imovel.titulo"
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
                name="imovel.tipologia"
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
        
              {/* Preço */}
              <FormField
                control={form.control}
                name="imovel.preco"
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
      
              {/* Província */}
              <FormField
                control={form.control}
                name="imovel.provincia"
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
              {/* Município */}
              <FormField
                control={form.control}
                name="imovel.municipio"
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
              {/* Outros campos */}
              <FormField
                control={form.control}
                name="imovel.bairro"
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
                name="imovel.endereco"
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
                name="imovel.numeroQuarto"
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
                name="imovel.numeroCasaBanho"
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
                name="imovel.garagem"
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
                    {/* Descrição */}
                    <FormField
                control={form.control}
                name="imovel.descricao"
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
                  {/* Add all other form fields similarly */}
                  
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

                  <div className="col-span-2 flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("proximidades")}>
                      Próximo
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="proximidades" className="space-y-4">
                  <div className="h-[400px]">
                    <MapWithNoSSR
                      onLocationSelected={handleMapClick}
                      markers={form.getValues("proximidades")}
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddProximidade}
                    disabled={!selectedLocation}
                  >
                    Adicionar Ponto de Interesse
                  </Button>

                  <div className="grid grid-cols-2 gap-4">
                    {form.watch("proximidades").map((_, index) => (
                      <div key={index} className="border p-4 rounded-lg">
                        <FormField
                          control={form.control}
                          name={`proximidades.${index}.nome`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`proximidades.${index}.tipo`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo</FormLabel>
                              <Select 
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {TIPOS_PROXIMIDADE.map(tipo => (
                                    <SelectItem key={tipo} value={tipo}>
                                      {tipo}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const proximidades = form.getValues("proximidades");
                            form.setValue(
                              "proximidades",
                              proximidades.filter((_, i) => i !== index)
                            );
                          }}
                          className="mt-2"
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setActiveTab("imovel")}
                    >
                      Voltar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Registrando..." : "Registrar Imóvel"}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrarImovelForm;