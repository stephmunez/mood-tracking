<template>
  <section
    class="flex w-full max-w-[768px] flex-col gap-5 rounded-2xl border border-solid border-blue-100 bg-neutral-0 py-5 pl-4 md:gap-8 md:py-6 md:pl-6 lg:max-w-[57%] xl:max-w-[65%]"
  >
    <h2
      class="text-[1.75rem] font-bold leading-[1.3] tracking-[-0.3px] text-neutral-900"
    >
      Mood and sleep trends
    </h2>
    <div class="l min-h-[316px] w-full">
      <div class="flex min-h-[316px] gap-4">
        <div class="flex min-w-[70px] flex-col gap-10">
          <div class="flex items-center gap-[0.375rem]">
            <IconSleep fill="#57577B" width="12" height="12" />
            <span
              class="text-xs font-normal leading-[1.1] tracking-normal text-neutral-600"
              >9+ hours</span
            >
          </div>
          <div class="flex items-center gap-[0.375rem]">
            <IconSleep fill="#57577B" width="12" height="12" />
            <span
              class="text-xs font-normal leading-[1.1] tracking-normal text-neutral-600"
              >7-8 hours</span
            >
          </div>
          <div class="flex items-center gap-[0.375rem]">
            <IconSleep fill="#57577B" width="12" height="12" />
            <span
              class="text-xs font-normal leading-[1.1] tracking-normal text-neutral-600"
              >5-6 hours</span
            >
          </div>
          <div class="flex items-center gap-[0.375rem]">
            <IconSleep fill="#57577B" width="12" height="12" />
            <span
              class="text-xs font-normal leading-[1.1] tracking-normal text-neutral-600"
              >3-4 hours</span
            >
          </div>
          <div class="flex items-center gap-[0.375rem]">
            <IconSleep fill="#57577B" width="12" height="12" />
            <span
              class="text-xs font-normal leading-[1.1] tracking-normal text-neutral-600"
              >0-2 hours</span
            >
          </div>
        </div>
        <div
          class="relative flex min-h-[316px] w-[calc(100%-20px)] flex-col gap-[55px] overflow-x-auto md:pr-7"
          ref="scrollContainer"
        >
          <div class="flex min-w-[614px] flex-col gap-10">
            <div
              v-for="n in 5"
              :key="n"
              class="flex h-[13.2px] w-full items-center"
            >
              <div class="h-px w-full bg-blue-100/30"></div>
            </div>
          </div>
          <div class="flex min-w-[614px] gap-4">
            <div
              v-for="(day, index) in last11Days"
              :key="index"
              class="flex h-8 w-10 flex-col items-center gap-[0.375rem]"
            >
              <span
                class="text-xs font-normal leading-[1.1] tracking-normal text-neutral-600"
              >
                {{ day.month }}
              </span>
              <span
                class="text-[0.813rem] font-semibold leading-none tracking-normal text-neutral-900"
              >
                {{ day.date }}
              </span>
            </div>
          </div>
          <div
            class="absolute bottom-12 left-0 flex min-w-[614px] items-end gap-4"
          >
            <div
              v-for="(trend, index) in moodAndSleepTrends"
              :key="index"
              class="relative w-10 cursor-pointer rounded-full transition-all duration-700"
              :style="{
                height: trend.height + 'px',
                backgroundColor: trend.color,
              }"
              @click.stop="
                () => {
                  selectedBarPopover = index;
                }
              "
            >
              <div
                v-if="trend.height > 0"
                class="absolute left-[5px] top-[5px]"
              >
                <NuxtImg :src="trend.icon" width="30" height="30" />
              </div>

              <transition name="fade">
                <div
                  v-if="selectedBarPopover === index"
                  class="absolute z-50 flex w-44 flex-col gap-3 rounded-[10px] border border-solid border-blue-100 bg-white p-3 shadow-[0_4px_7px_rgba(32,33,77,0.16)]"
                  :style="{
                    top: `${trend.height - 262}px`,
                    right: `${index < 4 ? -184 : 48}px`,
                  }"
                  v-click-outside="() => (selectedBarPopover = null)"
                >
                  <div class="flex w-full flex-col gap-2">
                    <h3
                      class="text-[0.813rem] font-semibold leading-[1] tracking-normal text-neutral-600"
                    >
                      Mood
                    </h3>
                    <div class="flex items-center gap-[0.375rem]">
                      <NuxtImg
                        :src="trend.iconColored"
                        width="16"
                        height="16"
                      />
                      <span
                        class="text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px]"
                        >{{ trend.moodLabel }}</span
                      >
                    </div>
                  </div>
                  <div class="flex w-full flex-col gap-2">
                    <h3
                      class="text-[0.813rem] font-semibold leading-[1] tracking-normal text-neutral-600"
                    >
                      Sleep
                    </h3>
                    <span
                      class="text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px]"
                      >{{ trend.sleepLabel }}</span
                    >
                  </div>
                  <div class="flex w-full flex-col gap-2">
                    <h3
                      class="text-[0.813rem] font-semibold leading-[1] tracking-normal text-neutral-600"
                    >
                      Reflection
                    </h3>
                    <span
                      class="text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px]"
                      >{{ trend.journalEntry }}</span
                    >
                  </div>
                  <div class="flex w-full flex-col gap-2">
                    <h3
                      class="text-[0.813rem] font-semibold leading-[1] tracking-normal text-neutral-600"
                    >
                      Tags
                    </h3>
                    <span
                      class="text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px]"
                      >{{ trend.feelings.join(", ") }}</span
                    >
                  </div>

                  <div
                    class="absolute z-50 h-3 w-3"
                    :style="{
                      bottom: `${trend.height - 40}px`,
                      right: `${index < 4 ? 171 : -8}px`,
                      transform: `${index < 4 ? 'scaleX(-1)' : 'scaleX(1)'}`,
                    }"
                  >
                    <NuxtImg
                      src="/images/icon-triangle.svg"
                      width="12"
                      height="12"
                    />
                  </div>
                </div>
              </transition>
            </div>

            <!-- 49,  102, 156, 208, 262-->
          </div>
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

