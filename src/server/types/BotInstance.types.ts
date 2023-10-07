import {BotInstance} from "../classes/BotInstance.class"
import { ExcludeMethods } from "./util.types"

export type BotInstanceSnapshot = ExcludeMethods<Omit<BotInstance,"client">>