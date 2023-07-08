<template>
  <form @submit="submit" v-if="!conference.start">
    <div>
      <label>Room Name:</label>
      <br />
      <input v-model="conference.roomName" type="text" />
    </div>
    <div>
      <label>User Name:</label>
      <br />
      <input v-model="conference.userName" type="text" />
    </div>
    <div>
      <button type="submit">Start Conference</button>
    </div>
  </form>
  <VideoConference
    autoConnect
    :debugLevel="conference.debugLevel"
    :roomName="conference.roomName"
    :userName="conference.userName"
    v-if="conference.start"
    @stopped="conference.start = false"
  />
</template>

<script setup>
import { ref } from "vue";
import VideoConference from "./components/VideoConferencing.vue";
// import { VideoConference } from "vue-video-conference";
const conference = ref({
  debugLevel: "ERROR",
  roomName: "test-dare-devil-room",
  userName: "test-dare-devil-1",
});

const submit = (e) => {
  e.preventDefault();
  if (conference.value.roomName && conference.value.userName) {
    conference.value.start = true;
  } else {
    alert("Please enter room name and user name to start conference demo.");
  }
};
</script>

<style lang="scss">
@import "vue-video-conference/dist/core.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
form div {
  margin: 10px;
}
</style>
