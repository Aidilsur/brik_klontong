<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "../validation/auth";
import { toast } from "vue3-toastify";

import Card from "../components/Card.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";

const username = ref("");
const email = ref("");
const password = ref("");

const errors = ref<{ username?: string; email?: string; password?: string }>(
  {}
);

const auth = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  errors.value = {};

  const result = registerSchema.safeParse({
    username: username.value,
    email: email.value,
    password: password.value,
  });

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.value[issue.path[0] as "username" | "email" | "password"] =
        issue.message;
    }
    return;
  }

  try {
    await auth.register(
      result.data.username,
      result.data.email,
      result.data.password
    );
    toast.success("Register berhasil!");
    router.push("/login");
  } catch (err: any) {
    if (err.response) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Register gagal!");
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 p-4">
    <Card class="max-w-md w-full">
      <template #header>
        <h1 class="text-2xl font-bold text-center mb-6">Register</h1>
      </template>

      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <Input
          v-model="username"
          name="username"
          label="Username"
          placeholder="Enter your username"
          :errorMessage="errors.username"
          required
        />

        <Input
          v-model="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          :errorMessage="errors.email"
          required
        />

        <Input
          v-model="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          :errorMessage="errors.password"
          required
        />

        <Button type="submit" variant="solid" color="primary" class="w-full">
          Login
        </Button>
      </form>

      <template #actions>
        <p class="text-center text-sm mt-4">
          Already have an account?
          <router-link
            to="/login"
            class="text-primary hover:underline font-semibold"
          >
            Login
          </router-link>
        </p>
      </template>
    </Card>
  </div>
</template>
