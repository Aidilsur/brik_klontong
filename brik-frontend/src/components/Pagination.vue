<template>
  <div class="flex justify-center space-x-2">
    <button
      class="px-3 py-1 rounded border cursor-pointer"
      :disabled="currentPage === 1"
      @click="$emit('change-page', currentPage - 1)"
    >
      Prev
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="$emit('change-page', page)"
      :class="[
        'px-3 py-1 rounded border cursor-pointer',
        page === currentPage ? 'bg-blue-500 text-white' : 'bg-white',
      ]"
    >
      {{ page }}
    </button>

    <button
      class="px-3 py-1 rounded border cursor-pointer"
      :disabled="currentPage === totalPages"
      @click="$emit('change-page', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["change-page"],
  setup(props, { emit }) {
    const pages = computed(() => {
      const arr = [];
      for (let i = 1; i <= props.totalPages; i++) {
        arr.push(i);
      }
      return arr;
    });

    return { pages, emit };
  },
});
</script>
