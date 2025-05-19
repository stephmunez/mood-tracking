<template>
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
          Personalize your experience
        </h1>
        <p
          class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
        >
          Add your name and a profile picture to make Mood yours.
        </p>
      </div>
      <OnboardingForm />
    </main>
  </div>
</template>

<script setup>
useHead({
  title: "Mood Tracking | Onboarding",
});
</script>
