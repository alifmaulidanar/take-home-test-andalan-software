'use client';

import Image from 'next/image';
import { User } from '@/types/index';
import { fetchUserById } from '../lib/data';
import { useRouter } from 'next/navigation';
import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface UserPageProps {
  params: { id: string };
}

const UserPage: FC<UserPageProps> = ({ params }) => {
  const { id } = params;
  const userId = parseInt(id, 10);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userData = await fetchUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error(err);
        setError('Failed to load user details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleBack = () => {
    router.push('/users');
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">{error}</div>;

  if (!user) return <div className="text-center py-8">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-6">
        <Button onClick={handleBack} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500">
          Back to Users List
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <Image
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold">{user.first_name} {user.last_name}</h2>
            <p className="text-lg text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
