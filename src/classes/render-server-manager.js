import {getEnv} from 'dotenv-packed'
import RenderServer from './render-server'
import PrerenderIoServer from './prerender-io-server'

export default class RenderServerManager
{
    constructor() {
        this.servers = {}
    }

    getDefaultDriver() {
        const defaultServer = getEnv('DEFAULT_SERVER')
        return defaultServer ? defaultServer : 'default'
    }

    server(server = null) {
        server = server ? server : this.getDefaultDriver()
        if (!(server in this.servers)) {
            return this.servers[server] = this.createServer(server)
        }
        return this.servers[server]
    }

    createServer(server) {
        switch (server) {
            case 'prerender_io':
                return this.createPrerenderIoServer()
            default:
                return this.createDefaultServer()
        }
    }

    createDefaultServer() {
        return new RenderServer()
    }

    createPrerenderIoServer() {
        return new PrerenderIoServer()
    }

    start(server = null) {
        const s = this.server(server)
        return !s || s.start()
    }
}
