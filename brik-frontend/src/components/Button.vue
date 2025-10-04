<template>
  <button
    v-bind="$attrs"
    :class="['btn', variantClass, disabledClass, $attrs.class]"
    :disabled="disabled"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  variant?: "solid" | "outline" | "ghost";
  color?: "primary" | "success" | "error";
  disabled?: boolean;
}>();

const variant = props.variant ?? "solid";
const color = props.color ?? "primary";

const variantClass = computed(() => {
  return `btn-${variant}-${color}`;
});

const disabledClass = computed(() => {
  return props.disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";
});
</script>

<script lang="ts">
export default {
  name: "Button",
};
</script>
