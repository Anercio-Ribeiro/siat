import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderContentProps {
  children?: React.ReactNode;
}

export default function PlaceholderContent({ children }: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px)]">
          <div className="flex flex-col w-full max-w-lg">
            {children} {/* Renderiza o conteúdo aqui */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
