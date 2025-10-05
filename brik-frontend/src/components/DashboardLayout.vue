<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="flex-col w-64 bg-white border-r border-gray-20 hidden lg:flex"
    >
      <!-- Menu -->
      <nav class="flex flex-col flex-grow p-4 space-y-2">
        <button
          class="btn btn-ghost-primary w-full text-left"
          @click="selectMenu('/')"
          :class="{ 'font-semibold': selectedMenu === '/' }"
        >
          Product
        </button>
      </nav>

      <!-- Logout button at bottom -->
      <div class="p-4 border-t border-gray-200">
        <div class="text-center mb-2 font-bold">
          <p>{{ userName }}</p>
        </div>
        <Button
          type="submit"
          variant="outline"
          color="error"
          class="w-full"
          @click="logout"
          >Logout</Button
        >
        <!-- <button class="btn btn-solid-primary w-full">Logout</button> -->
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-grow p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Button from "./Button.vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const selectedMenu = ref("product");
const auth = useAuthStore();
const router = useRouter();

function selectMenu(menu: string) {
  selectedMenu.value = menu;
}

const userName = auth.user?.name;

function logout() {
  auth.logout();
  router.push({ name: "Login" });
}
</script>

<style scoped>
/* No extra styles needed as Tailwind + your classes handle it */
</style>
