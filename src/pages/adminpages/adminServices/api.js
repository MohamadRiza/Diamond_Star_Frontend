// src/services/api.js

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";  

const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("adminToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
};

// Vacancy CRUD
export const createVacancy = (data) =>
  apiCall("/api/vacancies", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const fetchVacancies = () => apiCall("/api/vacancies");

export const updateVacancy = (id, data) =>
  apiCall(`/api/vacancies/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteVacancy = (id) =>
  apiCall(`/api/vacancies/${id}`, {
    method: "DELETE",
  });