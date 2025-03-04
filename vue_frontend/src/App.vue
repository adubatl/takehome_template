<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Vue + TypeScript + Vite
      </h1>
      <div class="p-4">
        <button
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          @click="increment"
        >
          Count is: {{ count }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script> 