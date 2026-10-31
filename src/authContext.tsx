import { createContext, useContext, type ReactNode } from "react";

type AuthUser = { id: number; email: string; roles: string[] };
type AuthContextType = {
  token: string | null;
  user: AuthUser | null;
  login: (newToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// This repository is always a public demo, regardless of Vite mode or env flags.
// Never read stored real credentials, parse a JWT, or verify one with a backend.
const demoAuth: AuthContextType = {
  token: "demo-jwt-token",
  user: { id: 1, email: "demo@allseasonsfoam.com", roles: ["admin", "user"] },
  login: () => { /* The fixed demo identity is already active. */ },
  logout: () => alert("Demo mode: Logout is disabled. Refresh the page to reset the demo."),
  isAuthenticated: true,
};
export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={demoAuth}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
export function userHasRole(user: AuthUser | null, role: string): boolean {
  return !!user?.roles?.includes(role);
}
