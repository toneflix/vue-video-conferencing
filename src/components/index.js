import AudioPlayList from "./AudioPlayList.vue";
import Loader from "./WaitingLoader.vue";
import SceneModal from "./SceneModal.vue";
import Selector from "./DeviceSelector.vue";
import Track from "./MediaTrack.vue";
import VideoConferencing from "./VideoConferencing.vue";

export default {
    VideoConference: VideoConferencing,
    VoiceConference: AudioPlayList,
    DeviceSelector: Selector,
    WaitingLoader: Loader,
    MediaTrack: Track,
    ConModal: SceneModal,
}

export const VoiceConference = AudioPlayList;
export const DeviceSelector = Selector;
export const WaitingLoader = Loader;
export const MediaTrack = Track;
export const ConModal = SceneModal;
export const VideoConference = VideoConferencing;