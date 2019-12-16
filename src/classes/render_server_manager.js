import {Manager} from 'illuminate-support'
import dotenvConversion from 'dotenv-conversion'
import PrerenderIoServer from './prerender_io_server'

export default class RenderServerManager extends Manager {
    constructor() {
        super(null)
    }

    server(server = null) {
        return this.driver(server)
    }

    getDefaultDriver() {
        const defaultServer = dotenvConversion.getenv('DEFAULT_SERVER')
        return defaultServer ? defaultServer : 'prerender_io'
    }

    createPrerenderIoDriver() {
        return new PrerenderIoServer()
    }
}