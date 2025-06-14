import { useAuthStore } from "../stores/useAuthStore";

const PROTECTED_ROUTES = ["/", "/onboarding"];
const GUEST_ONLY_ROUTES = ["/log-in", "/sign-up"];

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  authStore.setupAuthListener();

  const redirectUser = () => {
    const { path } = router.currentRoute.value;

    if (authStore.user) {
      if (GUEST_ONLY_ROUTES.includes(path)) {
        router.push("/");
      }
    }

    if (!authStore.user) {
      if (PROTECTED_ROUTES.includes(path)) {
        router.push("/log-in");
      }
    }
  };

  watch(
    () => authStore.user,
    () => redirectUser(),
  );
});
