<template>
  <section
    class="flex w-full flex-col gap-6 rounded-2xl border border-solid border-neutral-100 bg-neutral-0 px-4 py-5"
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
        class="relative flex min-h-[150px] w-full flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-blue-100 bg-no-repeat px-4 py-5"
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
