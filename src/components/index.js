import AudioPlayList from "./AudioPlayList.vue";
import DeviceSelector from "./DeviceSelector.vue";
import MediaTrack from "./MediaTrack.vue";
import SceneModal from "./SceneModal.vue";
import VideoConferencing from "./VideoConferencing.vue";
import WaitingLoader from "./WaitingLoader.vue";

export default {
    VoiceConference: AudioPlayList,
    DeviceSelector,
    WaitingLoader,
    MediaTrack,
    SceneModal,
    Conference: VideoConferencing,
}