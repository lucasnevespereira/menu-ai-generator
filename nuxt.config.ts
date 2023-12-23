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
    }
})
