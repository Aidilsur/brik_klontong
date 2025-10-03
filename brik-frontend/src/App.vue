<script setup lang="ts">
import { useCounterStore } from './store/counter';


const counter = useCounterStore()
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">Tambah</button>
  </div>
</template>