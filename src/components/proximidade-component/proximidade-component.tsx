import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { MapPin, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const MapWithNoSSR = dynamic(() => import('../map-component/map'), {
  ssr: false,
});

const TIPOS_PROXIMIDADE = [
  'Escola',
  'Hospital',
  'Supermercado',
  'Farmácia',
  'Restaurante',
  'Banco',
  'Parque',
  'Shopping',
  'Transporte Público'
];

const proximidadeSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  latitude: z.number(),
  longitude: z.number(),
  distancia: z.number()
});

interface Location {
  lat: number;
  lng: number;
}

interface ProximidadeDialogProps {
  onSave: () => void;
}

const ProximidadeDialog = ({ onSave }: ProximidadeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const form = useForm({
    resolver: zodResolver(proximidadeSchema),
    defaultValues: {
      nome: '',
      tipo: '',
      latitude: 0,
      longitude: 0,
      distancia: 0
    }
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
  };

  const handleSubmit = async (data: z.infer<typeof proximidadeSchema>) => {
    try {
      await fetch('/api/proximidades/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      onSave();
      setIsOpen(false);
      form.reset();
      setSelectedLocation(null);
    } catch (error) {
      console.error('Erro ao salvar proximidade:', error);
    }
  };

  return (
    <>
   
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Proximidade
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Adicionar Ponto de Proximidade</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="h-[400px] mb-4">
              <MapWithNoSSR
                onLocationSelected={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Local</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo do Local</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <FormField
                control={form.control}
                name="distancia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distância (km)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!selectedLocation}>
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ProximidadeDialog;