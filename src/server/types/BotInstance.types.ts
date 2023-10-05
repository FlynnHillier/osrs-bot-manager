import { ChildProcess } from "child_process"

export interface BotInstance {
    user:{
        username:string,
        password:string,
        proxy:string,
    }
}

export interface BotInstanceLocalised extends BotInstance{
    client:{
        isStarted:boolean
        isConnectedSocket:boolean
        proccess:ChildProcess | null
    }
}