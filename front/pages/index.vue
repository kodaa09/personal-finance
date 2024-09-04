<script setup lang="ts">
const isLogin = ref(true)
</script>

<template>
  <div class="flex">
    <div class="w-5/12">
      <div class="h-[calc(100vh-40px)] my-5">
        <img class="object-contain w-full h-full" src="/Sidebar.png" alt="">
      </div>
    </div>
    <div class="w-7/12 flex flex-col items-center justify-center">
      <LoginForm v-if="isLogin" @update:page="isLogin = false"/>
      <SignupForm v-else @update:page="isLogin = true"/>
    </div>
  </div>
</template>

<style scoped>

</style>
