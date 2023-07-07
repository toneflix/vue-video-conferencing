import components from './components/index.js'

const plugin = {
    install (app) {
        for (const prop in components) {
            if (Object.keys(components).includes(prop)) {
                const component = components[prop]
                app.component(prop, component)
            }
        }
    }
}

export default plugin
export const ConModal = components.ConModal
export const DeviceSelector = components.DeviceSelector
export const MediaTrack = components.MediaTrack
export const VideoConference = components.VideoConference
export const VoiceConference = components.VoiceConference
export const WaitingLoader = components.WaitingLoader