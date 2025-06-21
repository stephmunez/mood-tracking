<template>
  <section
    class="flex w-full flex-col gap-6 rounded-2xl border border-solid border-blue-100 bg-neutral-0 px-4 py-5 md:p-6 lg:w-[40%] xl:w-[32%]"
  >
    <!-- Average Mood -->
    <div class="flex w-full flex-col gap-3">
      <div class="flex items-center gap-1">
        <h2
          class="text-xl font-semibold leading-[1.4] tracking-normal text-neutral-900"
        >
          Average Mood
        </h2>
        <span
          class="text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
          >(Last 5 Check-ins)</span
        >
      </div>

      <div
        v-if="lastFiveMoodAvg !== null"
        :class="[
          'relative flex min-h-[150px] w-full flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-no-repeat px-4 py-5 md:p-5',
          moodSummary.bgClass,
        ]"
      >
        <div class="flex w-full items-center gap-4">
          <NuxtImg :src="moodSummary.img" width="24" height="24" />
          <span
            class="z-10 text-2xl font-semibold leading-[1.4] tracking-normal text-neutral-900"
          >
            {{ moodSummary.title }}
          </span>
        </div>

        <div
          v-if="moodComparison !== null"
          class="flex w-full items-start gap-2"
        >
          <NuxtImg
            :src="moodComparison.img"
            width="16"
            height="16"
            class="mt-[3px]"
          />
          <span
            class="z-10 text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
            >{{ moodComparison.text }}</span
          >
        </div>

        <div
          class="top-[calc(50% - 251px)] pointer-events-none absolute -right-[182px]"
        >
          <NuxtImg
            src="/images/bg-pattern-averages.svg"
            width="243"
            height="251"
          />
        </div>
      </div>
      <div
        v-else
        class="relative flex min-h-[150px] w-full flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-blue-100 bg-no-repeat px-4 py-5 md:p-5"
      >
        <span
          class="z-10 text-2xl font-semibold leading-[1.4] tracking-normal text-neutral-900"
          >Keep tracking!</span
        >
        <span
          class="z-10 text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
          >Log 5 check-ins to see your average mood.</span
        >
        <div
          class="top-[calc(50% - 251px)] pointer-events-none absolute -right-[182px]"
        >
          <NuxtImg
            src="/images/bg-pattern-averages.svg"
            width="243"
            height="251"
          />
        </div>
      </div>
    </div>

    <!-- Average Sleep -->
    <div class="flex w-full flex-col gap-3">
      <div class="flex items-center gap-1">
        <h2
          class="text-xl font-semibold leading-[1.4] tracking-normal text-neutral-900"
        >
          Average Sleep
        </h2>
        <span
          class="text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
          >(Last 5 Check-ins)</span
        >
      </div>
      <div
        v-if="lastFiveSleepAvg !== null"
        class="relative flex min-h-[150px] w-full flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-blue-600 bg-no-repeat px-4 py-5"
      >
        <div class="flex w-full items-center gap-4">
          <IconSleep fill="#FFFFFF" width="24" height="24" />
          <span
            class="z-10 text-2xl font-semibold leading-[1.4] tracking-normal text-neutral-0"
          >
            {{ sleepSummary }}
          </span>
        </div>

        <div
          v-if="sleepComparison !== null"
          class="flex w-full items-start gap-2"
        >
          <NuxtImg
            :src="sleepComparison.img"
            width="16"
            height="16"
            class="mt-[3px]"
          />
          <span
            class="z-10 text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-0"
            >{{ sleepComparison.text }}</span
          >
        </div>

        <div
          class="top-[calc(50% - 251px)] pointer-events-none absolute -right-[182px]"
        >
          <NuxtImg
            src="/images/bg-pattern-averages.svg"
            width="243"
            height="251"
          />
        </div>
      </div>
      <div
        v-else
        class="relative flex min-h-[150px] w-full flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-blue-100 bg-no-repeat px-4 py-5"
      >
        <span
          class="z-10 text-2xl font-semibold leading-[1.4] tracking-normal text-neutral-900"
          >Not enough data yet!</span
        >
        <span
          class="z-10 text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
          >Track 5 nights to view average sleep.</span
        >
        <div
          class="top-[calc(50% - 251px)] pointer-events-none absolute -right-[182px]"
        >
          <NuxtImg
            src="/images/bg-pattern-averages.svg"
            width="243"
            height="251"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { moodEntries } = defineProps({
  moodEntries: {
    type: Array,
    default: () => [],
  },
});

