import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/auth", // FastAPI backend
});

// Register (student only in frontend)
export const registerUser = async (userData) => {
  return API.post("/register", userData);
};

// Login (student, teacher, hod)
export const loginUser = async (credentials) => {
  return API.post("/login", credentials);
};

// Get current user
export const getMe = async (token) => {
  return API.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
