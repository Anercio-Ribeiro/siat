import { useSearchParams } from 'next/navigation';

export function useImovelId() {
  const searchParams = useSearchParams();
  return searchParams ? searchParams.get('imovelId') : null;
}
