<script setup lang="ts">

</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 h-full bg-white rounded-r-lg">
    <div>
      <h1 class="text-black pl-8 py-10 mb-4 text-xl">Finance</h1>
    </div>
    <nav class="">
      <ul class="flex flex-col text-black">
        <li class="flex flex-col">
          <NuxtLink class="px-8 py-4" to="/dashboard" exactActiveClass="is-active">
            Dashboard
          </NuxtLink>
        </li>
        <li class="flex flex-col">
          <NuxtLink class="px-8 py-4" to="/transactions" exactActiveClass="is-active">
            Transactions
          </NuxtLink>
        </li>
        <li class="flex flex-col">
          <NuxtLink class="px-8 py-4" to="/categories" exactActiveClass="is-active">
            Categories
          </NuxtLink>
        </li>
        <li class="flex flex-col">
          <NuxtLink class="px-8 py-4" to="/goals" exactActiveClass="is-active">
            Goals
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.is-active {
  background-color: black;
  color: white;
  width: 80%;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
}
</style>
