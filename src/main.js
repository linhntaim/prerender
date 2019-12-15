import dotEnv from 'dotenv'
import dotEnvExpand from 'dotenv-expand'
import dotEnvConversion from 'dotenv-conversion'
import {loadConfigurations, loadPlugins} from './utils'
import PreRenderServer from './classes/pre_render_server'

dotEnvConversion.make(dotEnvExpand(dotEnv.config()))

new PreRenderServer(loadConfigurations(dotEnvConversion.env), loadPlugins(dotEnvConversion.env)).on()