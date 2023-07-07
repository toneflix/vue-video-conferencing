# Toneflix Vue Video Conferencing

[![npm](https://img.shields.io/npm/v/vue-video-conference.svg)](https://www.npmjs.com/package/vue-video-conference)
[![npm](https://img.shields.io/npm/dt/vue-video-conference.svg)](https://www.npmjs.com/package/vue-video-conference)
[![npm](https://img.shields.io/npm/l/vue-video-conference.svg)](https://www.npmjs.com/package/vue-video-conference)

This is a simple video conferencing library built for Vue.js (Vue 3) with Jitsi Meet API (Low Level).
The library allows you to create a voice/video conferencing room that allows a one to many connection.

## Vue support

Supports only Vue >= 3

## Installation and usage

```bash
$ npm i vue-video-conference
```

`Main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";

import conferencing from "vue-video-conference";

createApp(App).use(conferencing).mount("#app");
```

`Component.vue`

```html
<template>
  <VideoConference />
</template>
```

### Direct usage

It is also possible to use the library directly in your component without installing it in your main.js file.

```html
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

## Props

| Prop name          | Type   | Default     | Description                                                                                                                                              |
| ------------------ | ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| roomName\*         | String | null        | The name of the room to join (Should be at least 4 characters long and contains no capital letters or Spaces).                                           |
| appDomain          | String | meet.jit.si | The domain of the jitsi meet server.                                                                                                                     |
| roomPassword       | String | null        | The password of the room.                                                                                                                                |
| userName           | String | null        | The username of the user (Should be at least 3 characters long and contains no capital letters or Spaces), If not provided a random string will be used. |
| displayName        | String | null        | The display name of the user.                                                                                                                            |
| videoConstraints   | Number | 360         | The video constraints of the user (180, 360, 720).                                                                                                       |
| appToken           | String | null        | the JWT token used to authenticate with the server                                                                                                       |
| allowVideo         | Bool   | true        | Set to false if you want audio only.                                                                                                                     |
| allowAudio         | Bool   | true        | Set to false if you want video only.                                                                                                                     |
| debugLevel         | String | ERROR       | The debug level of the jitsi meet api (DEBUG, ERROR, INFO, LOG, TRACE, WARN).                                                                            |
| aspect             | Number | 0           | The aspect ratio of the video [**0** = 4:3, **1** = 16:9, **2** = 1:1, **3** = 1:2]                                                                      |
| alwaysShowControls | Bool   | false       | Set to true if you want to always show the controls, otherwise they will only show when you hover over the video.                                        |

## Slots

### #controls

The controls slot allows you to modify or add custom controls to the video conferencing component.

```html
<template>
  <VideoConference>
    <template
      #controls="{ 
        // toggleFullscreen, 
        // activeVideoTrack, 
        // videoTracks, 
        // conference, 
        // muteMe, 
        // tracks, 
        // status,     
        // start, 
        // stop 
    }"
    >
      <button>Custom Button</button>
    </template>
  </VideoConference>
</template>
```

#### **[Function]** toggleFullscreen

The toggleFullscreen function allows you to toggle the fullscreen mode of the video conferencing component.

#### **[Object]** activeVideoTrack

The activeVideoTrack variable contains the current active video track object.

#### **[Array]** videoTracks

The videoTracks variable contains an array of all the video tracks.

#### **[Object]** conference

The conference variable contains the current conference object.

#### **[Function]** muteMe

The muteMe function allows you to toggle the mute state of the current user.
The function takes a string as an argument which can be either "audio" or "video", if no argument is provided it will toggle the mute state of the audio.

#### **[Array]** tracks

The tracks variable contains an array of all the tracks.

#### **[Object]** status

The status variable contains the current status of the video conferencing component.

```js
{
  loading: false, // true if the video conferencing component is making a request to the server
  show: false, // true if a video conference is active and the video conferencing component is visible
  audioMuted: false, // true if the audio of the current user is muted
  videoMuted: false, // true if the video of the current user is muted
}
```

#### **[Function]** start

The start function allows you to start the video conferencing component.

#### **[Function]** stop

The stop function allows you to stop the video conferencing component.

## Events

### ready

The ready event is emitted when the video conferencing component is mounted and ready to be used.

```html
<template>
  <VideoConference @ready="onReady" />
</template>

<script>
  export default {
    methods: {
      onReady() {
        console.log("Ready");
      },
    },
  };
</script>
```

### connected

The connected event is emitted when the video conferencing component is connected to the server.

```html
<template>
  <VideoConference @connected="onConnected" />
</template>

<script>
  export default {
    methods: {
      onConnected() {
        console.log("Connected");
      },
    },
  };
</script>
```

### started

The started event is emitted when the video conference is started.

```html
<template>
  <VideoConference @started="onStarted" />
</template>

<script>
  export default {
    methods: {
      onStarted() {
        console.log("Started");
      },
    },
  };
</script>
```

### stopped

The stopped event is emitted when the video conference has ended or stopped.

```html
<template>
  <VideoConference @stopped="onStopped" />
</template>

<script>
  export default {
    methods: {
      onStopped() {
        console.log("Stopped");
      },
    },
  };
</script>
```

````html
### joined The joined event is emitted when the user joins the video
conferencing room. ```html
<template>
  <VideoConference @joined="onJoined" />
</template>

<script>
  export default {
    methods: {
      onJoined(conferenceObject) {
        console.log("Joined");
      },
    },
  };
</script>
````

### left

The left event is emitted when a user leaves the video conferencing room.

```html
<template>
  <VideoConference @left="onLeft" />
</template>

<script>
  export default {
    methods: {
      onLeft(userObject) {
        console.log("Left");
      },
    },
  };
</script>
```

### trackAdded

The trackAdded event is emitted when a track is added.

```html
<template>
  <VideoConference @trackAdded="onTrackAdded" />
</template>

<script>
  export default {
    methods: {
      onTrackAdded(trackObject) {
        console.log("Track Added");
      },
    },
  };
</script>
```

### error

The error event is emitted when an error occurs.

```html
<template>
  <VideoConference @error="onError" />
</template>

<script>
  export default {
    methods: {
      onError(errorMessage) {
        console.log("Error");
      },
    },
  };
</script>
```
