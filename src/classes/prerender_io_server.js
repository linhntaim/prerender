import {getenv} from 'dotenv-packed'
import prerender from 'prerender'
import RenderServer from './render_server'

export default class PrerenderIoServer extends RenderServer {
    constructor() {
        super()

    }

    start() {
        this.server = prerender(this.loadConfigurations())
        this.loadPlugins().forEach(plugin => {
            this.server.use(prerender[plugin]())
        })
        this.server.start()
        return true
    }

    loadConfigurations() {
        const env = getenv()
        const config = {
            port: 'PORT',

            chromeLocation: 'CHROME_LOCATION',
            chromeFlags: 'CHROME_FLAGS',

            logRequests: 'LOG_REQUESTS',
            pageDoneCheckInterval: 'PAGE_DONE_CHECK_INTERVAL',
            pageLoadTimeout: 'PAGE_LOAD_TIMEOUT',
            waitAfterLastRequest: 'WAIT_AFTER_LAST_REQUEST',
            followRedirects: 'FOLLOW_REDIRECTS',
        }
        for (const key in config) {
            if (env.hasOwnProperty(config[key])) {
                config[key] = env[config[key]]
            } else delete config[key]
        }
        return config
    }

    loadPlugins() {
        const env = getenv()
        return env.hasOwnProperty('USE_PLUGINS') ? env['USE_PLUGINS'] : []
    }
}