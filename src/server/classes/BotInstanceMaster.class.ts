import { exec,ChildProcess } from "child_process"
import mongoose from "mongoose"
import { BotInstance } from "./BotInstance.class"
import { BotInstanceSnapshotModel } from "../models/BotInstanceSnapshot.model"

export class BotInstanceMaster {
    private instances : Map<string,BotInstance> = new Map<string,BotInstance>()
    private deviousClientJarPath : string

    constructor(
        deviousClientJarPath : string,
    ) {
        //validate path is valid path here
        this.deviousClientJarPath = deviousClientJarPath
    }

    async loadFromMongo(overwrite:boolean = false) : Promise<BotInstance[]> {
        const instanceSnapshots = await BotInstanceSnapshotModel.find()

        const newInstances : BotInstance[] = []

        for (let instanceSnapshot of instanceSnapshots){
            if(overwrite || (!overwrite  && this.getInstance(instanceSnapshot.user.username) == null)){
                const instance = BotInstance.fromInstanceSnapshot(instanceSnapshot)
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

    getInstance(username:string) : BotInstance | null {
        return this.instances.get(username) || null
    }
}