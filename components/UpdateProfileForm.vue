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
        <div
          v-if="profilePicturePreview"
          class="flex h-16 min-w-16 items-center justify-center overflow-hidden rounded-full"
        >
          <NuxtImg
            :src="profilePicturePreview"
            width="64"
            height="64"
            :placeholder="[50, 25, 75, 5]"
          />
        </div>
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
      class="h-14 w-full rounded-[10px] bg-blue-600 text-xl leading-[1.4] tracking-normal text-neutral-0 disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="isSaving"
    >
      {{
        isSaving
          ? "Saving.."
          : route.path === "/onboarding"
            ? "Start Tracking"
            : "Save Changes"
      }}
    </button>

    <p
      v-if="authStore.settingsError"
      class="flex items-center gap-1 text-xs font-normal leading-[1.1] tracking-normal text-red-700"
    >
      <NuxtImg src="/images/icon-info-circle.svg" width="12" height="12" />
      <span>{{ authStore.settingsError }}</span>
    </p>
  </form>
</template>

<script setup>
import { useAuthStore } from "../stores/useAuthStore";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["close"]);

const name = ref("");
const profilePicture = ref(null);
const profilePicturePreview = ref(null);
const isSaving = ref(false);

onMounted(() => {
  if (authStore.user) {
    name.value = authStore.user.displayName || "";
    profilePicturePreview.value = authStore.user.photoURL || null;
    authStore.settingsError = "";
  }
});

const handleFileChange = (e) => {
  const file = e.target.files[0];

  profilePicture.value = file;
  profilePicturePreview.value = URL.createObjectURL(file);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  isSaving.value = true;

  await authStore.updateUserProfile(name.value, profilePicture.value);

  if (!authStore.settingsError) {
    router.push("/");
    emit("close");
  }

  isSaving.value = false;
};
</script>
