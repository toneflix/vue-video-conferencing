# Slots

## controls

The controls slot allows you to modify or add custom controls to the video conferencing component.

```vue
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

### Properties

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
