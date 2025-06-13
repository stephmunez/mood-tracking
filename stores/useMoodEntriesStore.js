import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const useMoodEntriesStore = defineStore("mood-entries", {
  state: () => {
    return {
      moodEntries: [],
      error: null,
    };
  },
  actions: {
    async fetchMoodEntries() {
      const { $db, $auth } = useNuxtApp();

      try {
        const moodEntriesQuery = query(
          collection($db, "moodEntries"),
          where("userId", "==", $auth.currentUser.uid),
        );

        const snapshot = await getDocs(moodEntriesQuery);
        this.moodEntries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        this.error = error.message;
        console.log(this.error);
      }
    },

    async addMoodEntry(moodEntry) {
      const { $db, $auth } = useNuxtApp();

      await addDoc(collection($db, "moodEntries"), {
        ...moodEntry,
        userId: $auth.currentUser.uid,
      });

      this.moodEntries.push({
        ...moodEntry,
        userId: $auth.currentUser.uid,
      });
    },
  },
  persist: true,
});
