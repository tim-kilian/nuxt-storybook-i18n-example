import Vue from 'vue';

import * as components from '../.nuxt-storybook/components';
import { prepareForInline } from '../.nuxt-storybook/storybook/nuxt-entry';

import '~storybook';

import nuxtConfig from '../nuxt.config';

Object.keys(components).forEach(name => Vue.component(name, components[name]));

const globalParameters = {};
globalParameters.docs = {
  ...globalParameters.docs,
  prepareForInline,
};

export const parameters = globalParameters;

let currentLocale = nuxtConfig.i18n.defaultLocale;

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: currentLocale,
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
      ],
    },
  },
};

export const decorators = [
  (_, { globals }) => {
    if (globals.locale !== currentLocale) {
      currentLocale = globals.locale;
    }
    return {
      template: '<story />',
      created () {
        if (this.$i18n) {
          this.$i18n.setLocale(currentLocale);
        }
      },
      updated () {
        if (this.$i18n) {
          this.$i18n.setLocale(currentLocale);
        }
      },
    };
  },
];
