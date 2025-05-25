<template>
  <div class="flex w-full flex-col items-center gap-12 px-4 pt-8">
    <nav class="flex w-full items-center justify-between">
      <Logo />
      <button class="flex items-center gap-[0.625rem]">
        <NuxtImg
          src="/images/avatar-lisa.jpg"
          width="40"
          height="40"
          class="rounded-full object-cover object-center"
        />
        <NuxtImg src="/images/icon-dropdown-arrow.svg" width="10" />
      </button>
    </nav>

    <div class="flex w-full flex-col items-center gap-4">
      <span
        class="text-center text-2xl font-bold leading-[1.3] tracking-[-0.3px] text-blue-600"
        >Hello, Lisa!</span
      >
      <h1
        class="text-center text-[2.875rem] font-bold leading-[1.2] tracking-[-2px] text-neutral-900"
      >
        How are you feeling today?
      </h1>
      <span
        class="text-lg font-medium leading-[1.2] tracking-normal text-neutral-600"
        >Wednesday, April 16th, 2025</span
      >
    </div>

    <button
      class="h-14 w-56 rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0"
      @click="$emit('openmodal')"
    >
      Log today's mood
    </button>
  </div>
</template>
