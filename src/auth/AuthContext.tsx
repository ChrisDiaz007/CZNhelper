import React, { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import api from "./axios";
import axios from "axios";

interface User {
  id: number;
  email: string;
  admin: boolean;
}

interface AuthContextType {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  ready: false,
  login: async () => {},
  logout: () => {},
});

const cookies = new Cookies();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // Initialize user from token on mount
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("Decoded token on mount:", decoded); // check admin
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            id: parseInt(decoded.sub),
            email: decoded.email || "",
            admin: decoded.admin || false,
          });
        } else {
          cookies.remove("token");
        }
      } catch {
        cookies.remove("token");
      }
    }
    setReady(true); // finished checking token
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      "http://localhost:3000/login",
      { user: { email, password } },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true, // only if you want cookies sent
      },
    );
    const token = response.headers["authorization"]?.replace("Bearer ", "");
    if (!token) throw new Error("No token received");

    cookies.set("token", token, { path: "/" });

    const decoded: any = jwtDecode(token);
    setUser({
      id: parseInt(decoded.sub),
      email: decoded.email || "",
      admin: decoded.admin || false,
    });
  };

  const logout = () => {
    cookies.remove("token", { path: "/" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
