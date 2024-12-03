import { ResourcesResponse } from '@/types/index';

// Fetch resources with pagination
export async function fetchResources(page: number = 1): Promise<ResourcesResponse> {
  const res = await fetch(`https://reqres.in/api/unknown?page=${page}`);

  if (!res.ok) {
    throw new Error('Failed to fetch resources');
  }

  const data: ResourcesResponse = await res.json();
  return data;
}

// Fetch resource by ID
export const fetchResourceById = async (id: number) => {
  const response = await fetch(`https://reqres.in/api/unknown/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch resource');
  }

  const data = await response.json();
  return data.data;
};
