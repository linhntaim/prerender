const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
dotenvExpand(dotenv.config())

const preRender = require('prerender')

const chromeFlags = process.env.CHROME_FLAGS ? process.env.CHROME_FLAGS.split(',') : null
const usePlugins = process.env.USE_PLUGINS ? process.env.USE_PLUGINS.split(',') : null

const configuration = {}
if (chromeFlags) {
    configuration.chromeFlags = chromeFlags
}

const server = preRender(configuration)

if (usePlugins) {
    usePlugins.forEach(plugin => {
        server.use(preRender[plugin]())
    })
}

server.start()