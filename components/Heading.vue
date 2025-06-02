<template>
  <div class="flex w-full flex-col items-center gap-12 px-4 pt-8">
    <nav class="relative flex w-full items-center justify-between">
      <Logo />
      <button class="flex items-center gap-[0.625rem]">
        <NuxtImg
          src="/images/avatar-lisa.jpg"
          width="40"
          height="40"
          class="rounded-full object-cover object-center"
          @click.stop="showDropdown = !showDropdown"
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
    <div v-if="todaysMoodEntry" class="flex w-full flex-col items-center gap-5">
      <div
        class="flex w-full flex-col items-center gap-8 rounded-2xl border border-solid border-blue-100 bg-neutral-0 px-4 py-8"
      >
        <h2 class="flex flex-col text-center">
          <span
            class="text-[2rem] font-bold leading-[1.4] tracking-[-0.3px] text-neutral-900/70"
            >I’m feeling</span
          >
          <span
            class="leading-1.2 text-[2.5rem] font-bold tracking-[-0.3px] text-neutral-900"
            >{{ todaysMoodSummary.title }}</span
          >
        </h2>
        <NuxtImg :src="todaysMoodSummary.img" width="200" height="200" />
        <div class="flex flex-col items-center gap-4">
          <NuxtImg src="/images/icon-quote.svg" width="24" height="24" />
          <span
            class="text-center text-lg font-medium italic leading-[1.3] tracking-normal text-neutral-900"
            >“{{ moodQuote }}”</span
          >
        </div>
      </div>

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

      <div
        class="flex w-full flex-col gap-4 rounded-2xl border border-solid border-blue-100 bg-neutral-0 p-5"
      >
        <div class="flex items-center gap-3">
          <NuxtImg src="/images/icon-reflection.svg" width="22" height="22" />
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
          <span
            v-for="tag in feelingsTags"
            :key="tag.id"
            class="font-medium italic leading-[1.3] tracking-normal text-neutral-600"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <button
      v-else
      class="h-14 w-56 rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0"
      @click="$emit('openlogmoodmodal')"
    >
      Log today's mood
    </button>
  </div>
</template>

<script setup>
const { moodEntries } = useMoodEntriesStore();
const moodQuote = ref(null);
const showDropdown = ref(false);

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
