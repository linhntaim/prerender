import {getEnv} from 'dotenv-packed'
import {Manager} from 'illuminate-support'
import RenderServer from './render_server'
import PrerenderIoServer from './prerender_io_server'

export default class RenderServerManager extends Manager {
    constructor() {
        super(null)
    }

    server(server = null) {
        return this.driver(server)
    }

    getDefaultDriver() {
        const defaultServer = getEnv('DEFAULT_SERVER')
        return defaultServer ? defaultServer : 'default'
    }

    createDefaultDriver() {
        return new RenderServer()
    }

    createPrerenderIoDriver() {
        return new PrerenderIoServer()
    }

    start(server = null) {
        const s = this.driver(server)
        return !s || s.start()
    }
}