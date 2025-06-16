import { useAuthStore } from "../stores/useAuthStore";

export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuthStore();

  if (!user) {
    return navigateTo("/log-in");
  }

  if (user.displayName) {
    return navigateTo("/");
  }
});
