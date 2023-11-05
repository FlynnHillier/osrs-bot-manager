import {ChildProcess,spawn,exec} from "child_process"
import { InstanceState } from "@common/types/instanceState.types"
import { BotInstance } from "./BotInstance.class"

export type BotActivityEvents = {
    onJobChange:()=>void
    onTaskChange:()=>void
}

export class BotActivity {
    public jobTitle : string | null = null
    public taskTitle : string | null = null

    private events : BotActivityEvents

    readonly callbacks = {
        jobChanged:(jobTitle:string | null)=>{
            this.jobTitle = jobTitle
            this.events.onJobChange()
        },
        taskChanged:(taskTitle:string | null)=>{
            this.taskTitle = taskTitle
            this.events.onTaskChange()
        }
    }

    constructor(events:BotActivityEvents){
        this.events = events
    }

    public getCallbacks() {
        return this.callbacks
    }

    

    get state() : InstanceState["activity"]{
        return {
            job:this.jobTitle,
            task:this.taskTitle,
        }
    }
}