<template>
  <main
    class="flex min-h-screen w-full flex-col items-center justify-center px-4 md:px-8 lg:px-32"
  >
    <div class="flex w-full flex-col items-center gap-8">
      <h1
        class="text-[6.25rem] font-semibold leading-[1] text-blue-600 md:text-[7.5rem] xl:text-[10rem]"
      >
        {{ error.statusCode }}
      </h1>
      <p
        class="text-[1.75rem] font-bold leading-[1.3] tracking-[-0.3px] text-neutral-900"
      >
        {{ error.message }}
      </p>
      <NuxtLink
        to="/"
        class="flex h-14 w-56 transform items-center justify-center rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0 transition-all duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95"
        >Go back home</NuxtLink
      >
    </div>
  </main>
</template>

<script setup>
defineProps({
  error: Object,
});
</script>
