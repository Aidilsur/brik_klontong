<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "../validation/auth";
import { toast } from "vue3-toastify";

const username = ref("");
const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  try {
    const parsed = registerSchema.parse({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    await auth.register(parsed.username, parsed.email, parsed.password);

    toast.success("Register berhasil!");
    router.push("/login");
  } catch (err: any) {
    if (err.errors) {
      toast.error(err.errors[0].message); // pesan error dari Zod
    } else {
      toast.error("Register gagal!");
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="handleRegister" class="flex flex-col gap-2 w-64">
      <input
        v-model="username"
        placeholder="Username"
        class="border p-2 rounded"
      />
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
      <button class="bg-green-500 text-white py-2 rounded">Register</button>
    </form>
  </div>
</template>
