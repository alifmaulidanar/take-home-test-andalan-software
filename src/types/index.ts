// User type definition
export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

// Response type for fetching users
export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

// Response type for register
export interface RegisterResponse {
  id: number;
  token: string;
}

// Response type for login
export interface LoginResponse {
  token: string;
}

// Error type definition
export interface ApiError {
  error: string;
}

// Resource type definition
export type Resource = {
  id: number;
  name: string;
  color: string;
  year: number;
  pantone_value: string;
};

// Response type for fetching resources
export type ResourcesResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Resource[];
};