const lastFiveMoodAvg = computed(() => {
  const lastFive = moodEntries.slice(-5);

  if (lastFive.length < 5) {
    return null;
  } else {
    const sum = lastFive.reduce((acc, entry) => acc + entry.mood, 0);
    return sum / lastFive.length;
  }
});

const lastFiveSleepAvg = computed(() => {
  const lastFive = moodEntries.slice(-5);

  if (lastFive.length < 5) {
    return null;
  } else {
    const sum = lastFive.reduce((acc, entry) => acc + entry.sleepHours, 0);
    return sum / lastFive.length;
  }
});

const previousFiveMoodAvg = computed(() => {
  if (moodEntries.length < 10) return null;

  const previousFive = moodEntries.slice(-10, -5);
  const sum = previousFive.reduce((acc, entry) => acc + entry.mood, 0);
  return sum / previousFive.length;
});

const previousFiveSleepAvg = computed(() => {
  if (moodEntries.length < 10) return null;

  const previousFive = moodEntries.slice(-10, -5);
  const sum = previousFive.reduce((acc, entry) => acc + entry.sleepHours, 0);
  return sum / previousFive.length;
});

const moodSummary = computed(() => {
  const average = lastFiveMoodAvg.value;

  if (average < -1) {
    return {
      bgClass: "bg-red-300",
      img: "/images/icon-very-sad-white.svg",
      title: "Very Sad",
    };
  } else if (average < 0) {
    return {
      bgClass: "bg-indigo-200",
      img: "/images/icon-sad-white.svg",
      title: "Sad",
    };
  } else if (average <= 0) {
    return {
      bgClass: "bg-blue-300",
      img: "/images/icon-neutral-white.svg",
      title: "Neutral",
    };
  } else if (average <= 1) {
    return {
      bgClass: "bg-green-300",
      img: "/images/icon-happy-white.svg",
      title: "Happy",
    };
  } else {
    return {
      bgClass: "bg-amber-300",
      img: "/images/icon-very-happy-white.svg",
      title: "Very Happy",
    };
  }
});

const sleepSummary = computed(() => {
  const average = lastFiveSleepAvg.value;

  if (average < 3) {
    return "0–2 Hours";
  } else if (average < 5) {
    return "3–4 Hours";
  } else if (average < 7) {
    return "5–6 Hours";
  } else if (average < 9) {
    return "7–8 Hours";
  } else {
    return "9+ Hours";
  }
});

const moodComparison = computed(() => {
  if (previousFiveMoodAvg.value === null) {
    return {
      text: "Need more check-ins to compare",
      img: "/images/icon-trend-same.svg",
    };
  }

  const current = lastFiveMoodAvg.value;
  const previous = previousFiveMoodAvg.value;

  const diff = current - previous;

  if (Math.abs(diff) < 0.01) {
    return {
      text: "Same as the previous 5 check-ins",
      img: "/images/icon-trend-same.svg",
    };
  } else if (diff > 0) {
    return {
      text: "Increase from the previous 5 check-ins",
      img: "/images/icon-trend-increase.svg",
    };
  } else {
    return {
      text: "Decrease from the previous 5 check-ins",
      img: "/images/icon-trend-decrease.svg",
    };
  }
});

const sleepComparison = computed(() => {
  if (previousFiveSleepAvg.value === null) {
    return {
      text: "Need more check-ins to compare",
      img: "/images/icon-trend-same-white.svg",
    };
  }

  const current = lastFiveSleepAvg.value;
  const previous = previousFiveSleepAvg.value;

  const diff = current - previous;

  if (Math.abs(diff) < 0.01) {
    return {
      text: "Same as the previous 5 check-ins",
      img: "/images/icon-trend-same-white.svg",
    };
  } else if (diff > 0) {
    return {
      text: "Increase from the previous 5 check-ins",
      img: "/images/icon-trend-increase-white.svg",
    };
  } else {
    return {
      text: "Decrease from the previous 5 check-ins",
      img: "/images/icon-trend-decrease-white.svg",
    };
  }
});
</script>
