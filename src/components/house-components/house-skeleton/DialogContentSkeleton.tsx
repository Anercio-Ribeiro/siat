import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const DialogContentSkeleton = () => {
  return (
    <>
      <div className="w-1/2 pr-4">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            <Skeleton className="w-full h-48" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-full h-32" />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="w-1/2 pl-4">
        <ScrollArea className="h-full">
          <Tabs defaultValue="descricao">
            <TabsList className="mb-4">
              <TabsTrigger value="descricao">Descrição</TabsTrigger>
              <TabsTrigger value="proximidades">Proximidades</TabsTrigger>
              <TabsTrigger value="localizacao">Localização</TabsTrigger>
            </TabsList>

            <TabsContent value="descricao" className="space-y-8">
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-px w-full" />
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-6">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </>
  );
};

export default DialogContentSkeleton;