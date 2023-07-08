# Events

## ready

The ready event is emitted when the video conferencing component is mounted and ready to be used.

```vue
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

## connected

The connected event is emitted when the video conferencing component is connected to the server.

```vue
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

## started

The started event is emitted when the video conference is started.

```vue
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

## stopped

The stopped event is emitted when the video conference has ended or stopped.

```vue
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

## joined

The joined event is emitted when the user joins the video conferencing room.

```vue
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
```

## left

The left event is emitted when a user leaves the video conferencing room.

```vue
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

## trackAdded

The trackAdded event is emitted when a track is added.

```vue
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

## error

The error event is emitted when an error occurs.

```vue
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
