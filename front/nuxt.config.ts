// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  modules: ['@nuxt/ui', '@vee-validate/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3333/api'
    }
  }
})
