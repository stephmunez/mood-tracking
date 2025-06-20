<template>
  <main
    class="flex w-full max-w-[1440px] flex-col gap-8 px-4 md:px-8 lg:flex-row lg:px-32"
  >
    <AverageMoodAndSleep :moodEntries="moodEntries" />
    <Trends :moodEntries="moodEntries" />
  </main>
</template>

<script setup>
const { moodEntries } = defineProps({
  moodEntries: {
    type: Array,
    default: () => [],
  },
});
</script>
