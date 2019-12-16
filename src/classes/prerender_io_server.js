import dotenvConversion from 'dotenv-conversion'
import prerender from 'prerender'
import RenderServer from './render_server'

export default class PrerenderIoServer extends RenderServer {
    constructor() {
        super()

        this.server = prerender(this.loadConfigurations())
        this.loadPlugins().forEach(plugin => {
            this.server.use(prerender[plugin]())
        })
        this.server.start()
    }

    loadConfigurations() {
        const env = dotenvConversion.getenv()
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
            }
        }
        return config
    }

    loadPlugins() {
        const env = dotenvConversion.getenv()
        return env.hasOwnProperty('USE_PLUGINS') ? env['USE_PLUGINS'] : []
    }
}