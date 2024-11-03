import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderContentProps {
  children?: React.ReactNode;
}

export default function PlaceholderContent({ children }: PlaceholderContentProps) {
  return (
    <Card className="rounded-sm border-none pt-1 mt-2">
      <CardContent>
        <div className="min-h-[calc(100vh-56px-64px-20px)]">
          
          <div>
            {children} {/* Renderiza o conteúdo aqui */}
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}




