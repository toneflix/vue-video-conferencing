<template>
  <UseFullscreen v-slot="{ toggle: toggleFullscreen, isFullscreen }">
    <div class="Scenary" :key="baseKey" ref="scenery">
      <div
        class="waiting banner z-5"
        v-if="
          !conference?.participants?.size && (status.show || status.loading)
        "
      >
        <WaitingLoader
          show
          height="30px"
          :color="status.show ? 'blue' : 'brown'"
          :text="status.show ? 'Waiting for others to join' : 'Connecting'"
        >
          <template #button v-if="status.show">
            <button
              class="con-control-btn con-hover-bg con-text-red"
              @click="stop"
            >
              <vue-feather type="phone-off"></vue-feather>
            </button>
          </template>
        </WaitingLoader>
      </div>
      <AudioPlayList
        class="Conference"
        :tracks="audioTracks"
        :conference="conference"
        v-if="!allowVideo"
        @active-blur="showControls = false"
        @active-focus="showControls = true"
      />
      <div v-else class="Conference">
        <!-- Screen Here -->
        <MediaTrack
          is-active
          :key="activeVideoTrack.getId()"
          :track="activeVideoTrack"
          @active-blur="showControls = false"
          @active-focus="showControls = true"
          v-if="activeVideoTrack && conference?.participants?.size < 2"
        />
        <div class="Dish" v-if="conference?.participants?.size" ref="dishesRef">
          <!-- Dishes Here -->
          <MediaTrack
            style="width: 100%"
            :key="track.getId()"
            :track="track"
            v-for="track in videoTracks.filter(
              (t) =>
                t?.getId() !== activeVideoTrack?.getId() &&
                conference?.participants?.size < 2
            )"
          />
        </div>
      </div>
      <slot
        name="controls"
        :toggleFullscreen="toggleFullscreen"
        :activeVideoTrack="activeVideoTrack"
        :videoTracks="videoTracks"
        :conference="conference"
        :muteMe="muteMe"
        :tracks="{ video: localVideoTrack, audio: localAudioTrack }"
        :status="status"
        :start="start"
        :stop="stop"
      >
        <div
          class="con-gap-3 con-justify-center con-control-buttons z-3"
          :class="{
            'requires-focus': !alwaysShowControls,
            'focus-aquired': showControls || !conference?.participants?.size,
          }"
        >
          <button
            class="con-control-btn con-hover-bg"
            @click="muteMe()"
            v-if="status.show && allowAudio"
          >
            <vue-feather
              :type="`mic${status.audioMuted ? '-off' : ''}`"
            ></vue-feather>
          </button>
          <button
            class="con-control-btn con-hover-bg"
            @click="muteMe('video')"
            v-if="status.show && allowVideo"
          >
            <vue-feather
              :type="`video${status.videoMuted ? '-off' : ''}`"
            ></vue-feather>
          </button>
          <button
            class="con-control-btn con-hover-bg con-text-green"
            @click="start"
            v-if="!status.show && (!autoConnect || status.loading)"
          >
            <vue-feather
              :type="`phone${status.loading ? '-call' : ''}`"
            ></vue-feather>
          </button>
          <button
            class="con-control-btn con-hover-bg con-text-red"
            @click="stop"
            v-if="status.show"
          >
            <vue-feather type="phone-off"></vue-feather>
          </button>
          <WaitingLoader
            :show="status.loading"
            :color="status.show ? 'red' : 'green'"
          />
          <button
            class="con-control-btn con-hover-bg"
            @click="toggleFullscreen"
            v-if="status.show"
          >
            <vue-feather
              :type="isFullscreen ? 'minimize' : 'maximize'"
            ></vue-feather>
          </button>
          <DeviceSelector
            :room="conference"
            :aspect="aspect"
            v-if="conference && !isFullscreen"
          >
            <template #button="{ configDialog }">
              <slot name="configbutton" :configDialog="configDialog">
                <button
                  class="con-control-btn con-hover-bg"
                  @click="configDialog()"
                >
                  <vue-feather type="settings"></vue-feather>
                </button>
              </slot>
            </template>
          </DeviceSelector>
        </div>
      </slot>
      <!-- Audio Here -->
      <MediaTrack
        v-for="track in audioTracks"
        :key="track.getId()"
        :track="track"
        is-audio
      />
    </div>
  </UseFullscreen>
</template>

