import React from 'react';
import Vue from 'vue';
import { COMPONENT, getNuxtApp, VALUES } from '~/.nuxt-storybook/storybook/nuxt-entry';

// based on: https://github.com/storybookjs/storybook/blob/master/addons/docs/src/frameworks/vue/prepareForInline.ts
export function prepareForInline (storyFn, { args, globals }) {
    const el = React.useRef(null)
    // FIXME: This recreates the Vue instance every time, which should be optimized
    React.useEffect(() => {
        let root
        const __NUXT_APP = getNuxtApp()
        __NUXT_APP.then((app) => {
            const component = storyFn()
            root = new Vue({
                ...app,
                el: el.current,
                data () {
                    return {
                        [COMPONENT]: component,
                        [VALUES]: args
                    }
                },
                render (h) {
                    const children = this[COMPONENT] ? [h(this[COMPONENT])] : undefined;
                    return h('div', { attrs: { id: 'root' } }, children)
                },
                created () {
                    this.$i18n.locale = globals.locale;
                }
            })
        })
        return () => root && root.$destroy()
    }, [  ])

    return React.createElement('div', null, React.createElement('div', { ref: el }))
}
