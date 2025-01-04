// pages/imovel/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ImovelLDto } from "@/app/model/type";

const ImovelDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [imovel, setImovel] = useState<ImovelLDto | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch imóvel details (simulated here)
      fetch(`/api/imovel/${id}`)
        .then((res) => res.json())
        .then((data) => setImovel(data));
    }
  }, [id]);

  if (!imovel) return <div>Loading...</div>;

  return (
    <div>
      <h1>{imovel.titulo}</h1>
      <p>{imovel.provincia} - {imovel.bairro}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ImovelDetails;