<script setup>
import WaitingLoader from "./WaitingLoader.vue";
import AudioPlayList from "./AudioPlayList.vue";
import MediaTrack from "./MediaTrack.vue";
import DeviceSelector from "./DeviceSelector.vue";
import VueFeather from "vue-feather";
import { resize } from "../constants/jitsi.utils";
import { useResizeObserver } from "@vueuse/core";
import { UseFullscreen } from "@vueuse/components";
import {
  connect,
  createAndJoinRoom,
  createTracksAndAddToRoom,
} from "../constants/jitsi.utils.js";
import bus from "../constants/EventBus";
import JMeetJS from "@joinera/lib-jitsi-meet";
import { defineProps, onBeforeUnmount, onMounted, ref, watch } from "vue";

const emit = defineEmits([
  "error",
  "ready",
  "left",
  "joined",
  "started",
  "stopped",
  "connected",
  "trackAdded",
]);

const props = defineProps({
  msg: String,
  appDomain: {
    type: String,
    default: "meet.jit.si",
  },
  roomName: {
    type: String,
    required: true,
    validator: (val) => {
      const check =
        val.length > 3 && !/\s/.test(val) && val === val.toLowerCase();
      if (!check) {
        console.error(
          "Room name must be at least 4 characters long, have no spaces, and contain no capital letters"
        );
      }
      return check;
    },
  },
  userName: {
    type: String,
    validator: (val) => {
      // Ensure user name is at least 3 characters long and has no spaces or capital letters
      const check =
        val.length < 1 || (!/\s/.test(val) && val === val.toLowerCase());
      if (!check) {
        console.error(
          "User name must have no spaces, and contain no capital letters"
        );
      }
      return check;
    },
  },
  displayName: {
    type: String,
  },
  roomPassword: {
    type: String,
  },
  videoConstraints: {
    type: String,
    default: "360", //720
  },
  appToken: {
    type: String,
  },
  allowVideo: {
    type: Boolean,
    default: true,
  },
  allowAudio: {
    type: Boolean,
    default: true,
  },
  debugLevel: {
    type: String,
    default: "ERROR", //"ERROR",
  },
  aspect: {
    type: Number,
    default: 0,
  },
  alwaysShowControls: {
    type: Boolean,
    default: false,
  },
  autoConnect: {
    type: Boolean,
    default: false,
  },
});

/**
 * @type {JMeetJS}
 */
const JitsiMeetJS = window.JitsiMeetJS || JMeetJS;

const scenery = ref(null);
useResizeObserver(scenery, () => {
  if (status.value.show) {
    resize(props.aspect);
  }
});

const showControls = ref(props.alwaysShowControls);
const localAudioTrack = ref(null);
const localVideoTrack = ref(null);

const activeVideoTrack = ref(null);
const videoTracks = ref([]);
const audioTracks = ref([]);
const conference = ref(null);
const speakerId = ref(null);
const baseKey = ref(new Date().getTime());

const status = ref({
  loading: false,
  show: false,
  audioMuted: false,
  videoMuted: false,
});

const LOGLEVEL = props.debugLevel
  ? (props.debugLevel || "INFO").toUpperCase()
  : "ERROR";

JitsiMeetJS.init();
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels[LOGLEVEL]);

const addTrack = (track) => {
  if (track.getType() === "video" && props.allowVideo) {
    videoTracks.value.push(track);
    if (track.isLocal()) {
      activeVideoTrack.value = track;
      localVideoTrack.value = track;
    }
  } else if (track.getType() === "audio" && props.allowAudio) {
    audioTracks.value.push(track);
    if (track.isLocal()) {
      localAudioTrack.value = track;
    }
    status.value[track.getType() + "Muted"] = track.isMuted();
  }
};

const removeTrack = (track) => {
  if (track.getType() === "video" && props.allowVideo) {
    videoTracks.value = videoTracks.value.filter(
      (e) => e.getId() !== track.getId()
    );
    if (track.getId() === activeVideoTrack.value?.getId()) {
      activeVideoTrack.value = videoTracks.value[0] ?? null;
    }
  } else if (track.getType() === "audio" && props.allowAudio) {
    audioTracks.value = audioTracks.value.filter(
      (e) => e.getId() !== track.getId()
    );
  }
};

