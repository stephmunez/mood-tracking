<template>
  <form action="#" class="flex w-full flex-col gap-8">
    <div class="flex w-full flex-col gap-5">
      <div class="flex w-full flex-col gap-2">
        <label
          for="email"
          class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >Email address</label
        >
        <input
          v-model="email"
          type="email"
          placeholder="name@email.com"
          required
          class="rounded-[10px] border border-solid border-neutral-300 px-4 py-3 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600 placeholder:text-neutral-300"
        />
      </div>
      <div class="flex w-full flex-col gap-2">
        <label
          for="password"
          class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >Password</label
        >
        <input
          v-model="password"
          type="password"
          required
          class="rounded-[10px] border border-solid border-neutral-300 px-4 py-3 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600 placeholder:text-neutral-300"
        />
      </div>
    </div>
    <div class="flex w-full flex-col items-center gap-5">
      <div class="flex w-full flex-col gap-2">
        <button
          type="submit"
          class="h-14 w-full rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          @click="handleLogin"
          :disabled="isLoading"
        >
          {{ isLoading ? "Logging in.." : "Log In" }}
        </button>
        <p
          v-if="authStore.loginError"
          class="flex items-center gap-1 text-xs font-normal leading-[1.1] tracking-normal text-red-700"
        >
          <NuxtImg src="/images/icon-info-circle.svg" width="12" height="12" />
          <span>{{ authStore.loginError }}</span>
        </p>
      </div>
      <p class="text-lg leading-[1.4] tracking-[-0.3px] text-neutral-600">
        Haven't got an account?
        <NuxtLink to="/sign-up" class="text-blue-600">Sign up.</NuxtLink>
      </p>
    </div>
  </form>
</template>

<script setup>
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const authStore = useAuthStore();

const handleLogin = async (e) => {
  e.preventDefault();
  isLoading.value = true;

  await authStore.login(email.value, password.value);

  isLoading.value = false;
};
</script>
