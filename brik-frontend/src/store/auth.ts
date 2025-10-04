import { defineStore } from "pinia";
import api from "../api/axios";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async register(username: string, email: string, password: string) {
      await api.post("/auth/register", { username, email, password });
    },

    async login(email: string, password: string) {
      await api.post("/auth/login", { email, password });
      await this.getUser();
    },

    async getUser() {
      try {
        const res = await api.get("/users");
        this.user = res.data;
        this.isAuthenticated = true;
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    async logout() {
      await api.post("/auth/logout");
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
