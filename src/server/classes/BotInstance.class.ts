import { exec,ChildProcess,spawn } from "child_process"
import { BotInstanceSnapshotModel } from "../models/BotInstance.model"
import { BotInstanceSnapshot } from "../types/BotInstance.types"

export class BotInstance {
    public user : {
        username:string
        password:string
        proxy:string | null
    }
    public client : {
        isActive:boolean
        isSocketConnected:boolean
        process:ChildProcess | null
    }

    constructor(
        user : {
            username:string
            password:string
            proxy:string | null
        }
    ){
        this.user = user

        this.client = {
            isActive:false,
            isSocketConnected:false,
            process:null
        }
    }

    public static fromInstanceSnapshot(instanceSnapshot:BotInstanceSnapshot) : BotInstance {
        return new BotInstance(instanceSnapshot.user)
    }


    public start(deviousClientJarPath:string) : ChildProcess {
        //starts the client.
        this.client.process = spawn(`java -jar ${deviousClientJarPath}`,{shell:true})
        this.client.isActive = true

        return this.client.process
    }   

    public kill() : boolean {
        if(this.client.process == null){
            return false
        }

        this.client.process.kill()
        this.client.process = null
        this.client.isActive = false

        return true
    }

    public async storeSnapshot() : Promise<void> {
        await new BotInstanceSnapshotModel(this).save()
    }
}