import {parseEnv} from 'dotenv-packed'
import RenderServerManager from './index'

parseEnv()

RenderServerManager.start()