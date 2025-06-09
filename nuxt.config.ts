// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
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
});
