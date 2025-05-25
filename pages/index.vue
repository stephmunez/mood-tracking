<template>
  <div class="flex min-h-screen w-full flex-col gap-16 pb-20">
    <Heading @openmodal="handleOpenModal" />
    <Main />
    <LogMoodModal :visible="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
const showModal = ref(false);

const handleOpenModal = () => {
  showModal.value = true;
};

useHead({
  title: "Mood Tracking | Home",
});
</script>
