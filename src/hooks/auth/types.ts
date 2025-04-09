import { User, UserCredential } from 'firebase/auth';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UseAuthResult {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<RegisterResult>;
  login: (email: string, password: string) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;
}

export const USER_STORAGE_KEY = '@monefiy_auth_user';

export interface RegisterResult {
  uid: string;
  email: string;
}

export interface DefaultCategory {
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}
