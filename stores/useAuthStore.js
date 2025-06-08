import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
  }),

  actions: {
    async signup(email, password) {
      const { $auth } = useNuxtApp();

      this.signupError = null;

      try {
        const cred = await createUserWithEmailAndPassword(
          $auth,
          email,
          password,
        );
        this.user = cred.user;
      } catch (error) {
        this.signupError = error.message;
      }
    },

    async logout() {
      const { $auth } = useNuxtApp();

      await signOut($auth);
      this.user = null;
    },

    async login(email, password) {
      const { $auth } = useNuxtApp();

      this.loginError = null;

      try {
        const cred = await signInWithEmailAndPassword($auth, email, password);
        this.user = cred.user;
      } catch (error) {
        this.loginError = error.message;
      }
    },
  },
});
