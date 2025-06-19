<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-start justify-center overflow-y-scroll bg-neutral-900/70 px-4 py-[4.5rem]"
      @click.self="emitClose"
    >
      <Transition name="modal-fade">
        <div
          class="relative flex w-full max-w-[600px] flex-col gap-6 rounded-2xl bg-white from-[#F5F5FF] from-[73%] to-[#E0E0FF] to-[100%] px-5 py-8 transition-all md:px-10 md:py-12"
          style="
            background-image: linear-gradient(
              to bottom,
              var(--tw-gradient-stops)
            );
          "
          v-if="currentStep"
        >
          <h2
            class="text-[2rem] font-bold leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >
            Log Your Mood
          </h2>

          <!-- Progress Indicator -->
          <div class="pointer-events-none flex w-full items-center gap-4">
            <div
              v-for="i in 4"
              :key="i"
              :class="[
                'h-[0.375rem] w-full rounded-full transition-colors duration-300',
                currentStep >= i ? 'bg-blue-600' : 'bg-blue-200',
              ]"
            ></div>
          </div>

          <Transition name="step-fade" mode="out-in">
            <div :key="currentStep">
              <!-- Step 1 -->
              <div v-if="currentStep === 1" class="flex flex-col gap-4">
                <h3
                  class="text-[1.75rem] font-bold leading-[1.3] tracking-[-0.3px] text-neutral-900"
                >
                  How was your mood today?
                </h3>

                <div class="flex w-full flex-col justify-between gap-3">
                  <button
                    v-for="mood in moods"
                    :key="mood.value"
                    @click="selectMood(mood.value)"
                    :class="[
                      'flex items-center justify-between rounded-[10px] border-2 border-solid bg-neutral-0 px-4 py-3 text-center transition-colors duration-300',
                      selectedMood === mood.value
                        ? 'border-blue-600'
                        : 'border-blue-200',
                    ]"
                  >
                    <div class="flex w-full items-center gap-3">
                      <div
                        :class="[
                          'h-5 w-5 rounded-full border-solid transition-colors duration-300',
                          selectedMood === mood.value
                            ? 'border-4 border-blue-600'
                            : 'border-[1.5px] border-blue-200',
                        ]"
                      ></div>
                      <span class="text-xl font-semibold text-neutral-900">{{
                        mood.label
                      }}</span>
                    </div>
                    <NuxtImg :src="mood.image" width="38" height="38" />
                  </button>
                </div>
              </div>

              <!-- Step 2 -->
              <div v-else-if="currentStep === 2" class="flex flex-col gap-4">
                <div class="flex w-full flex-col gap-1">
                  <h3 class="text-[1.75rem] font-bold text-neutral-900">
                    How did you feel??
                  </h3>
                  <p
                    class="text-lg font-medium leading-[1.2] tracking-normal text-neutral-600"
                  >
                    Select up to three tags:
                  </p>
                </div>

                <div class="flex flex-wrap gap-3">
                  <label
                    v-for="feeling in feelings"
                    :key="feeling"
                    :class="[
                      'flex cursor-pointer items-center gap-3 rounded-[10px] border-2 border-solid bg-neutral-0 px-3 py-2 transition-colors duration-300',
                      selectedFeelings.includes(feeling)
                        ? 'border-blue-600'
                        : 'border-blue-200',
                    ]"
                  >
                    <input
                      type="checkbox"
                      :value="feeling"
                      :checked="selectedFeelings.includes(feeling)"
                      @change="toggleFeeling(feeling)"
                      class="hidden"
                    />
                    <div
                      class="flex h-5 w-5 items-center justify-center rounded-[4px] border-2 transition-colors duration-300"
                      :class="
                        selectedFeelings.includes(feeling)
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-neutral-300 bg-neutral-0'
                      "
                    >
                      <NuxtImg
                        src="/images/icon-check.svg"
                        width="12"
                        height="10"
                        v-if="selectedFeelings.includes(feeling)"
                      />
                    </div>
                    <span
                      class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
                      >{{ feeling }}</span
                    >
                  </label>
                </div>
              </div>

              <!-- Step 3 -->
              <div v-else-if="currentStep === 3" class="flex flex-col gap-4">
                <h3 class="text-[1.75rem] font-bold text-neutral-900">
                  Write about your day...
                </h3>
                <textarea
                  v-model="journalEntry"
                  placeholder="Today, I felt..."
                  class="min-h-[150px] rounded-[10px] border border-solid border-neutral-300 bg-neutral-0 px-4 py-3 text-lg font-medium leading-[1.3] tracking-normal transition-colors duration-300 placeholder:italic focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
                  maxlength="150"
                />
              </div>

              <!-- Step 4 -->
              <div v-if="currentStep === 4" class="flex flex-col gap-4">
                <h3
                  class="text-[1.75rem] font-bold leading-[1.3] tracking-[-0.3px] text-neutral-900"
                >
                  How was your mood today?
                </h3>

                <div class="flex w-full flex-col justify-between gap-3">
                  <button
                    v-for="hour in hours"
                    :key="hour.value"
                    @click="selectHour(hour.value)"
                    :class="[
                      'flex items-center justify-between rounded-[10px] border-2 border-solid bg-neutral-0 px-4 py-3 text-center transition-colors duration-300',
                      selectedHour === hour.value
                        ? 'border-blue-600'
                        : 'border-blue-200',
                    ]"
                  >
                    <div class="flex w-full items-center gap-3">
                      <div
                        :class="[
                          'h-5 w-5 rounded-full border-solid transition-colors duration-300',
                          selectedHour === hour.value
                            ? 'border-4 border-blue-600'
                            : 'border-[1.5px] border-blue-200',
                        ]"
                      ></div>
                      <span class="text-xl font-semibold text-neutral-900">{{
                        hour.label
                      }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Buttons -->
          <div class="flex items-center justify-between gap-3">
            <button
              v-if="currentStep > 1"
              class="w-full rounded-[10px] border border-blue-600 px-8 py-4 text-2xl font-normal text-blue-600"
              @click="currentStep--"
            >
              Back
            </button>

            <button
              v-if="currentStep < 4"
              class="w-full rounded-[10px] bg-blue-600 px-8 py-4 text-2xl font-semibold text-neutral-0 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="
                (currentStep === 1 && selectedMood === null) ||
                (currentStep === 2 && selectedFeelings.length === 0) ||
                (currentStep === 3 && journalEntry.length === 0)
              "
              @click="nextStep"
            >
              Continue
            </button>

            <button
              v-if="currentStep === 4"
              class="w-full rounded-[10px] bg-blue-600 px-8 py-4 text-2xl font-semibold text-neutral-0 transition-colors transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              @click="handleSubmit"
              :disabled="!selectedHour || isSubmitting"
            >
              {{ isSubmitting ? "Saving.." : "Submit" }}
            </button>
          </div>

          <!-- Close Button -->
          <button
            class="absolute right-5 top-5 flex h-6 w-6 items-center justify-center md:right-7 md:top-7"
            @click="emitClose"
          >
            <NuxtImg src="/images/icon-close.svg" width="15" height="15" />
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(["close"]);
const moodEntriesStore = useMoodEntriesStore();

const selectedMood = ref(null);
const selectedFeelings = ref([]);
const journalEntry = ref("");
const selectedHour = ref(null);
const currentStep = ref(1);
const isSubmitting = ref(false);

const moods = [
  { value: 2, image: "/images/icon-very-happy-color.svg", label: "Very Happy" },
  { value: 1, image: "/images/icon-happy-color.svg", label: "Happy" },
  { value: 0, image: "/images/icon-neutral-color.svg", label: "Neutral" },
  { value: -1, image: "/images/icon-sad-color.svg", label: "Sad" },
  { value: -2, image: "/images/icon-very-sad-color.svg", label: "Very Sad" },
];

const feelings = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
];

