<template>
  <form action="#" class="flex w-full flex-col gap-8">
    <div class="flex w-full flex-col gap-5">
      <div class="flex w-full flex-col gap-2">
        <label
          for="email"
          class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >Email address</label
        >
        <input
          type="email"
          id="email"
          class="rounded-[10px] border border-solid border-neutral-300 px-4 py-3 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600 placeholder:text-neutral-300"
          placeholder="name@email.com"
        />
      </div>
      <div class="flex w-full flex-col gap-2">
        <label
          for="password"
          class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >Password</label
        >
        <input
          type="password"
          id="password"
          class="rounded-[10px] border border-solid border-neutral-300 px-4 py-3 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600 placeholder:text-neutral-300"
        />
      </div>
    </div>
    <div class="flex w-full flex-col items-center gap-5">
      <button
        type="submit"
        class="h-14 w-full rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0"
      >
        Log In
      </button>
      <p class="text-lg leading-[1.4] tracking-[-0.3px] text-neutral-600">
        Haven't got an account?
        <NuxtLink to="/sign-up" class="text-blue-600">Sign up.</NuxtLink>
      </p>
    </div>
  </form>
</template>
