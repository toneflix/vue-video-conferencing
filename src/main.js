import App from './App.vue'
import conference from "vue-video-conference";
import { createApp } from 'vue'

createApp(App)
    .use(conference)
    .mount('#app')
