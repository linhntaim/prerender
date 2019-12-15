import preRender from 'prerender'

export default class PreRenderServer {
    constructor(configuration = {}, plugins = []) {
        this.server = preRender(configuration)
        plugins.forEach(plugin => {
            this.server.use(preRender[plugin]())
        })
    }

    on() {
        this.server.start()
    }
}