// Define event listeners in a separate object for readability and maintainability
const lstnrs = {
  TRACK_ADDED: (track) => {
    emit("trackAdded", track);
    bus.emit("TRACK_ADDED", track);
    addTrack(track);
  },
  TRACK_REMOVED: (track) => {
    bus.emit("TRACK_REMOVED", track);
    if (track.containers.length) {
      track.containers.forEach((el) => {
        track.detach(el);
        el.parentElement.remove();
      });
      removeTrack(track);
    }
  },
  DOMINANT_SPEAKER_CHANGED: (id) => {
    bus.emit("DOMINANT_SPEAKER_CHANGED", id);
    speakerId.value = id;
    if (videoTracks.value.length) {
      activeVideoTrack.value = videoTracks.value.find(
        (e) => e.getParticipantId() === id
      );
    }
  },
  USER_LEFT: (user) => {
    emit("left", user);
    bus.emit("USER_LEFT", user);
    if (conference.value.participants.size === 0) {
      stop();
    }
  },
  TRACK_MUTE_CHANGED: (track) => {
    let resizeTimeout = setTimeout(() => {
      resize(props.aspect, resizeTimeout);
    }, 10);
    bus.emit("TRACK_MUTE_CHANGED", track);
    if (
      [
        localVideoTrack.value?.getParticipantId(),
        localAudioTrack.value?.getParticipantId(),
      ].includes(track.getParticipantId())
    ) {
      status.value[track.type + "Muted"] = track.isMuted();
    }
  },
};

const setName = (name, titlecase) => {
  if (!name) {
    // If no name is provided, generate a random one
    const letters = "abcdefghijklmnopqrstuvwxyz";
    name = "";
    for (let i = 0; i < 10; i++) {
      name += letters[Math.floor(Math.random() * letters.length)];
    }
  }
  if (titlecase) {
    name = name.replace(/\b\w/g, (l) => l.toUpperCase());
  }
  return name;
};

const connectNow = () => {
  const roomName = props.roomName;
  const username = setName(props.userName);
  connect(roomName, props.appToken)
    .then((connection) => {
      emit("connected");
      return createAndJoinRoom(
        connection,
        roomName,
        username,
        props.roomPassword,
        props.videoConstraints
      );
    })
    .then((room) => {
      conference.value = room;

      // Load all event listeners in debug mode and expose the conference object to the window
      if (props.debugLevel === "DEBUG") {
        window.conference = room;
        window.JitsiMeetJS = JitsiMeetJS;
        Object.keys(JitsiMeetJS.events.conference).forEach((key) => {
          room.on(JitsiMeetJS.events.conference[key], (e) => {
            console.log("Conference Event", key, e);
          });
        });
      }

      room.setDisplayName(setName(props.displayName, true));
      room.on(
        JitsiMeetJS.events.conference.DOMINANT_SPEAKER_CHANGED,
        lstnrs.DOMINANT_SPEAKER_CHANGED
      );
      room.on(
        JitsiMeetJS.events.conference.TRACK_REMOVED,
        lstnrs.TRACK_REMOVED
      );
      room.on(
        JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,
        lstnrs.TRACK_MUTE_CHANGED
      );
      room.on(JitsiMeetJS.events.conference.TRACK_ADDED, lstnrs.TRACK_ADDED);
      room.on(JitsiMeetJS.events.conference.USER_LEFT, lstnrs.USER_LEFT);

      createTracksAndAddToRoom(room);

      status.value.loading = false;
      status.value.show = true;
      emit("joined", room);
    })
    .catch((error) => {
      console.error(error);
      status.value.show = false;
      status.value.loading = false;
      emit("error", error);
    });
};

const muteMe = (type = "audio") => {
  const track =
    type === "audio" ? localAudioTrack.value : localVideoTrack.value;

  if (track) {
    if (track.isMuted()) {
      track.unmute();
    } else {
      track.mute();
    }
  }
};

const start = () => {
  status.value.loading = true;
  let startTimeout = setTimeout(() => {
    connectNow();
    emit("started");
    clearTimeout(startTimeout);
    startTimeout = null;
  }, 1000);
};

const stop = () => {
  unwatcherSc1();
  unwatcherMv2();
  if (conference.value?.isJoined()) {
    status.value.loading = true;
    conference.value.leave().then(() => {
      status.value.show = false;
      status.value.loading = false;
      conference.value = null;
      videoTracks.value = [];
      audioTracks.value = [];
      activeVideoTrack.value = null;
      localAudioTrack.value = null;
      localVideoTrack.value = null;
      baseKey.value = new Date().getTime();
      emit("stopped");
    });

    // Remove EventListeners
    if (conference.value) {
      Object.keys(lstnrs).forEach((i) => {
        conference.value.off(JitsiMeetJS.events.conference[i], lstnrs[i]);
      });
    }
  }
};

const unwatcherSc1 = watch(showControls, () => {
  if (status.value.show) {
    let resizeTimeout = setTimeout(() => {
      resize(props.aspect, resizeTimeout);
    }, 3);
  }
});

const unwatcherMv2 = watch(
  () => status.value.videoMuted,
  () => {
    resize(props.aspect);
  }
);

onMounted(() => {
  emit("ready");
  if (props.autoConnect) {
    start();
  }
});

onBeforeUnmount(() => {
  stop();
});
</script>
