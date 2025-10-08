// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers'

export default defineConfig((/* ctx */) => {
  return {
    boot: [],
    css: ['app.scss'],
    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },
      vueRouterMode: 'hash',
      vitePlugins: [
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
            useFlatConfig: true
          }
        }, { server: false }]
      ]
    },

    devServer: {
      open: true
    },

    framework: {
      config: {},
      plugins: []
    },

    animations: [],

    // ✅ เพิ่มส่วนนี้เพื่อแสดงชื่อโปรเจกต์บนแท็บเบราว์เซอร์
    htmlVariables: {
      title: '6704101328-Tinnapob-Puangmala'
    },

    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false
    },

    pwa: {
      workboxMode: 'GenerateSW'
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      builder: {
        // ✅ ตั้ง App ID ให้ตรงกับชื่อโปรเจกต์
        appId: '6704101328-tinnapob-puangmala'
      }
    },

    bex: {
      extraScripts: []
    }
  }
})
