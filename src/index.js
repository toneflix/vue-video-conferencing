import VueFeather from 'vue-feather';
import components from './components/index.js'

const plugin = {
    install (app) {
        app.component(VueFeather.name, VueFeather);
        for (const prop in components) {
            if (Object.keys(components).includes(prop)) {
                const component = components[prop]
                app.component(prop, component)
            }
        }
    }
}

export default plugin