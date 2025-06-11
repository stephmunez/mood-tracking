<template>
  <div
    v-if="authStore.user || !authStore.authReady"
    class="flex h-screen items-center justify-center"
  >
    <Logo />
  </div>
  <slot v-else></slot>
</template>

<script setup>
import { useAuthStore } from "../stores/useAuthStore";

const authStore = useAuthStore();
</script>
