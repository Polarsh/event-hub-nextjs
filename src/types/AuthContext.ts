export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
}

export interface User {
  username: string
  email: string
  role: string
}

export interface AuthenticatorContextType {
  currentUser: User | null

  refetchUserSession: () => void
  login: (credentials: LoginCredentials) => Promise<User> // Opcional si usas loginAsync
  register: (credentials: RegisterCredentials) => Promise<User>
  logout: () => Promise<void> // Opcional si usas logoutAsync

  isLoading: boolean
}
