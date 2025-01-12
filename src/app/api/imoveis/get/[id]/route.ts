// //import { findProximidadesNearImovel } from '@/app/repositories/proximidade-utils';
// import { ImovelService } from '@/app/services/imovelService';
// import { NextResponse } from 'next/server';

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const imovelService = new ImovelService();
//     const imovel = await imovelService.encontrarImovelPorId(id);
//     //const proximidades = await findProximidadesNearImovel(id as string);

//     //console.log(proximidades);

//     if (!imovel) {
//       return NextResponse.json({ error: 'Imovel não encontrado', status: 404 });
//     }

//     // Remover o campo proprietarioId do retorno
//     const { proprietarioId, ...imovelSemProprietarioId } = imovel;


//     return NextResponse.json({ imovel: imovelSemProprietarioId, status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Erro ao encontrar Imovel', status: 500 });
//   }
// }



// import { ImovelService } from '@/app/services/imovelService';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function getNearbyLocations(id: string) {
//   const imovelService = new ImovelService();
//   // First, get the imovel coordinates
//   const imovel = await imovelService.encontrarImovelPorId(id);
//   console.log('Imovel:', imovel);
  
//   // await prisma.imovel.findUnique({
//   //   where: { id: imovelId },
//   //   select: {
//   //     latitude: true,
//   //     longitude: true
//   //   }
//   // });

//   if (!imovel) {
//     throw new Error('Imóvel não encontrado');
//   }

//   // Use raw SQL with Haversine formula to calculate distances
//   const nearbyLocations = await prisma.$queryRaw`
//     SELECT 
//       p.*,
//       (
//         6371 * acos(
//           cos(radians(${imovel.latitude})) * 
//           cos(radians(p.latitude)) * 
//           cos(radians(p.longitude) - radians(${imovel.longitude})) + 
//           sin(radians(${imovel.latitude})) * 
//           sin(radians(p.latitude))
//         )
//       ) AS calculated_distance
//     FROM "Proximidade" p
//     HAVING calculated_distance <= 5
//     ORDER BY calculated_distance;
//   `;

//   return nearbyLocations;
// }


// export async function GET(
//   req: Request,
//   { params }: { params: { imovelId: string } }
// ) {
//   try {
//     console.log('Fetching nearby locations for imovel:', params.imovelId);
//     const nearbyLocations = await getNearbyLocations(params.imovelId);
//     console.log('Nearby locations:', nearbyLocations);
//     return Response.json(nearbyLocations);
//   } catch (error) {
//     return Response.json(
//       { error: 'Failed to fetch nearby locations' },
//       { status: 500 }
//     );
//   }
// }



import { ImovelService } from '@/app/services/imovelService';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

async function getNearbyLocations(imovelId: string) {
  if (!imovelId) {
    throw new Error('ID do imóvel não fornecido');
  }

  const imovelService = new ImovelService();
  
  // First, get the imovel coordinates
  const imovel = await imovelService.encontrarImovelPorId(imovelId);

  if (!imovel) {
    throw new Error('Imóvel não encontrado');
  }

  if (typeof imovel.latitude !== 'number' || typeof imovel.longitude !== 'number') {
    throw new Error('Coordenadas do imóvel inválidas');
  }

  // Use raw SQL with Haversine formula to calculate distances
  const nearbyLocations = await prisma.$queryRaw`
    SELECT 
      p.*,
      (
        6371 * acos(
          cos(radians(${imovel.latitude})) * 
          cos(radians(p.latitude)) * 
          cos(radians(p.longitude) - radians(${imovel.longitude})) + 
          sin(radians(${imovel.latitude})) * 
          sin(radians(p.latitude))
        )
      ) AS calculated_distance
    FROM "Proximidade" p
    WHERE (
      6371 * acos(
        cos(radians(${imovel.latitude})) * 
        cos(radians(p.latitude)) * 
        cos(radians(p.longitude) - radians(${imovel.longitude})) + 
        sin(radians(${imovel.latitude})) * 
        sin(radians(p.latitude))
      )
    ) <= 5
    ORDER BY calculated_distance;
  `;

  return nearbyLocations;
}

// Route handler for Next.js App Router
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imovelId = params.id;
    
    if (!imovelId) {
      return Response.json(
        { error: 'ID do imóvel não fornecido' },
        { status: 400 }
      );
    }

    console.log('Fetching nearby locations for imovel:', imovelId);
    const nearbyLocations = await getNearbyLocations(imovelId);
    //console.log('Found nearby locations:', nearbyLocations.length);
    
    return Response.json(nearbyLocations);
  } catch (error) {
    console.error('Error fetching nearby locations:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch nearby locations' },
      { status: 500 }
    );
  }
}