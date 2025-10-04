import { defineStore } from "pinia";
import api from "../api/axios";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string;
}

export const useAuthStore = defineStore<
  "auth",
  AuthState,
  {},
  {
    register(name: string, email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<void>;
    getUser(): Promise<void>;
    logout(): Promise<void>;
  }
>("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    accessToken: Cookies.get("accessToken") ?? "",
  }),

  actions: {
    async register(name, email, password) {
      await api.post("/auth/register", { name, email, password });
    },

    async login(email, password) {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.access_token;
      if (token) {
        Cookies.set("accessToken", token, { expires: 7 });
      }
      await this.getUser(); // akan dikenali dengan typing di atas
    },

    async getUser() {
      try {
        const res = await api.get("/users");
        this.user = res.data;
        this.isAuthenticated = true;
      } catch {
        this.user = null;
        this.isAuthenticated = false;
        Cookies.remove("accessToken");
      }
    },

    async logout() {
      await api.post("/auth/logout");
      this.user = null;
      this.isAuthenticated = false;
      Cookies.remove("accessToken");
    },
  },

  persist: {
    pick: ["user", "isAuthenticated"],
    storage: sessionStorage,
  },
});
