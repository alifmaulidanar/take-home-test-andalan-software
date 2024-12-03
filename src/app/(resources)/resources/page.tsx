'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchResources } from './lib/data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Resource, ResourcesResponse } from '@/types/index';
import BackHomeButton from '@/components/customs/buttons/back-home-button';

const ResourcesPage = () => {
  const [page, setPage] = useState(1);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: ResourcesResponse = await fetchResources(page);
        setResources(response.data);
        setTotalPages(response.total_pages);
      } catch (err) {
        console.error(err);
        setError('Failed to load resources');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Resources List</h1>
      <BackHomeButton />

      {/* Resources list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Link href={`/resources/${resource.id}`} key={resource.id}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-200 cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-full h-48 rounded-lg" style={{ backgroundColor: resource.color }} />
                <h2 className="text-lg font-semibold mt-4">{resource.name}</h2>
                <p className="text-sm text-gray-500">Year: {resource.year}</p>
                <p className="text-sm text-gray-500">Pantone Value: {resource.pantone_value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <Button variant="outline" onClick={handlePrevPage} disabled={page === 1} size="icon">
          <ChevronLeft />
        </Button>

        {/* Pagination Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={page === index + 1 ? 'default' : 'outline'}
            onClick={() => handlePageChange(index + 1)}
            className={`w-10 py-2 ${page === index + 1 ? 'bg-blue-600 text-white' : 'text-blue-500 border-blue-500'} font-semibold rounded-lg`}
          >
            {index + 1}
          </Button>
        ))}

        <Button variant="outline" onClick={handleNextPage} disabled={page === totalPages} size="icon">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ResourcesPage;
