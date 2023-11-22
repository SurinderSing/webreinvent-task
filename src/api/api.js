// src/api/api.js
const BASE_URL = "https://reqres.in/api";

const api = {
  async signIn(data) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },

  async signUp(data) {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },

  async getUserData() {
    const res = await fetch(`${BASE_URL}/users?pages=1`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    return await res.json();
  },
};

export default api;
