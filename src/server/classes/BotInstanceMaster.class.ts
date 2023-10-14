import { exec,ChildProcess } from "child_process"
import mongoose from "mongoose"
import { BotInstance } from "./BotInstance.class"
import { BotInstanceSnapshotModel } from "../models/BotInstanceSnapshot.model"
import { BotInstanceEvents } from "./BotInstance.class"
import { Subset } from "@common/types/util.types"

export class BotInstanceMaster {
    private instances : Map<string,BotInstance> = new Map<string,BotInstance>()
    private deviousClientJarPath : string
    private events : Subset<BotInstanceEvents>

    constructor(
        deviousClientJarPath : string,
        events:Subset<BotInstanceEvents> = {}
    ) {
        //validate path is valid path here
        this.deviousClientJarPath = deviousClientJarPath
        this.events = events
    }

    async loadFromMongo(overwrite:boolean = false) : Promise<BotInstance[]> {
        const instanceSnapshots = await BotInstanceSnapshotModel.find()

        const newInstances : BotInstance[] = []

        for (let instanceSnapshot of instanceSnapshots){
            if(overwrite || (!overwrite  && this.getInstance(instanceSnapshot.user.username) == null)){
                const instance = BotInstance.fromInstanceSnapshot(instanceSnapshot,this.events)
                this.instances.set(instanceSnapshot.user.username,instance)
                newInstances.push(instance)
            }
        }

        return newInstances
    }

    public startAll(excludeUsernames:string[] = []) {
        for(let [username,instance] of this.instances.entries()){
            if(!excludeUsernames.includes(username)){
                instance.start(this.deviousClientJarPath)
            }
        }
    }

    public startInstance(username:string) : boolean {
        const instance = this.getInstance(username)

        if(!instance){
            return false
        }

        instance.start(this.deviousClientJarPath)
        return true
    }

    private getInstance(username:string) : BotInstance | null {
        return this.instances.get(username) || null
    }

    public getAllInstances() : BotInstance[] {
        return Array.from(this.instances.values())
    }
}