import {
  type CreateProductType,
  type ProductType,
} from "./../../types/product";
import { defineStore } from "pinia";
import api from "../api/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as ProductType[],
    totalItems: 0,
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
  }),

  getters: {
    totalPages(state): number {
      return Math.ceil(state.totalItems / state.pageSize);
    },
  },

  actions: {
    async fetchProducts() {
      try {
        const params = {
          page: this.currentPage,
          limit: this.pageSize,
          search: this.searchQuery.trim() || undefined,
        };

        const response = await api.get("/products", { params });

        this.products = response.data.data;
        this.totalItems = response.data.total;
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      }
    },

    async setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
      await this.fetchProducts();
    },

    async setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        await this.fetchProducts();
      }
    },

    async deleteProduct(id: number) {
      try {
        await api.delete(`/products/${id}`);
        this.fetchProducts();
      } catch (error) {
        console.error("Gagal hapus produk:", error);
      }
    },

    async addProduct(data: CreateProductType) {
      try {
        await api.post("/products", data);
      } catch (error) {
        console.error("Gagal membuat produk:", error);
        throw error;
      }
    },

    async fetchProductById(id: number) {
      try {
        const response = await api.get(`/products/${id}`);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch product by id:", error);
        return null;
      }
    },

    async updateProduct(id: number, data: CreateProductType) {
      try {
        await api.put(`/products/${id}`, data);
      } catch (error) {
        console.error("Failed to update product:", error);
        throw error;
      }
    },
  },
});
