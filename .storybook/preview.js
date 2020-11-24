import Vue from 'vue';

import * as components from '~/.nuxt-storybook/components';
import { forceReRender } from '~/.nuxt-storybook/storybook/entry';
import { prepareForInline } from '~/.nuxt-storybook/storybook/nuxt-entry';

import '~storybook';

Object.keys(components).forEach(name => Vue.component(name, components[name]));

const globalParameters = {};
globalParameters.docs = {
  ...globalParameters.docs,
  prepareForInline,
};

export const parameters = globalParameters;

let defaultLocale = 'en';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: defaultLocale,
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
    if (globals.locale !== defaultLocale) {
      defaultLocale = globals.locale;
      setTimeout(() => forceReRender(), 0);
    }
    return {
      template: '<story />',
      updated () {
        if (this.$i18n) {
          this.$i18n.locale = defaultLocale;
        }
      },
    };
  },
];
