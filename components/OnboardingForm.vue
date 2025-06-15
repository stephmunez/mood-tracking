<template>
  <form @submit.prevent="handleSubmit" class="flex w-full flex-col gap-8">
    <div class="flex w-full flex-col gap-6">
      <div class="flex w-full flex-col gap-2">
        <label
          for="name"
          class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="name"
          class="rounded-[10px] border border-solid border-neutral-300 px-4 py-3 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600 placeholder:text-neutral-300"
          placeholder="Your Name"
        />
      </div>

      <div class="flex w-full items-start gap-5">
        <img
          v-if="profilePicturePreview"
          :src="profilePicturePreview"
          alt="Profile preview"
          class="rounded-full object-cover"
          width="64"
          height="64"
        />
        <NuxtImg
          v-else
          src="/images/avatar-placeholder.svg"
          width="64"
          height="64"
        />

        <div class="flex w-full flex-col gap-4">
          <div class="flex w-full flex-col gap-[0.375rem]">
            <span
              class="text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
              >Upload Image</span
            >
            <span
              class="text-[0.938rem] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-600"
              >Max 250KB, PNG or JPEG</span
            >
          </div>

          <input
            type="file"
            name="profilePic"
            id="profilePic"
            accept="image/png, image/jpeg"
            @change="handleFileChange"
            class="hidden"
          />

          <label
            for="profilePic"
            class="w-max cursor-pointer rounded-lg border border-solid border-neutral-300 px-4 py-2 text-lg font-normal leading-[1.4] tracking-[-0.3px] text-neutral-900"
          >
            Upload
          </label>
        </div>
      </div>
    </div>

    <button
      type="submit"
      class="h-14 w-full rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0"
    >
      Start Tracking
    </button>

    <p v-if="authStore.settingsError" class="text-sm text-red-500">
      {{ authStore.settingsError }}
    </p>
  </form>
</template>

<script setup>
import { useAuthStore } from "../stores/useAuthStore";

const authStore = useAuthStore();
const router = useRouter();

const name = ref("");
const profilePicture = ref(null);
const profilePicturePreview = ref(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size < 250 * 1024) {
    profilePicture.value = file;
    profilePicturePreview.value = URL.createObjectURL(file);
  } else {
    profilePicture.value = null;
    profilePicturePreview.value = null;
    e.target.value = null;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name.value) {
    authStore.settingsError = "Please enter your name.";
    return;
  }

  await authStore.updateUserProfile(name.value, profilePicture.value);

  if (!authStore.settingsError) {
    router.push("/");
  }
};
</script>
