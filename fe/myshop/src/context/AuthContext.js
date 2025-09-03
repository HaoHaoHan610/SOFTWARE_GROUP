import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role }

  useEffect(() => {
    // Lấy từ localStorage để giữ trạng thái sau refresh
    const raw = localStorage.getItem("app_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const loginMock = (role = "buyer") => {
    const u = { id: 1, name: "Seller Demo", role };
    setUser(u);
    localStorage.setItem("app_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("app_user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
