import {parseEnv} from 'dotenv-packed'
import RenderServerManager from '../src'
import PrerenderIoServer from '../src/classes/prerender-io-server'
import RenderServer from '../src/classes/render-server'

import mocha from 'mocha'
import chai from 'chai'

const describe = mocha.describe
const it = mocha.it
const expect = chai.expect
chai.should()

describe('render-server-manager', function () {
    describe('unit tests', function () {
        it('specific driver', function (done) {
            RenderServerManager.server('prerender_io').should.be.an.instanceOf(PrerenderIoServer)
            RenderServerManager.start('default').should.be.a('boolean')
            done()
        })

        it('default driver', function (done) {
            RenderServerManager.getDefaultDriver().should.equal('default')
            RenderServerManager.server().should.be.an.instanceOf(RenderServer)
            expect(RenderServerManager.start()).to.be.a('boolean')
            done()
        })

        it('default driver (.env)', function (done) {
            const input = {
                DEFAULT_SERVER: 'prerender_io',
            }

            Object.assign(process.env, input)
            parseEnv()
            RenderServerManager.getDefaultDriver().should.equal('prerender_io')
            RenderServerManager.server().should.be.an.instanceOf(PrerenderIoServer)
            done()
        })

        it('prerender io', function (done) {
            const input = {
                DEFAULT_SERVER: 'prerender_io',

                PORT: '3000',

                CHROME_FLAGS: '["--no-sandbox","--headless","--disable-gpu"]',

                LOG_REQUESTS: 'false',
                PAGE_DONE_CHECK_INTERVAL: '1000',
                PAGE_LOAD_TIMEOUT: '20000',
                WAIT_AFTER_LAST_REQUEST: '500',
                FOLLOW_REDIRECTS: 'false',

                USE_PLUGINS: '["removeScriptTags","httpHeaders"]',
            }
            const expectedConfiguration = {
                port: 3000,

                chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu'],

                logRequests: false,
                pageDoneCheckInterval: 1000,
                pageLoadTimeout: 20000,
                waitAfterLastRequest: 500,
                followRedirects: false,
            }
            const expectedPlugins = ['removeScriptTags', 'httpHeaders']

            Object.assign(process.env, input)
            parseEnv()
            RenderServerManager.getDefaultDriver().should.equal('prerender_io')
            const prerenderIoServer = RenderServerManager.server()
            prerenderIoServer.loadConfigurations().should.deep.include(expectedConfiguration)
            prerenderIoServer.loadPlugins().should.deep.equal(expectedPlugins)

            done()
        })
    })
})
