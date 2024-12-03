import { User, UsersResponse } from '@/types/index';

// Fetch users with pagination
export async function fetchUsers(page: number = 1): Promise<UsersResponse> {
  const res = await fetch(`https://reqres.in/api/users?page=${page}&delay=3`);

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: UsersResponse = await res.json();
  return data;
}

// Fetch user by ID
export async function fetchUserById(id: number): Promise<User> {
  const res = await fetch(`https://reqres.in/api/users/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = await res.json();
  return data.data;
}

// Create user
export async function createUser(name: string, job: string): Promise<User> {
  const res = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, job }),
  });

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  const data = await res.json();
  return data;
}

// Update user
export async function updateUser(id: number, name: string, job: string): Promise<User> {
  const res = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, job }),
  });

  if (!res.ok) {
    throw new Error('Failed to update user');
  }

  const data = await res.json();
  return data;
}

// Patch user
export async function patchUser(id: number, name: string, job: string): Promise<User> {
  const res = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, job }),
  });

  if (!res.ok) {
    throw new Error('Failed to update user');
  }

  const data = await res.json();
  return data;
}

// Delete user
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete user');
  }
}