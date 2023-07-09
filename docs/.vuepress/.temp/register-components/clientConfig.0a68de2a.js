import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("Demo", defineAsyncComponent(() => import("/Users/ralph/Documents/Marx/Toneflix/Vue Video Conference/vue-video-conference/docs/.vuepress/components/Demo.vue")))
  },
}
