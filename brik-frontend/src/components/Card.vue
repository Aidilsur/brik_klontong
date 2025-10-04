<template>
  <div class="card">
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>

    <div>
      <slot />
    </div>

    <footer v-if="$slots.actions" class="card-footer">
      <slot name="actions" />
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "Card",
};
</script>
