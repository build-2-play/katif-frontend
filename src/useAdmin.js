import { useState, useEffect } from "react";

export function useAdmin() {
  const [admin, setAdmin]     = useState(null);
  const [token, setToken]     = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("admin_token");
    const savedAdmin = sessionStorage.getItem("admin_data");
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
    setChecked(true);
  }, []);

  function login(adminData, adminToken) {
    setAdmin(adminData); setToken(adminToken);
    sessionStorage.setItem("admin_token", adminToken);
    sessionStorage.setItem("admin_data", JSON.stringify(adminData));
  }

  function logout() {
    setAdmin(null); setToken(null);
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_data");
  }

  return {
    admin, token, checked, login, logout,
    isSuperAdmin:  admin?.role === "super_admin",
    isCoordinator: admin?.role === "coordinator",
    authHeaders: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
  };
}
