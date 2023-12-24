<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">menuAI</h1>
        <p class="py-6">Generate your daily menus with AI</p>
        <NuxtLink class="btn btn-secondary hover:bg-accent mt-4 w-full" to="/api/login" external>
          Sign In
        </NuxtLink>
        <NuxtLink class="btn btn-secondary hover:bg-accent mt-4 w-full" to="/api/register" external>
          Sign Up
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>