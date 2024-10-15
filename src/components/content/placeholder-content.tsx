import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderContentProps {
  children?: React.ReactNode;
}

export default function PlaceholderContent({ children }: PlaceholderContentProps) {
  return (
    <Card className="rounded-sm border-none pt-1 mt-4">
      <CardContent>
        <div className="min-h-[calc(100vh-56px-64px-20px)]">
          <div className="grid grid-cols-3 gap-4">
          <div className="w-full max-w-sm">
            {children} {/* Renderiza o conteúdo aqui */}
          </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



// import { Card, CardContent } from "@/components/ui/card";

// interface PlaceholderContentProps {
//   children?: React.ReactNode;
// }

// export default function PlaceholderContent({ children }: PlaceholderContentProps) {
//   return (
//     <Card className="rounded-sm border-none pt-1 mt-4">
//       <CardContent>
//         <div className="min-h-[calc(100vh-56px-64px-20px)]">
//           {/* Grade responsiva para 3 colunas, ajustando para 4 colunas se houver mais cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
//             {children} {/* Renderiza o conteúdo aqui */}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


