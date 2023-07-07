<template>
  <div
    ref="scenery"
    class="Screen ref"
    :id="`track-${trackId}`"
    v-if="largeVideo"
  >
    <canvas ref="canvasRef" class="largeVideoBackground"></canvas>
    <div data-aspect="4:3" :class="{ 'audio-only': !!status.videoMuted }">
      <div class="control-box">
        <span>{{ trimName(track.isLocal() ? "Me" : "Guest") }}</span>
        <vue-feather
          :type="`mic${status.audioMuted ? '-off' : ''}`"
        ></vue-feather>
      </div>
      <video
        autoplay
        ref="trackRef"
        :id="trackId"
        v-if="!status.videoMuted"
      ></video>
    </div>
  </div>
  <div
    data-aspect="4:3"
    style="margin: 10px; min-width: calc(100% - 10px); height: 147.75px"
    :class="{ 'audio-only': !!status.videoMuted }"
    :id="`track-${trackId}`"
    v-else-if="!isAudio"
  >
    <div class="control-box">
      <span>{{ trimName(track.isLocal() ? "Me" : "Guest") }}</span>
      <vue-feather
        :type="`mic${status.audioMuted ? '-off' : ''}`"
      ></vue-feather>
    </div>
    <video
      autoplay
      ref="trackRef"
      :id="trackId"
      v-if="!status.videoMuted"
    ></video>
  </div>
  <div
    v-else-if="!track.isLocal()"
    class="audio-container"
    :id="`track-${trackId}`"
  >
    <audio autoplay ref="trackRef" :id="trackId" />
  </div>
</template>

<script setup>
import bus from "../constants/EventBus";
import { resize } from "../constants/jitsi.utils";
import { useMouseInElement } from "@vueuse/core";
import {
  onMounted,
  nextTick,
  ref,
  computed,
  onBeforeUnmount,
  watch,
} from "vue";

const emit = defineEmits(["active-focus", "active-blur"]);
const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
  isAudio: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  aspect: {
    type: Number,
    default: 0,
  },
});

const participantAudioTrack = ref(null);
const participant = ref(null);
const largeVideo = computed(() => !props.isAudio && props.isActive);
const canvasRef = ref(null);
const trackRef = ref(null);
// const tracked = computed(() => props.track);
const trackId = computed(() => props.track?.getId());

const status = ref({
  audioMuted: false,
  videoMuted: false,
});

const scenery = ref(null);
const { isOutside } = useMouseInElement(scenery);
watch(isOutside, () => {
  emit(isOutside.value ? "active-blur" : "active-focus", trackId.value);
});

const lstnrs = {
  USER_LEFT: (userId, track) => {
    if (track && userId === track.getParticipantId()) {
      track.detach(trackRef.value);
      // Remove the track from the DOM.
      const element = document.getElementById("track-" + trackId.value);
      element && element.parentNode.removeChild(element);
    }
  },
  TRACK_MUTE_CHANGED: (track) => {
    if (track) {
      const muteAudio =
        participantAudioTrack.value?.getParticipantId() ===
          track.getParticipantId() && track.type === "audio";

      if (track.getId() === trackId.value) {
        status.value.videoMuted = track.isMuted();
      } else if (muteAudio) {
        status.value.audioMuted = track.isMuted();
      }
    }
  },
};

/**
 *
 * @param { String } str
 */
const trimName = (str) => {
  return str.substring(0, 2);
};

const init = (track) => {
  const room = track.conference;

  // Resize the track
  resize(props.aspect);

  if (room) {
    // Set the participant
    participant.value = room.getParticipantById(track.getParticipantId());

    // Get the participant's audio track.
    let audioTrack;
    if (track.type === "audio") {
      audioTrack = track;
    } else {
      audioTrack = track.isLocal()
        ? room.getLocalAudioTrack()
        : participant.value.getTracksByMediaType("audio")[0] ?? {};
    }
    participantAudioTrack.value = audioTrack;
  }

  if (track && (!props.isAudio || !track.isLocal())) {
    track.attach(trackRef.value);

    if (!props.isAudio && canvasRef.value) {
      const ctx = canvasRef.value.getContext("2d");

      trackRef.value.addEventListener(
        "play",
        (e) => {
          const $this = e.target; //cache
          (function loop() {
            if (!$this.paused && !$this.ended) {
              ctx.drawImage($this, 0, 0);
              setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
          })();
        },
        0
      );
    }
  }
};

onMounted(() => {
  nextTick().then(() => init(props.track));
});

onBeforeUnmount(() => {
  // Clean up the track.
  if (trackRef.value) {
    trackRef.value.pause();
    trackRef.value.srcObject = null;
    trackRef.value.load();
  }

  // Detach the track from the DOM.
  if (typeof props.track.detach === "function") {
    props.track.detach(trackRef.value);
  }

  // Remove Event Bus Listners
  Object.keys(lstnrs).forEach((i) => {
    bus.off(i, lstnrs[i]);
  });
});

// Register Event Listeners
Object.keys(lstnrs).forEach((i) => {
  bus.on(i, lstnrs[i]);
});
</script>
