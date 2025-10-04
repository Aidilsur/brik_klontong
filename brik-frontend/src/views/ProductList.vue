<script setup lang="ts">
import { useAuthStore } from "../store/auth";

const auth = useAuthStore();

console.log("auth :", auth.user?.name);
</script>

<template>
  <div class="h-screen">
    <h1 class="text-2xl font-bold mb-4">DashboardPage</h1>
  </div>
</template>
