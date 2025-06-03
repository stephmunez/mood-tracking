<template>
  <div class="flex w-full flex-col items-center gap-12 px-4 pt-8">
    <nav class="relative flex w-full items-center justify-between">
      <Logo />
      <button
        class="flex items-center gap-[0.625rem]"
        @click.stop="showDropdown = !showDropdown"
      >
        <NuxtImg
          src="/images/avatar-lisa.jpg"
          width="40"
          height="40"
          class="rounded-full object-cover object-center"
        />
        <NuxtImg src="/images/icon-dropdown-arrow.svg" width="10" />
      </button>
      <transition name="fade">
        <div
          v-if="showDropdown"
          v-click-outside="() => (showDropdown = false)"
          class="absolute left-0 top-14 z-50 flex w-full flex-col gap-3 rounded-lg bg-white px-4 py-3 shadow-[0_5px_8px_rgba(32,33,77,0.16)]"
        >
          <div class="flex flex-col gap-[2px]">
            <span
              class="text-lg font-medium leading-[1.2] tracking-normal text-neutral-900"
              >Lisa Maria</span
            >
            <span
              class="text-[0.935rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-300"
              >lisa@mail.com</span
            >
          </div>
          <div class="pointer-events-none h-px w-full bg-blue-100"></div>
          <button
            class="flex items-center gap-[0.625rem]"
            @click="$emit('opensettingsmodal')"
          >
            <NuxtImg src="/images/icon-settings.svg" width="16" height="16" />
            <span
              class="text-[0.935rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
              >Settings</span
            >
          </button>
          <button class="flex items-center gap-[0.625rem]">
            <NuxtImg src="/images/icon-logout.svg" width="16" height="16" />
            <span
              class="text-[0.935rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
              >Logout</span
            >
          </button>
        </div>
      </transition>
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
      >
        {{ todayString }}</span
      >
    </div>

    <!-- Main content with improved transitions -->
    <transition name="slide-fade" mode="out-in">
      <div
        v-if="dataReady && todaysMoodEntry"
        key="mood-entry"
        class="flex w-full flex-col items-center gap-5"
      >
        <div
          class="flex w-full flex-col items-center gap-8 rounded-2xl border border-solid border-blue-100 bg-neutral-0 px-4 py-8"
        >
          <h2 class="flex flex-col text-center">
            <span
              class="text-[2rem] font-bold leading-[1.4] tracking-[-0.3px] text-neutral-900/70"
              >I'm feeling</span
            >
            <span
              class="leading-1.2 text-[2.5rem] font-bold tracking-[-0.3px] text-neutral-900"
              >{{ todaysMoodSummary.title }}</span
            >
          </h2>

          <transition name="scale-fade" appear>
            <NuxtImg
              v-if="todaysMoodSummary"
              :src="todaysMoodSummary.img"
              width="200"
              height="200"
            />
          </transition>

          <transition name="fade" appear>
            <div v-if="moodQuote" class="flex flex-col items-center gap-4">
              <NuxtImg src="/images/icon-quote.svg" width="24" height="24" />
              <span
                class="text-center text-lg font-medium italic leading-[1.3] tracking-normal text-neutral-900"
                >"{{ moodQuote }}"</span
              >
            </div>
          </transition>
        </div>

        <transition name="slide-up" appear>
          <div
            class="flex w-full flex-col gap-4 rounded-2xl border border-solid border-blue-100 bg-neutral-0 p-5"
          >
            <div class="flex items-center gap-3">
              <IconSleep fill="#57577B" width="22" height="22" />
              <h2
                class="text-lg font-medium leading-[1.2] tracking-normal text-neutral-600"
              >
                Sleep
              </h2>
            </div>
            <p
              class="text-[2rem] font-bold leading-[1.4] tracking-[-0.3px] text-neutral-900"
            >
              {{ todaysSleepSummary }}
            </p>
          </div>
        </transition>

        <transition name="slide-up" appear>
          <div
            class="flex w-full flex-col gap-4 rounded-2xl border border-solid border-blue-100 bg-neutral-0 p-5"
          >
            <div class="flex items-center gap-3">
              <NuxtImg
                src="/images/icon-reflection.svg"
                width="22"
                height="22"
              />
              <h2
                class="text-lg font-medium leading-[1.2] tracking-normal text-neutral-600"
              >
                Reflection of the day
              </h2>
            </div>
            <p
              class="min-h-20 text-lg font-medium leading-[1.2] tracking-normal text-neutral-900"
            >
              {{ todaysMoodEntry.journalEntry }}
            </p>
            <div class="flex flex-wrap gap-3">
              <transition-group name="tag-fade" appear>
                <span
                  v-for="(tag, index) in feelingsTags"
                  :key="tag"
                  :style="{ transitionDelay: `${index * 50}ms` }"
                  class="font-medium italic leading-[1.3] tracking-normal text-neutral-600"
                >
                  {{ tag }}
                </span>
              </transition-group>
            </div>
          </div>
        </transition>
      </div>

      <div
        v-else-if="dataReady && !todaysMoodEntry"
        key="log-button"
        class="flex w-full flex-col items-center"
      >
        <button
          class="h-14 w-56 transform rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0 transition-all duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95"
          @click="$emit('openlogmoodmodal')"
        >
          Log today's mood
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
const { moodEntries } = defineProps({
  moodEntries: {
    type: Array,
    default: () => [],
  },
});
defineEmits(["opensettingsmodal", "openlogmoodmodal"]);

