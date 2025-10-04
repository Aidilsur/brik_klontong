<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import Card from "../components/Card.vue";

import { loginSchema } from "../validation/auth";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errors = ref<{ email?: string; password?: string }>({});

const handleLogin = async () => {
  errors.value = {}; // reset errors

  const result = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  });

  if (!result.success) {
    // Collect errors
    for (const issue of result.error.issues) {
      errors.value[issue.path[0] as "email" | "password"] = issue.message;
    }
    return;
  }

  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Login failed!");
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 p-4">
    <Card class="max-w-md w-full">
      <template #header>
        <h1 class="text-2xl font-bold text-center mb-6">LOGIN</h1>
      </template>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <Input
          v-model="email"
          name="email"
          label="Email"
          type="email"
          :errorMessage="errors.email"
          placeholder="Enter your email"
          autocomplete="email"
          required
        />

        <Input
          v-model="password"
          name="password"
          label="Password"
          type="password"
          :errorMessage="errors.password"
          placeholder="Enter your password"
          autocomplete="current-password"
          required
        />

        <Button type="submit" variant="solid" color="primary" class="w-full">
          Login
        </Button>
      </form>

      <template #actions>
        <p class="text-center text-sm mt-4">
          Don't have an account?
          <router-link
            to="/register"
            class="text-primary hover:underline font-semibold"
          >
            Register
          </router-link>
        </p>
      </template>
    </Card>
  </div>
</template>
