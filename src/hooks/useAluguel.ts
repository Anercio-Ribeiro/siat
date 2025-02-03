import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Aluguel {
  id: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
}

interface CreateAluguelData {
  imovelId: string;
  inquilinoId: string;
  checkIn: Date;
  checkOut: Date;
  periodoAluguel: number;
}

export function useAlugueis(imovelId: string) {
  return useQuery({
    queryKey: ['aluguel', imovelId],
    queryFn: async () => {
      const response = await fetch(`/api/aluguel?imovelId=${imovelId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar alugueis');
      }
      return response.json() as Promise<Aluguel[]>;
    },
  });
}

export function useCreateAluguel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAluguelData) => {
      const response = await fetch('/api/aluguel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao criar aluguel');
      }
      
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aluguel', variables.imovelId] });
    },
  });
}

export function useCancelarAluguel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ aluguelId, imovelId }: { aluguelId: string; imovelId: string }) => {
      const response = await fetch(`/api/aluguel/${aluguelId}/cancelar`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Erro ao cancelar aluguel');
      }
      
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aluguel', variables.imovelId] });
    },
  });
}