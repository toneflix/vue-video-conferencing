<template>
  <div>
    <slot name="button" :configDialog="(e) => (configDialog = true)">
      <button class="con-control-btn con-hover-bg" @click="configDialog = true">
        <vue-feather type="settings"></vue-feather>
      </button>
    </slot>
    <SceneModal v-model="configDialog" title="Device Configuration">
      <div class="con-row con-mt-md">
        <div
          class="con-col-12 con-text-left con-mt-md"
          :key="field"
          v-for="field in [
            { v: 'audioinput', l: 'Audio Input Device', i: 'microphone' },
            { v: 'audiooutput', l: 'Audio Ouput Device', i: 'headphone' },
            { v: 'videoinput', l: 'Video Source', i: 'camera' },
          ]"
        >
          <label class="text-grey-7" for="company_name"> {{ field.l }} </label>
          <div class="con-select">
            <label>
              <select
                v-model="device[field.v]"
                @update:model-value="
                  (value) => changeInputOutputDevice(device[field.v], field.v)
                "
              >
                <option
                  :key="dev.id"
                  :selected="dev.id === device[field.v]"
                  :value="dev.deviceId"
                  v-for="dev in devices[field.v]"
                >
                  {{ dev.label }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </SceneModal>
  </div>
</template>

<script setup>
import JMeetJS from "@joinera/lib-jitsi-meet";
import VueFeather from "vue-feather";
import SceneModal from "./SceneModal.vue";
import { ref } from "vue";
import bus from "../constants/EventBus";

const emit = defineEmits(["configuring"]);
const props = defineProps({
  room: {
    type: Object,
  },
});
const devices = ref({
  audioinput: [],
  audiooutput: [],
  videoinput: [],
});
const device = ref({
  audioinput: "",
  audiooutput: "",
  videoinput: "",
});
const configDialog = ref(false);

/**
 * @type {JMeetJS}
 */
const JitsiMeetJS = window.JitsiMeetJS || JMeetJS;

const configureCall = () => {
  if (!props.room) return;
  emit("configuring");
  // Pass the current devices to the device list
  JitsiMeetJS.mediaDevices.enumerateDevices((e) => {
    devices.value = {};
    // device.value[i.kind] = device.value[e[0].kind] || e[0].deviceId
    e.forEach((i) => {
      if (devices.value[i.kind]) {
        devices.value[i.kind].push(i);
      } else {
        devices.value[i.kind] = [i];
      }
    });
    Object.keys(devices.value).forEach((kind) => {
      device.value[kind] =
        device.value[kind] || devices.value[kind][0].deviceId;
    });
  });
  //   configDialog.value = true;
};

const changeInputOutputDevice = async (selected, type) => {
  if (!props.room) return;

  if (type === "audioinput" || type === "videoinput") {
    const track =
      type === "audioinput"
        ? props.room.getLocalAudioTrack()
        : props.room.getLocalVideoTrack();

    const tracks = await JitsiMeetJS.createLocalTracks({
      devices: [type.replace("input", "")],
      [type === "videoinput" ? "cameraDeviceId" : "micDeviceId"]: selected,
    });

    if (tracks[0] && track) {
      // let oldTrack = document.getElementById(track.getId());
      //   if (oldTrack) {
      //     track.detach(oldTrack);
      //     oldTrack.parentNode.removeChild(oldTrack);
      //   }
      props.room.replaceTrack(track, tracks[0]);
      //   props.room.removeTrack(track).then(() => {
      // props.room.addTrack(tracks[0]).then(() => {
      //   bus.emit("TRACK_ADDED", tracks[0]);
      //   if (type === "videoinput") {
      //   }
      // });
      //   });
    }
  } else if (type === "audiooutput") {
    JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected);
  }

  device.value[type] = selected;
  //   $h.notify({
  //     title:
  //       type === "audiooutput"
  //         ? "Audio Output"
  //         : type === "audioinput"
  //         ? "Audio Input"
  //         : "Video Input",
  //     message:
  //       type === "audiooutput"
  //         ? "Audio output device changed"
  //         : type === "audioinput"
  //         ? "Audio input device changed"
  //         : "Video input device changed",
  //     timeout: 3000,
  //   });
};
configureCall();
</script>
