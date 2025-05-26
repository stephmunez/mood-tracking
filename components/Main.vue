<template>
  <main class="flex w-full flex-col gap-8 px-4">
    <AverageMoodAndSleep :moodEntries="moodEntriesStore.moodEntries" />
    <Trends />
  </main>
</template>

<script setup>
const moodEntriesStore = useMoodEntriesStore();
</script>
