
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchResultProps {
  title: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  abstractHighlight: string;
  searchTerm: string;
}

const SearchResult = ({ 
  title, 
  journal, 
  year, 
  volume, 
  issue, 
  abstractHighlight, 
  searchTerm 
}: SearchResultProps) => {
  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const publicationInfo = [
    journal,
    year.toString(),
    volume && `Vol. ${volume}`,
    issue && `Issue ${issue}`
  ].filter(Boolean).join(', ');

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 border hover:border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight line-clamp-2 hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            {year}
          </Badge>
          <p className="text-sm text-muted-foreground truncate flex-1">
            {publicationInfo}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground leading-relaxed">
          <p className="italic mb-1">Abstract:</p>
          <p className="line-clamp-4">
            {highlightText(abstractHighlight, searchTerm)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResult;