const selectedBarPopover = ref(null);
const last11Days = ref([]);

const today = new Date();
for (let i = 10; i >= 0; i--) {
  const date = new Date();
  date.setDate(today.getDate() - i);
  last11Days.value.push({
    month: date.toLocaleString("default", { month: "short" }),
    date: date.getDate(),
  });
}

const moodAndSleepTrends = computed(() => {
  const moodToImage = {
    "-2": "/images/icon-very-sad-white.svg",
    "-1": "/images/icon-sad-white.svg",
    0: "/images/icon-neutral-white.svg",
    1: "/images/icon-happy-white.svg",
    2: "/images/icon-very-happy-white.svg",
  };

  const moodToImageColored = {
    "-2": "/images/icon-very-sad-color.svg",
    "-1": "/images/icon-sad-color.svg",
    0: "/images/icon-neutral-color.svg",
    1: "/images/icon-happy-color.svg",
    2: "/images/icon-very-happy-color.svg",
  };

  const moodToColor = {
    "-2": "#FF9B99",
    "-1": "#B8B1FF",
    0: "#89CAFF",
    1: "#89E780",
    2: "#FFC97C",
  };

  const moodToLabel = {
    "-2": "Very Sad",
    "-1": "Sad",
    0: "Neutral",
    1: "Happy",
    2: "Very Happy",
  };

  const getHeightFromSleepHours = (sleepHours) => {
    if (sleepHours < 3) return 49;
    if (sleepHours < 5) return 102;
    if (sleepHours < 7) return 156;
    if (sleepHours < 9) return 208;
    return 262;
  };

  const getSleepLabel = (sleepHours) => {
    if (sleepHours < 3) return "0–2 Hours";
    if (sleepHours < 5) return "3–4 Hours";
    if (sleepHours < 7) return "5–6 Hours";
    if (sleepHours < 9) return "7–8 Hours";
    return "9+ Hours";
  };

  return last11Days.value.map((dayObj) => {
    const matchingEntry = moodEntries.find((entry) => {
      const entryDate = new Date(entry.createdAt);
      return (
        entryDate.getDate() === dayObj.date &&
        entryDate.toLocaleString("default", { month: "short" }) === dayObj.month
      );
    });

    if (!matchingEntry) {
      return {
        icon: "/images/icon-neutral-white.svg",
        height: 0,
        color: "#E5E7EB",
        moodLabel: "No data",
        sleepLabel: "No data",
        reflection: "No reflection recorded.",
        feelings: [],
      };
    }

    return {
      icon: moodToImage[matchingEntry.mood],
      iconColored: moodToImageColored[matchingEntry.mood],
      height: getHeightFromSleepHours(matchingEntry.sleepHours),
      color: moodToColor[matchingEntry.mood],
      moodLabel: moodToLabel[matchingEntry.mood],
      sleepLabel: getSleepLabel(matchingEntry.sleepHours),
      journalEntry: matchingEntry.journalEntry || "No reflection recorded.",
      feelings: matchingEntry.feelings || [],
    };
  });
});

const scrollContainer = ref(null);

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = scrollContainer.value.scrollWidth;
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
</style>
