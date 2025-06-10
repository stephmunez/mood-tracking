<template>
  <div class="flex min-h-screen w-full flex-col gap-16 pb-20">
    <Heading
      @openlogmoodmodal="handleOpenLogMoodModal"
      @opensettingsmodal="handleOpenSettingsModal"
      :moodEntries="moodEntriesStore.moodEntries"
    />
    <Main :moodEntries="moodEntriesStore.moodEntries" />
    <LogMoodModal
      :visible="showLogMoodModal"
      @close="showLogMoodModal = false"
    />
    <SettingsModal
      :visible="showSettingsModal"
      @close="showSettingsModal = false"
    />
  </div>
</template>

<script setup>
const moodEntriesStore = useMoodEntriesStore();
const showLogMoodModal = ref(false);
const showSettingsModal = ref(false);

onMounted(async () => {
  await moodEntriesStore.fetchMoodEntries();
});

const handleOpenLogMoodModal = () => {
  showLogMoodModal.value = true;
};
const handleOpenSettingsModal = () => {
  showSettingsModal.value = true;
};

useHead({
  title: "Mood Tracking | Home",
});

definePageMeta({
  middleware: ["auth"],
});
</script>
