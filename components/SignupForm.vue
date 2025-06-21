<template>
  <form @submit="handleSignup" class="flex w-full flex-col gap-8">
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
          class="rounded-[10px] border border-solid border-neutral-300 px-4 py-3 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600 transition-colors duration-300 placeholder:text-neutral-300 hover:border-neutral-900 focus:border-neutral-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 active:border-neutral-900"
          required
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
          placeholder="Password"
          class="rounded-[10px] border border-solid border-neutral-300 px-4 py-3 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600 transition-colors duration-300 placeholder:text-neutral-300 hover:border-neutral-900 focus:border-neutral-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 active:border-neutral-900"
          required
        />
      </div>
    </div>
    <div class="flex w-full flex-col items-center gap-5">
      <div class="flex w-full flex-col gap-2">
        <button
          type="submit"
          class="h-14 w-full rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0 transition-all duration-300 hover:bg-blue-700 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="isLoading"
        >
          {{ isLoading ? "Signing up.." : "Sign Up" }}
        </button>
        <p
          v-if="authStore.signupError"
          class="flex items-center gap-1 text-xs font-normal leading-[1.1] tracking-normal text-red-700"
        >
          <NuxtImg src="/images/icon-info-circle.svg" width="12" height="12" />
          <span>{{ authStore.signupError }}</span>
        </p>
      </div>

      <p class="text-lg leading-[1.4] tracking-[-0.3px] text-neutral-600">
        Already got an account?
        <NuxtLink
          to="/log-in"
          class="transition-colors-duration-300 text-blue-600 hover:text-blue-700 active:text-blue-700"
          >Log in.</NuxtLink
        >
      </p>
    </div>
  </form>
</template>

<script setup>
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const authStore = useAuthStore();

const handleSignup = async (e) => {
  e.preventDefault();
  isLoading.vale = true;

  await authStore.signup(email.value, password.value);

  isLoading.value = false;
};
</script>
