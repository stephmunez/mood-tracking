<template>
  <main class="flex w-full flex-col gap-8 px-4">
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
