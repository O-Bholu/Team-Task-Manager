import api from "./api";

export const signupApi = async (payload) => {
  const { data } = await api.post("/auth/signup", payload);
  return data;
};

export const loginApi = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};
