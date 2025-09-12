export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}
export interface UserState {
  profile: {
    id: number;
    name: string;
    email: string;
  } | null;
}
