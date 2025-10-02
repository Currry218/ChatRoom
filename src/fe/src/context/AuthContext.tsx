import axios from "axios";
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

interface AuthContextType {
  user: any;
  loading: boolean;
  checkAuth: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  checkAuth: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("userId", res.data.username);
      setUser(res.data); 
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
