'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BulkUserUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/utilizador/create/bulk', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: 'Erro ao enviar arquivo' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload de Usuários em Massa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={!file || isLoading}
            className="w-full"
          >
            {isLoading ? 'Processando...' : 'Enviar'}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Resultado:</h3>
            <div className="text-sm">
              <p>Total processados: {result.totalProcessed}</p>
              <p>Sucesso: {result.successful}</p>
              <p>Falhas: {result.failed}</p>
            </div>
            <ul className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
              {result.results?.map((res: any, index: number) => (
                <li
                  key={index}
                  className={`text-sm ${
                    res.success ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {res.username}: {res.success ? 'Criado com sucesso' : res.error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}