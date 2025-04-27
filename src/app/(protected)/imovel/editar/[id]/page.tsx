'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ImovelLDto } from '@/app/model/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/getUser';
import { toast } from 'sonner';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

// Dynamic import do mapa
const PropertyLocationMap = dynamic(
  () => import('@/components/map-component/map-component-back'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px] rounded-lg" />,
  }
);

// Lista das 18 províncias de Angola
const provinciasAngola = [
  'Bengo',
  'Benguela',
  'Bié',
  'Cabinda',
  'Cuando Cubango',
  'Cuanza Norte',
  'Cuanza Sul',
  'Cunene',
  'Huambo',
  'Huíla',
  'Luanda',
  'Lunda Norte',
  'Lunda Sul',
  'Malanje',
  'Moxico',
  'Namibe',
  'Uíge',
  'Zaire',
];

// Componente Skeleton para o formulário
const FormSkeleton = () => (
  <div className="max-w-7xl mx-auto p-6">
    <Skeleton className="h-8 w-1/4 mb-6" />
    <div className="grid grid-cols-2 gap-6">
      {/* Coluna Esquerda: Inputs */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      {/* Coluna Direita: Imagens e Mapa */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6">
        <div>
          <Skeleton className="h-4 w-1/3 mb-2" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-24 w-24 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-10 w-full mt-2" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="w-full h-[300px] rounded-lg" />
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full mt-1" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full mt-1" />
            </div>
          </div>
        </div>
      </div>
      {/* Botões de Ação */}
      <div className="col-span-2 flex justify-end space-x-4 mt-6">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </div>
);

export default function EditImovel({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const router = useRouter();
  const [imovel, setImovel] = useState<ImovelLDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    async function fetchImovel() {
      try {
        const response = await fetch(`/api/imoveis/edit/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          // Atraso artificial de 3 segundos
          await new Promise((resolve) => setTimeout(resolve, 3000));
          setImovel(data);
        } else {
          toast.error('Imóvel não encontrado');
        }
      } catch (error) {
        toast.error('Erro ao buscar imóvel');
      } finally {
        setLoading(false);
      }
    }
    fetchImovel();
  }, [params.id]);

  const handleInputChange = (field: keyof ImovelLDto, value: any) => {
    setImovel((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setImovel((prev) =>
        prev
          ? { ...prev, imagens: prev.imagens.filter((_, i) => i !== index) }
          : prev
      );
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setImovel((prev) =>
      prev ? { ...prev, latitude: lat, longitude: lng } : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imovel) return;

    setIsSubmitting(true);
    try {
      // Upload de novas imagens
      const imageUrls = await Promise.all(
        newImages.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const response = await fetch('/api/imoveis/upload', {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) throw new Error('Erro ao fazer upload da imagem');
          const { url } = await response.json();
          return { url };
        })
      );

      // Combinar imagens existentes e novas
      const updatedImovel = {
        ...imovel,
        imagens: [...imovel.imagens, ...imageUrls],
      };

      const response = await fetch(`/api/imoveis/update/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedImovel),
      });

      if (response.ok) {
        toast.success('Imóvel atualizado com sucesso');
        router.push('/imovel');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erro ao atualizar imóvel');
      }
    } catch (error) {
      toast.error('Erro ao atualizar imóvel');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <FormSkeleton />
      </div>
    );
  }
  if (!imovel) return <div className="text-center mt-8">Imóvel não encontrado</div>;
  if (!user || (user.role !== 'PROPRIETARIO' && user.id !== imovel.proprietarioId)) {
    return <div className="text-center mt-8">Acesso negado</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Imóvel</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Coluna Esquerda: Inputs do Formulário */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <Label htmlFor="titulo" className="block text-sm font-medium">Título</Label>
            <Input
              id="titulo"
              value={imovel.titulo || ''}
              onChange={(e) => handleInputChange('titulo', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="descricao" className="block text-sm font-medium">Descrição</Label>
            <Textarea
              id="descricao"
              value={imovel.descricao || ''}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              className="mt-1"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="preco" className="block text-sm font-medium">Preço (AKZ)</Label>
            <Input
              id="preco"
              type="number"
              value={imovel.preco || 0}
              onChange={(e) => handleInputChange('preco', Number(e.target.value))}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="precoMensal" className="block text-sm font-medium">Preço Mensal (AKZ)</Label>
            <Input
              id="precoMensal"
              type="number"
              value={imovel.precoMensal || 0}
              onChange={(e) => handleInputChange('precoMensal', Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="endereco" className="block text-sm font-medium">Endereço</Label>
            <Input
              id="endereco"
              value={imovel.endereco || ''}
              onChange={(e) => handleInputChange('endereco', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="provincia" className="block text-sm font-medium">Província</Label>
            <Select
              value={imovel.provincia || ''}
              onValueChange={(value) => handleInputChange('provincia', value)}
              required
            >
              <SelectTrigger id="provincia" className="mt-1">
                <SelectValue placeholder="Selecione uma província" />
              </SelectTrigger>
              <SelectContent>
                {provinciasAngola.map((provincia) => (
                  <SelectItem key={provincia} value={provincia}>
                    {provincia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bairro" className="block text-sm font-medium">Bairro</Label>
            <Input
              id="bairro"
              value={imovel.bairro || ''}
              onChange={(e) => handleInputChange('bairro', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="municipio" className="block text-sm font-medium">Município</Label>
            <Input
              id="municipio"
              value={imovel.municipio || ''}
              onChange={(e) => handleInputChange('municipio', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="tipologia" className="block text-sm font-medium">Tipologia</Label>
            <Input
              id="tipologia"
              value={imovel.tipologia || ''}
              onChange={(e) => handleInputChange('tipologia', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="numeroQuarto" className="block text-sm font-medium">Número de Quartos</Label>
            <Input
              id="numeroQuarto"
              type="number"
              value={imovel.numeroQuarto || 0}
              onChange={(e) => handleInputChange('numeroQuarto', Number(e.target.value))}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="numeroCasaBanho" className="block text-sm font-medium">Número de Casas de Banho</Label>
            <Input
              id="numeroCasaBanho"
              type="number"
              value={imovel.numeroCasaBanho || 0}
              onChange={(e) => handleInputChange('numeroCasaBanho', Number(e.target.value))}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="garagem" className="block text-sm font-medium">Número de Vagas na Garagem</Label>
            <Input
              id="garagem"
              type="number"
              value={imovel.garagem || 0}
              onChange={(e) => handleInputChange('garagem', Number(e.target.value))}
              className="mt-1"
              required
            />
          </div>
        </div> */}

<div className="bg-white rounded-lg shadow-md p-6">
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="titulo" className="block text-sm font-medium">Título</Label>
      <Input
        id="titulo"
        value={imovel.titulo || ''}
        onChange={(e) => handleInputChange('titulo', e.target.value)}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="preco" className="block text-sm font-medium">Preço (AKZ)</Label>
      <Input
        id="preco"
        type="number"
        value={imovel.preco || 0}
        onChange={(e) => handleInputChange('preco', Number(e.target.value))}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="precoMensal" className="block text-sm font-medium">Preço Mensal (AKZ)</Label>
      <Input
        id="precoMensal"
        type="number"
        value={imovel.precoMensal || 0}
        onChange={(e) => handleInputChange('precoMensal', Number(e.target.value))}
        className="mt-1"
      />
    </div>

    <div>
      <Label htmlFor="endereco" className="block text-sm font-medium">Endereço</Label>
      <Input
        id="endereco"
        value={imovel.endereco || ''}
        onChange={(e) => handleInputChange('endereco', e.target.value)}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="provincia" className="block text-sm font-medium">Província</Label>
      <Select
        value={imovel.provincia || ''}
        onValueChange={(value) => handleInputChange('provincia', value)}
        required
      >
        <SelectTrigger id="provincia" className="mt-1">
          <SelectValue placeholder="Selecione uma província" />
        </SelectTrigger>
        <SelectContent>
          {provinciasAngola.map((provincia) => (
            <SelectItem key={provincia} value={provincia}>
              {provincia}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="bairro" className="block text-sm font-medium">Bairro</Label>
      <Input
        id="bairro"
        value={imovel.bairro || ''}
        onChange={(e) => handleInputChange('bairro', e.target.value)}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="municipio" className="block text-sm font-medium">Município</Label>
      <Input
        id="municipio"
        value={imovel.municipio || ''}
        onChange={(e) => handleInputChange('municipio', e.target.value)}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="tipologia" className="block text-sm font-medium">Tipologia</Label>
      <Input
        id="tipologia"
        value={imovel.tipologia || ''}
        onChange={(e) => handleInputChange('tipologia', e.target.value)}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="numeroQuarto" className="block text-sm font-medium">Número de Quartos</Label>
      <Input
        id="numeroQuarto"
        type="number"
        value={imovel.numeroQuarto || 0}
        onChange={(e) => handleInputChange('numeroQuarto', Number(e.target.value))}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="numeroCasaBanho" className="block text-sm font-medium">Número de Casas de Banho</Label>
      <Input
        id="numeroCasaBanho"
        type="number"
        value={imovel.numeroCasaBanho || 0}
        onChange={(e) => handleInputChange('numeroCasaBanho', Number(e.target.value))}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="garagem" className="block text-sm font-medium">Número de Vagas na Garagem</Label>
      <Input
        id="garagem"
        type="number"
        value={imovel.garagem || 0}
        onChange={(e) => handleInputChange('garagem', Number(e.target.value))}
        className="mt-1"
        required
      />
    </div>

    <div>
      <Label htmlFor="status" className="block text-sm font-medium">Ativo</Label>
      <div className="mt-1">
        <Input
          type="checkbox"
          id="status"
          checked={imovel.status || false}
          onChange={(e) => handleInputChange('status', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
    </div>
  </div>

  <div className="mt-4">
    <Label htmlFor="descricao" className="block text-sm font-medium">Descrição</Label>
    <Textarea
      id="descricao"
      value={imovel.descricao || ''}
      onChange={(e) => handleInputChange('descricao', e.target.value)}
      className="mt-1"
      rows={4}
      required
    />
  </div>
</div>

        {/* Coluna Direita: Imagens e Mapa */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6">
          {/* Linha 1: Imagens */}
          <div>
            <Label className="block text-sm font-medium mb-2">Imagens</Label>
            <div className="grid grid-cols-3 gap-4">
              {imovel.imagens.map((imagem, index) => (
                <div key={index} className="relative">
                  <Image
                    src={imagem.url}
                    alt={`Imagem ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveImage(index, true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {newImages.map((file, index) => (
                <div key={`new-${index}`} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Nova imagem ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveImage(index, false)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-2"
            />
          </div>

          {/* Linha 2: Mapa */}
          <div className="flex-1">
            <Label className="block text-sm font-medium mb-2">Localização no Mapa</Label>
            <PropertyLocationMap
              latitude={imovel.latitude}
              longitude={imovel.longitude}
              onMapClick={handleMapClick}
            />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  value={imovel.latitude || 0}
                  onChange={(e) => handleInputChange('latitude', Number(e.target.value))}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  value={imovel.longitude || 0}
                  onChange={(e) => handleInputChange('longitude', Number(e.target.value))}
                  className="mt-1"
                  required
                />
              </div>
            </div>
          </div>
          {/* Botões de Ação */}
        <div className="col-span-2 flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/imoveis')}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500 mr-2" />
            ) : null}
            Salvar
          </Button>
        </div>
        </div>

        
      </form>
    </div>
  );
}