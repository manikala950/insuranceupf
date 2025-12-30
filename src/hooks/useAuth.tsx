import { useState, useEffect } from "react";

interface AuthUser {
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Fake Login System
  // -------------------------
  const signIn = async (email: string, password: string) => {
    setLoading(true);

    let role = "";

    if (email === "admin@uplife.com" && password === "admin123") {
      role = "admin";
    } else if (email === "agent@uplife.com" && password === "agent123") {
      role = "agent";
    } else if (email === "user@uplife.com" && password === "user123") {
      role = "user";
    } else {
      setLoading(false);
      return { success: false, message: "Invalid credentials" };
    }

    const userData = { email, role };
    localStorage.setItem("uplife-user", JSON.stringify(userData));

    setUser({ email });
    setUserRole(role);
    setLoading(false);

    return { success: true, role };
  };

  const signOut = async () => {
    localStorage.removeItem("uplife-user");
    setUser(null);
    setUserRole("");
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    const stored = localStorage.getItem("uplife-user");

    if (stored) {
      const parsed = JSON.parse(stored) as { email: string; role: string };
      setUser({ email: parsed.email });
      setUserRole(parsed.role);
    }

    setLoading(false);
  }, []);

  return { user, userRole, loading, signIn, signOut, isAuthenticated };
};
