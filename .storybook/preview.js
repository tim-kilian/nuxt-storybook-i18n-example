import Vue from 'vue';

import * as components from '../.nuxt-storybook/components';
import { prepareForInline } from './prepareForInline';

import '~storybook';

Object.keys(components).forEach(name => Vue.component(name, components[name]));

let currentLocale = 'en';

const globalParameters = {};
globalParameters.docs = {
  ...globalParameters.docs,
  prepareForInline,
};

export const parameters = globalParameters;

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
      updated () {
        if (this.$i18n) {
          this.$i18n.locale = currentLocale;
        }
      },
    };
  },
];
