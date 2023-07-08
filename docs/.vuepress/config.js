import { getDirname, path } from '@vuepress/utils'

import { defaultTheme } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

const __dirname = getDirname(import.meta.url)
export default {
  base: '/vue-video-conferencing/',
  lang: 'en-US',
  title: 'Toneflix Vue Video Conferencing',
  description: 'Toneflix Vue Video Conferencing Documentation',
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
      // components: {
      //     VideoConference: path.resolve(__dirname, '../../src/components/VideoConferencing.vue'),
      // },
    }),
  ],
  theme: defaultTheme({
    repoLabel: 'Contribute!',
    repo: 'https://github.com/toneflix/vue-video-conferencing',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'main',
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last Updated',
    search: true,
    serviceWorker: {
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh'
      }
    },
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Guide',
        link: '/guide',
      },
      // {
      //     text: 'Demo',
      //     link: '/demo',
      // },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['/guide', 'getting-started', 'props', 'slots', 'events']
        }
      ],
    },
  }),
}
