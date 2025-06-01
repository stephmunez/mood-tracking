<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-start justify-center overflow-y-scroll bg-neutral-900/70 px-4 py-[4.5rem]"
      @click.self="emitClose"
    >
      <div
        class="relative flex w-full flex-col gap-6 rounded-2xl border border-solid border-blue-100 bg-white px-5 py-10 shadow-[0_8px_16px_rgba(32,37,41,0.08)]"
      >
        <div class="flex w-full flex-col gap-2">
          <h2
            class="text-[2rem] font-bold leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >
            Update your profile
          </h2>
          <p
            class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
          >
            Personalize your account with your name and photo.
          </p>
        </div>
        <UpdateProfileForm />

        <button
          class="absolute right-4 top-4 flex h-6 w-6 items-center justify-center"
          @click="emitClose"
        >
          <NuxtImg src="/images/icon-close.svg" width="10" height="10" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
  selectedMood.value = null;
  selectedFeelings.value = [];
  journalEntry.value = "";
  selectedHour.value = "";
  currentStep.value = 1;
};

const handleSubmit = () => {
  const moodEntry = {
    createdAt: new Date().toISOString(),
    mood: selectedMood.value,
    feelings: [...selectedFeelings.value],
    journalEntry: journalEntry.value,
    sleepHours: selectedHour.value,
  };

  emitClose();
  console.log(moodEntry);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