const moodQuote = ref(null);
const showDropdown = ref(false);
const dataReady = ref(false);

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      dataReady.value = true;
    }, 1000);
  });
});

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDateWithOrdinal(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const suffix = getOrdinalSuffix(day);
  return `${dayOfWeek}, ${month} ${day}${suffix}, ${year}`;
}

const todayString = formatDateWithOrdinal(new Date());

const isToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const todaysMoodEntry = computed(() => {
  return moodEntries.find((entry) => isToday(entry.createdAt));
});

const moodQuotes = {
  "-2": [
    "You are stronger than you think; the storm will pass.",
    "It's okay to cry. Healing begins when you let your feelings flow.",
    "Even in darkness, a spark of hope can shine bright.",
    "This moment is tough, but you've overcome challenges before.",
    "A gentle step forward, no matter how small, is still progress.",
  ],
  "-1": [
    "Pain is temporary, brighter days lie ahead.",
    "Each setback is a chance to grow and learn.",
    "One small positive thought can change your entire day.",
    "It's okay to rest; self-care isn't selfish.",
    "Healing takes time - be patient and kind to yourself.",
  ],
  0: [
    "A calm mind can find opportunity in every moment.",
    "Sometimes the greatest triumph is simply finding peace.",
    "Take a moment to breathe; every breath is a fresh start.",
    "Even an ordinary day can hold a pleasant surprise.",
    "Balance isn't found, it's created.",
  ],
  1: [
    "Happiness grows when it's shared with others.",
    "Celebrate even the small victories to make life extraordinary.",
    "Gratitude can turn what you have into enough.",
    "Keep smiling; your joy can be contagious.",
    "Where focus goes, energy flows - keep your focus on what lifts you.",
  ],
  2: [
    "When your heart is full, share your light with the world.",
    "Savor the highs in life; they become precious memories.",
    "Joy multiplies when spread among friends.",
    "Trust your journey; you're in a beautiful place right now.",
    "Let your happiness ripple out and inspire others.",
  ],
};

const todaysMoodSummary = computed(() => {
  if (!todaysMoodEntry.value) return null;

  const mood = todaysMoodEntry.value.mood;

  if (mood < -1) {
    return {
      img: "/images/icon-very-sad-color.svg",
      title: "Very Sad",
    };
  } else if (mood < 0) {
    return {
      img: "/images/icon-sad-color.svg",
      title: "Sad",
    };
  } else if (mood === 0) {
    return {
      img: "/images/icon-neutral-color.svg",
      title: "Neutral",
    };
  } else if (mood <= 1) {
    return {
      img: "/images/icon-happy-color.svg",
      title: "Happy",
    };
  } else {
    return {
      img: "/images/icon-very-happy-color.svg",
      title: "Very Happy",
    };
  }
});

const todaysSleepSummary = computed(() => {
  if (!todaysMoodEntry.value) return null;

  const sleepHours = todaysMoodEntry.value.sleepHours;

  if (sleepHours < 3) {
    return "0–2 Hours";
  } else if (sleepHours < 5) {
    return "3–4 Hours";
  } else if (sleepHours < 7) {
    return "5–6 Hours";
  } else if (sleepHours < 9) {
    return "7–8 Hours";
  } else {
    return "9+ Hours";
  }
});

const feelingsTags = computed(() => {
  if (!todaysMoodEntry.value) return null;

  const tags = todaysMoodEntry.value.feelings.map((tag) => `#${tag}`);

  return tags;
});

watchEffect(() => {
  if (!todaysMoodEntry.value) return;

  const mood = String(todaysMoodEntry.value.mood);
  const quotes = moodQuotes[mood];

  if (quotes?.length && !moodQuote.value) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    moodQuote.value = quotes[randomIndex];
  }
});
</script>

<style scoped>
/* Original fade transition */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Slide fade transition for main content */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

/* Scale fade for mood image */
.scale-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(-5deg);
}

/* Slide up for cards */
.slide-up-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

/* Tag stagger animation */
.tag-fade-enter-active {
  transition: all 0.3s ease;
}

.tag-fade-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

/* Pulse animation for loading */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
