<template>
  <div class="flex flex-col space-y-1 w-full">
    <label :for="name" class="input-label">
      {{ label }}
    </label>

    <input
      v-bind="$attrs"
      :id="name"
      :name="name"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${name}-error` : undefined"
      :class="[
        'input',
        errorMessage ? 'input-error' : 'border-gray-300',
        $attrs.class,
      ]"
    />

    <p
      v-if="errorMessage"
      :id="`${name}-error`"
      class="text-error text-xs mt-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
const {
  label,
  modelValue,
  name,
  type = "text",
  disabled = false,
  errorMessage = "",
} = defineProps<{
  label: string;
  modelValue: string;
  name: string;
  type?: string;
  disabled?: boolean;
  errorMessage?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

// Handler for input event, type-safe
function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<script lang="ts">
export default {
  name: "Input",
};
</script>
