<template>
  <Loading>
    <div
      class="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-20"
    >
      <Logo />
      <main
        class="flex w-full flex-col gap-8 rounded-2xl bg-neutral-0 px-4 py-10 text-neutral-500 shadow-[0_8px_16px_rgba(32,37,41,0.08)]"
      >
        <div class="flex w-full flex-col gap-2">
          <h1
            class="text-[2rem] font-bold leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >
            Create an account
          </h1>
          <p
            class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
          >
            Join to track your daily mood and sleep with ease.
          </p>
        </div>
        <SignupForm />
      </main>
    </div>
  </Loading>
</template>

<script setup>
useHead({
  title: "Mood Tracking | Sign Up",
});

definePageMeta({
  middleware: ["guest"],
});
</script>
