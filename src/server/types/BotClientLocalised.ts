import { ChildProcess } from "child_process"
import { BotInstance } from "../types/BotClient.types"

export interface BotInstanceLocalised extends BotInstance{
    client:{
        isStarted:boolean
        isConnectedSocket:boolean
        proccess:ChildProcess | null
    }
}