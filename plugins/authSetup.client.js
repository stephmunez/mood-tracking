import { useAuthStore } from "../stores/useAuthStore";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  authStore.setupAuthListener();
});
