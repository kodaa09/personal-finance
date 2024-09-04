<script setup lang="ts">
defineProps({
  message: String
})
</script>

<template>
  <p class="text-sm text-red-800" v-if="message !== ''">{{ message }}</p>
</template>
