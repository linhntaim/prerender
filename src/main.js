import dotEnv from 'dotenv'
import dotEnvExpand from 'dotenv-expand'
import dotEnvConversion from 'dotenv-conversion'
import RenderServerManager from './classes/render_server_manager'

dotEnvConversion.make(dotEnvExpand(dotEnv.config()))

export default new RenderServerManager()