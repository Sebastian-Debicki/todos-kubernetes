export interface UserResponse {
  id: string;
  email: string;
}

export interface User extends UserResponse {
  iat: number;
}

export interface CurrentUser {
  currentUser: User;
}
