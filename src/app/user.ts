export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface UserComplete extends User {
  password: string;
  createdAt: string;
}

export interface CreateUser {
  name?: any;
  lastName?: any;
  email?: any;
}