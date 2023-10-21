import {ChildProcess,spawn} from "child_process"
import { InstanceState } from "@common/types/instanceState.types"

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

    public start(deviousClientJarPath:string) : ChildProcess {
        //starts the client.
        this.process = spawn(`java -jar ${deviousClientJarPath}`,{shell:true})
        this.setIsActive(true)
        this.process.on("close",()=>{
            this.setIsActive(false)
        })

        return this.process
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
            isBooted:this.isActive,
            isSocketConnected:this.isSocketConnected
        }
    }

}