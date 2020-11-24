export default {
  target: 'static',
  head: {
    title: 'nuxt-storybook-i18n-bug',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [],
  modules: [
    'nuxt-i18n',
  ],
  build: {},
  storybook: {},
  i18n: {
    locales: [ 'en', 'fr', 'es' ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
        },
        fr: {
          welcome: 'Bienvenue',
        },
        es: {
          welcome: 'Bienvenido',
        },
      },
    },
  },
};
