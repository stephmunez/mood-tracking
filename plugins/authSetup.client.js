import { useAuthStore } from "../stores/useAuthStore";

const PROTECTED_ROUTES = ["/", "/onboarding"];
const GUEST_ONLY_ROUTES = ["/log-in", "/sign-up"];

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  authStore.setupAuthListener();

  const redirectUser = () => {
    const { path } = router.currentRoute.value;
    const isGuestRoute = GUEST_ONLY_ROUTES.includes(path);
    const isProtectedRoute = PROTECTED_ROUTES.includes(path);
    const hasOnboarded = authStore.user?.displayName;

    if (authStore.user) {
      if (!hasOnboarded && path !== "/onboarding") {
        router.push("/onboarding");
      } else if (isGuestRoute) {
        router.push("/");
      }
    } else {
      if (isProtectedRoute) {
        router.push("/log-in");
      }
    }
  };

  watch(
    () => authStore.user,
    () => redirectUser(),
  );
});
