<template>
  <VideoConference roomName="dare-devil" />
</template>

<script setup>
import { VideoConference } from "vue-video-conference";
</script>

<style lang="scss">
@import "./assets/index.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
