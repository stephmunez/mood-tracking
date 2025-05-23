<template>
  <section
    class="flex w-full max-w-[768px] flex-col gap-5 rounded-2xl border border-solid border-blue-100 bg-neutral-0 py-5 pl-4"
  >
    <h2
      class="text-[1.75rem] font-bold leading-[1.3] tracking-[-0.3px] text-neutral-900"
    >
      Mood and sleep trends
    </h2>
    <div class="l min-h-[316px] w-full">
      <div class="flex min-h-[312px] gap-4">
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
          class="relative flex min-h-[316px] w-full flex-col gap-[55px] overflow-x-auto pr-4"
        >
          <div class="flex min-w-[634px] flex-col gap-10">
            <div
              v-for="n in 5"
              :key="n"
              class="flex h-[13.2px] w-full items-center"
            >
              <div class="h-px w-full bg-blue-100/30"></div>
            </div>
          </div>
          <div class="flex min-w-[634px] gap-4">
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
          <div class="absolute bottom-12 left-0 flex min-w-[634px] gap-4">
            <div
              v-for="n in 11"
              :key="n"
              class="h-[156px] w-10 rounded-full bg-blue-500"
            ></div>
            <!-- 49,  102, 156, 208, 262-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

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
</script>