const hours = [
  { value: 9, label: "9+ hours" },
  { value: 7.5, label: "7-8 hours" },
  { value: 5.5, label: "5-6 hours" },
  { value: 3.5, label: "3-4 hours" },
  { value: 1, label: "0-2 hours" },
];

const selectMood = (value) => {
  selectedMood.value = value;
};

const toggleFeeling = (value) => {
  if (selectedFeelings.value.includes(value)) {
    selectedFeelings.value = selectedFeelings.value.filter((v) => v !== value);
  } else if (selectedFeelings.value.length < 3) {
    selectedFeelings.value.push(value);
  }
};

const selectHour = (value) => {
  selectedHour.value = value;
};

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const emitClose = () => {
  emit("close");
  selectedMood.value = null;
  selectedFeelings.value = [];
  journalEntry.value = "";
  selectedHour.value = "";
  currentStep.value = 1;
};

const handleSubmit = async () => {
  isSubmitting.value = true;

  const moodEntry = {
    createdAt: new Date().toISOString(),
    mood: selectedMood.value,
    feelings: [...selectedFeelings.value],
    journalEntry: journalEntry.value,
    sleepHours: selectedHour.value,
  };

  try {
    await moodEntriesStore.addMoodEntry(moodEntry);
    emitClose();
  } catch (error) {
    console.error("Submission failed:", error);
  } finally {
    isSubmitting.value = false;
  }
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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.3s ease;
}
.step-fade-enter-from,
.step-fade-leave-to {
  opacity: 0;
}
</style>
