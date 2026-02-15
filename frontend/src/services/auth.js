import API from "./api";

/* ================= LOGIN ================= */
export const login = async (u, p) => {
  const r = await API.post("/auth/login", {
    username: u,
    password: p
  });

  localStorage.setItem("t", r.data.token);
};


/* ================= REGISTER ================= */
export const register = async (u, p) => {
  await API.post("/auth/register", {
    username: u,
    password: p
  });
};


/* ================= LOGOUT ================= */
export const logout = () => {
  localStorage.removeItem("t");
};


/* ================= CHECK LOGIN ================= */
export const isLoggedIn = () => {
  return !!localStorage.getItem("t");
};
