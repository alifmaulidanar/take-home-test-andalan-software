import { ApiError, LoginResponse, RegisterResponse } from "@/types";

// Function to register a user
export async function registerUser(email: string, password: string): Promise<RegisterResponse | ApiError> {
  const res = await fetch('https://reqres.in/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Failed to register user');
  }

  const data = await res.json();
  return data;
}

// Function to login a user
export async function loginUser(email: string, password: string): Promise<LoginResponse | ApiError> {
  const res = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Failed to login user');
  }

  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data;
}
