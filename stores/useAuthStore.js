import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
    authReady: false,
  }),

  actions: {
    setupAuthListener() {
      const { $auth } = useNuxtApp();

      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          this.user = user || null;
          console.log("user state change:", this.user);
          this.authReady = true;
        });
      } else {
        console.error("Firebase Auth is not initialized");
      }
    },

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

        const router = useRouter();
        router.push("/onboarding");
      } catch (error) {
        this.signupError = error.message;
      }
    },

    async updateUserProfile(name, profilePictureFile) {
      const { $auth, $storage } = useNuxtApp();
      this.signupError = null;

      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 250 * 1024;

      if (!validTypes.includes(profilePictureFile.type)) {
        this.signupError = "Only JPEG or PNG images are allowed.";
        return;
      }

      if (profilePictureFile.size > maxSize) {
        this.signupError = "Profile picture must be under 250KB.";
        return;
      }

      try {
        const user = $auth.currentUser;
        const storageRef = ref($storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePictureFile, {
          customMetadata: {
            userId: user.uid,
          },
        });
        const photoURL = await getDownloadURL(storageRef);

        await updateProfile(user, {
          displayName: name,
          photoURL,
        });

        this.user = user;

        // Redirect to dashboard or homepage
        const router = useRouter();
        router.push("/");
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
