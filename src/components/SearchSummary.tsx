
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchSummaryProps {
  totalResults: number;
  topKeyword: string;
  searchTerm: string;
}

const SearchSummary = ({ totalResults, topKeyword, searchTerm }: SearchSummaryProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto mb-6 border-2 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground">
            Sumário da Busca (IA)
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Gerado por IA
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalResults}</div>
            <div className="text-sm text-muted-foreground">Documentos encontrados</div>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground truncate">"{topKeyword}"</div>
            <div className="text-sm text-muted-foreground">Palavra-chave mais relevante</div>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground truncate">"{searchTerm}"</div>
            <div className="text-sm text-muted-foreground">Termo pesquisado</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSummary;
