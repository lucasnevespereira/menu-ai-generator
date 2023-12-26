// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        "nuxt-phosphor-icons",
        '@nuxtjs/kinde',
        '@pinia/nuxt'
    ],
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
    },
    runtimeConfig: {
        // Keys within public, will be also exposed to the client-side
        public: {
            openAiCompletionUrl: "https://api.openai.com/v1/chat/completions",
            openAiKey: process.env.NUXT_OPENAI_API_KEY,
        }
    }
})
