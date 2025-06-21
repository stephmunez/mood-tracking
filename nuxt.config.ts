// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  image: {
    provider: "ipx",
    domains: ["firebasestorage.googleapis.com"],
  },
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  plugins: ["@/plugins/firebase.client.js", "@/plugins/authSetup.client.js"],
  app: {
    head: {
      meta: [
        {
          name: "description",
          content:
            "Track your daily mood, feelings, reflections, and sleep with ease. A simple and intuitive mood tracking app to help you understand your emotional well-being over time.",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
  },
});
