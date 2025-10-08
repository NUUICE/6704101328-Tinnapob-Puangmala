// quasar.config.js
import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },
      vueRouterMode: 'hash',
      publicPath: '/6704101328-Tinnapob-Puangmala/',   // 👈 ต้องใส่ชื่อ repo ของคุณตรงนี้
    },

    devServer: {
      open: true
    },

    framework: {
      plugins: []
    }
  }
})
