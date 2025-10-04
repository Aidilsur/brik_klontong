<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("/dashboard");
  } catch (error: any) {
    console.log("error :", error.response.data.message);
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Login gagal!");
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-2 w-64">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border p-2 rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 rounded"
      />
      <button class="bg-blue-500 text-white py-2 rounded">Login</button>
    </form>
  </div>
</template>
