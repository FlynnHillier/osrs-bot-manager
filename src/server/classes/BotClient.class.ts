import {ChildProcess,spawn,exec} from "child_process"
import { InstanceState } from "@common/types/instanceState.types"
import { BotInstance } from "./BotInstance.class"
import fs from "fs"
import path from "path"

export type BotClientEvents = {
    onStart:()=>void
    onClose:()=>void
    onEnqueue:()=>void
    onMove:()=>void
    onDequeue:()=>void
    onQueueFront:()=>void
}

export class BotClient {
    public isActive : boolean = false
    public isSocketConnected : boolean = false
    public process : ChildProcess | null = null
    public queue : {
        isQueued:boolean
        position:number
    } = {
        isQueued:false,
        position:-1,
    }
    private events : BotClientEvents

    readonly callbacks = {
        dequeued:()=>{
            this.queue.isQueued = false
            this.queue.position = -1
            this.events.onDequeue()
        },
        enqueued:(pos:number)=>{
            this.queue.isQueued = true
            this.queue.position = pos
            this.events.onEnqueue()
        },
        queueMove:(pos:number)=>{
            if(this.queue.isQueued){
                this.queue.position = pos
            }
            this.events.onMove()
        },
        queueFront:()=>{
            this.callbacks.dequeued()
            this.events.onQueueFront()
        }
    }



    constructor(events:BotClientEvents){
        this.events = events
    }

    public getCallbacks() {
        return this.callbacks
    }

    public start(
        deviousClientJarPath:string, 
        user:BotInstance["user"],
        dev_plugin_path:string
    ) : ChildProcess {
        //starts the client.
        
        const bat = BotClient._writeStartBatchFile(user,deviousClientJarPath,dev_plugin_path)

        this.process = exec(bat)
        this.setIsActive(true)
        this.process.on("close",()=>{
            this.setIsActive(false)
        })

        return this.process
    }
    
    
    private static _writeStartBatchFile(user:BotInstance["user"],devious_client_jar_path:string, plugin_folder_path:string ) : string{
        const temp_folder_fp = path.join(__dirname,"..","temp")
        if(!fs.existsSync(temp_folder_fp)){
            fs.mkdirSync(temp_folder_fp)
        }
        
        const bat_fp = path.resolve(path.join(temp_folder_fp,user.username.split("@")[0] + ".bat"))
        const commands = [
            `set PLUGIN_DEVELOPMENT_PATH=${plugin_folder_path}`,
            `java -jar ${devious_client_jar_path} --account=${user.username}:${user.password} --world 543 ${user.proxy ? `--proxy=${user.proxy}` : ""}`
        ]
        
        fs.writeFileSync(bat_fp,commands.join("\n"))
        return bat_fp
    }



    private setIsActive(bool:boolean) {
        if(bool != this.isActive){
            if(bool){
                this.events.onStart()
            } else{
                this.events.onClose()
            }
        }

        this.isActive = bool
    }

    get state() : InstanceState["client"]{
        return {
            isActive:this.isActive,
            queue:{
                isQueued:this.queue.isQueued,
                position:this.queue.position,
            },
            isSocketConnected:this.isSocketConnected
        }
    }

}