import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import dotenvConversion from 'dotenv-conversion'
import RenderServerManager from './classes/render_server_manager'

dotenvConversion.make(dotenvExpand(dotenv.config()))

export default new RenderServerManager()