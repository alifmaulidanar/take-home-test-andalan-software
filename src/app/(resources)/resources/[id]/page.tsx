'use client';

import { Resource } from '@/types/index';
import { useRouter } from 'next/navigation';
import { FC, useState, useEffect } from 'react';
import { fetchResourceById } from '../lib/data';
import { Button } from '@/components/ui/button';

interface ResourcePageProps {
  params: { id: string };
}

const ResourcePage: FC<ResourcePageProps> = ({ params }) => {
  const { id } = params;
  const resourceId = parseInt(id, 10);
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResourceData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const resourceData = await fetchResourceById(resourceId);
        setResource(resourceData);
      } catch (err) {
        console.error(err);
        setError('Failed to load resource details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResourceData();
  }, [resourceId]);

  const handleBack = () => {
    router.push('/resources');
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">{error}</div>;
  if (!resource) return <div className="text-center py-8">Resource not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-6">
        <Button onClick={handleBack} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500" >
          Back to Resources List
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-[360px] h-48 rounded-lg" style={{ backgroundColor: resource.color }} />
            <h2 className="text-lg font-semibold mt-4">{resource.name}</h2>
            <p className="text-sm text-gray-500">Year: {resource.year}</p>
            <p className="text-sm text-gray-500">Pantone Value: {resource.pantone_value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
