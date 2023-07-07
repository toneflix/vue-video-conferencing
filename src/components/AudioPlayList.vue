<template>
  <div>
    <div
      ref="scenery"
      class="Screen"
      :key="speakerId"
      v-if="conference?.participants?.size < 2"
    >
      <div
        data-aspect="4:3"
        class="audio-only"
        :id="`track-${speakerTrack.getId()}-a`"
        v-if="speakerTrack.getId()"
      >
        <div class="control-box">
          <span>{{ trimName(speakerTrack.isLocal() ? "Me" : "Guest") }}</span>
          <vue-feather
            :type="`mic${muted[speakerTrack.getId()] ? '-off' : ''}`"
          ></vue-feather>
        </div>
        <audio
          autoplay
          :ref="(e) => (trackRefs[speakerTrack.getId() + '-a'] = e)"
          :id="speakerTrack.getId() + '-a'"
          v-if="!speakerTrack.isLocal()"
          class="audio-container"
        />
      </div>
    </div>
    <div
      class="Dish"
      v-if="computedTracks?.length && conference?.participants?.size"
    >
      <div
        data-aspect="4:3"
        class="audio-only"
        :id="`track-${track.getId()}`"
        :key="track.id"
        v-for="track in computedTracks.filter(
          (e) =>
            e.getId() !== speakerTrack.getId() &&
            conference?.participants?.size < 2
        )"
      >
        <div class="control-box">
          <span>{{ trimName(track.isLocal() ? "Me" : "Guest") }}</span>
          <vue-feather
            :type="`mic${muted[track.getId()] ? '-off' : ''}`"
          ></vue-feather>
        </div>
        <audio
          autoplay
          :ref="(e) => (trackRefs[track.getId()] = e)"
          :id="track.getId()"
          v-if="!track.isLocal()"
          class="audio-container"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import VueFeather from "vue-feather";
import bus from "../constants/EventBus";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
import { resize } from "../constants/jitsi.utils";

const emit = defineEmits(["active-focus", "active-blur"]);
const props = defineProps({
  tracks: {
    type: Array,
    required: true,
  },
  conference: {
    type: Object,
  },
  aspect: {
    type: Number,
    default: 0,
  },
});

const def = {
  getId: () => null,
  isLocal: () => true,
  getParticipantId: () => null,
};

const scenery = ref(null);
const { isOutside } = useMouseInElement(scenery);
watch(isOutside, () => {
  emit(
    isOutside.value ? "active-blur" : "active-focus",
    speakerTrack.value?.getId()
  );
});

const computedTracks = computed(() => props.tracks);
const speakerTrack = ref(
  computedTracks.value?.find(
    (e) =>
      e.getParticipantId() ===
      (props.conference?.lastDominantSpeaker ??
        computedTracks.value[0]?.getParticipantId())
  ) || def
);

const speakerId = computed(() => speakerTrack.value?.getParticipantId());

const trackRefs = ref({});
const muted = ref({});

const lstnrs = {
  USER_LEFT: (userId) => {
    if (computedTracks.value.length) {
      const track = computedTracks.value.find(
        (e) => e.getParticipantId() === userId
      );

      if (userId === track.getParticipantId()) {
        track.detach(trackRefs.value[track.getId()]);
        track.detach(trackRefs.value[track.getId() + "-a"]);
        // Remove the track from the DOM.
        const element = document.getElementById(track.getId());
        element && element.parentNode.remove();
        const element2 = document.getElementById(track.getId() + "-a");
        element2 && element2.parentNode.remove();
      }
    }
  },
  TRACK_MUTE_CHANGED: (track) => {
    muted.value[track.getId()] = track.isMuted();
  },
  DOMINANT_SPEAKER_CHANGED: (id) => {
    if (computedTracks.value.length) {
      speakerTrack.value =
        computedTracks.value.find((e) => e.getParticipantId() === id) || def;
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

// Watch and set the initial active speaker
const unwatch1 = watch(
  [() => props.conference, () => props.tracks?.length],
  ([conference, ctracks]) => {
    if (conference && ctracks && !speakerTrack.value?.getId()) {
      speakerTrack.value = conference.getLocalAudioTrack() || def;
      resize(props.aspect);
      unwatch1();
    }
  }
);

// Register Event Listeners
Object.keys(lstnrs).forEach((i) => {
  bus.on(i, lstnrs[i]);
});

// Remove Event Bus Listners
onBeforeUnmount(() => {
  Object.keys(lstnrs).forEach((i) => {
    bus.off(i, lstnrs[i]);
  });
});
</script>
