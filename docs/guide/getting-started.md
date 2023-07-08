# Get started

## Installation

```bash
$ npm i vue-video-conference
```

Install the component globally in your vue app's entry point (main.js)

`Main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";

import conferencing from "vue-video-conference";

createApp(App).use(conferencing).mount("#app");
```

`Component.vue`

```vue
<template>
  <VideoConference />
</template>
```

### Direct usage

It is also possible to use the library directly in your component without installing it in your main.js file.

```vue
<template>
  <VideoConference />
</template>

<script>
import { VideoConference } from "vue-video-conference";

export default {
  components: {
    VideoConference,
  },
};
</script>
```

### Importing the css

```vue
<style>
@import "vue-video-conference/dist/core.css";
</style>
```
