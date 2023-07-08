import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("Demo", defineAsyncComponent(() => import("/Users/ralph/Desktop/untitled folder/vue-video-conference/docs/.vuepress/components/Demo.vue"))),
      app.component("VideoConference", defineAsyncComponent(() => import("/Users/ralph/Desktop/untitled folder/src/components/VideoConferencing.vue")))
  },
}
