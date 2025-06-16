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
    settingsError: null,
    authReady: false,
  }),

  actions: {
    setupAuthListener() {
      const { $auth } = useNuxtApp();

      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          this.user = user
            ? {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
              }
            : null;

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
        this.user = {
          uid: cred.user.uid,
          displayName: cred.user.displayName,
          email: cred.user.email,
          photoURL: cred.user.photoURL,
        };

        const router = useRouter();
      } catch (error) {
        this.signupError = error.message;
      }
    },

    async updateUserProfile(name, profilePictureFile) {
      const { $auth, $storage } = useNuxtApp();
      this.settingsError = null;

      const user = $auth.currentUser;
      let photoURL = user.photoURL;

      if (name === "") {
        this.settingsError = "Please enter your name.";
        return;
      }

      if (profilePictureFile) {
        const validTypes = ["image/jpeg", "image/png"];
        const maxSize = 250 * 1024;

        if (!validTypes.includes(profilePictureFile.type)) {
          this.settingsError = "Only JPEG or PNG images are allowed.";
          return;
        }

        if (profilePictureFile.size > maxSize) {
          this.settingsError = "Profile picture must be under 250KB.";
          return;
        }

        try {
          const storageRef = ref($storage, `profilePictures/${user.uid}`);
          await uploadBytes(storageRef, profilePictureFile, {
            customMetadata: {
              userId: user.uid,
            },
          });
          photoURL = await getDownloadURL(storageRef);
        } catch (error) {
          this.settingsError = "Failed to upload profile picture.";
          return;
        }
      }

      try {
        await updateProfile(user, {
          displayName: name,
          photoURL,
        });

        this.user = {
          ...this.user,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
      } catch (error) {
        this.settingsError = error.message;
      }
    },

    async login(email, password) {
      const { $auth } = useNuxtApp();

      this.loginError = null;

      try {
        const cred = await signInWithEmailAndPassword($auth, email, password);
        this.user = {
          uid: cred.user.uid,
          displayName: cred.user.displayName,
          email: cred.user.email,
          photoURL: cred.user.photoURL,
        };
      } catch (error) {
        this.loginError = error.message;
      }
    },

    async logout() {
      const { $auth } = useNuxtApp();

      await signOut($auth);
      this.user = null;
    },
  },
});
