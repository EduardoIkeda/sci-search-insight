
import React, { useState } from 'react';
import SearchHeader from '@/components/SearchHeader';
import SearchBar from '@/components/SearchBar';
import SearchSummary from '@/components/SearchSummary';
import SearchResult from '@/components/SearchResult';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoResults from '@/components/NoResults';

interface SearchResultData {
  id: string;
  title: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  abstractHighlight: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResultData[]>([]);

  // Dados de exemplo para demonstração
  const mockResults: SearchResultData[] = [
    {
      id: '1',
      title: 'Advances in Machine Learning Applications for Healthcare Diagnostics',
      journal: 'Nature Medicine',
      year: 2023,
      volume: '29',
      issue: '3',
      abstractHighlight: 'Recent developments in machine learning have revolutionized healthcare diagnostics, enabling more accurate and faster detection of diseases. This study presents a comprehensive analysis of machine learning algorithms applied to medical imaging and patient data...'
    },
    {
      id: '2',
      title: 'Climate Change Impact on Biodiversity: A Global Perspective',
      journal: 'Science',
      year: 2023,
      volume: '381',
      issue: '6653',
      abstractHighlight: 'Climate change poses unprecedented challenges to global biodiversity. Our research analyzes the impact of rising temperatures and changing precipitation patterns on various ecosystems worldwide...'
    },
    {
      id: '3',
      title: 'Quantum Computing Breakthroughs in Cryptography',
      journal: 'Physical Review Letters',
      year: 2023,
      volume: '130',
      issue: '8',
      abstractHighlight: 'The advent of quantum computing presents both opportunities and challenges for modern cryptography. This paper explores recent breakthroughs in quantum algorithms that could potentially break current encryption methods...'
    },
    {
      id: '4',
      title: 'Sustainable Energy Solutions for Urban Development',
      journal: 'Energy Policy',
      year: 2023,
      volume: '175',
      abstractHighlight: 'Urban areas consume over 70% of global energy production. This research examines sustainable energy solutions that can be implemented in urban development projects to reduce carbon footprint and improve energy efficiency...'
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filtrar resultados baseado no termo de busca (simulação)
    const filteredResults = searchTerm.toLowerCase().includes('machine') 
      ? mockResults.filter(result => result.title.toLowerCase().includes('machine'))
      : searchTerm.toLowerCase().includes('climate')
      ? mockResults.filter(result => result.title.toLowerCase().includes('climate'))
      : searchTerm.toLowerCase().includes('quantum')
      ? mockResults.filter(result => result.title.toLowerCase().includes('quantum'))
      : mockResults;
    
    setResults(filteredResults);
    setIsLoading(false);
  };

  const getTotalResults = () => results.length;
  const getTopKeyword = () => {
    if (searchTerm.toLowerCase().includes('machine')) return 'algoritmos';
    if (searchTerm.toLowerCase().includes('climate')) return 'temperatura';
    if (searchTerm.toLowerCase().includes('quantum')) return 'criptografia';
    return 'pesquisa';
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Seção de busca centralizada */}
        <div className={`transition-all duration-500 ${hasSearched ? 'mb-8' : 'min-h-[60vh] flex items-center justify-center'}`}>
          <div className="w-full max-w-4xl">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Resultados da busca */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <LoadingSpinner />
            ) : results.length > 0 ? (
              <>
                <SearchSummary
                  totalResults={getTotalResults()}
                  topKeyword={getTopKeyword()}
                  searchTerm={searchTerm}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((result) => (
                    <SearchResult
                      key={result.id}
                      title={result.title}
                      journal={result.journal}
                      year={result.year}
                      volume={result.volume}
                      issue={result.issue}
                      abstractHighlight={result.abstractHighlight}
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              </>
            ) : (
              <NoResults searchTerm={searchTerm} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
