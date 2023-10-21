import { BotInstance } from "./BotInstance.class"
import { BotInstanceSnapshotModel } from "../models/BotInstanceSnapshot.model"
import { InstanceBootQueue } from "./Queue.class"


export class BotInstanceMaster {
    private instances : Map<string,BotInstance> = new Map<string,BotInstance>()
    private events : ConstructorParameters<typeof BotInstance>[1]

    private queue : InstanceBootQueue = new InstanceBootQueue()


    public bootAll(excludeUsernames:string[] = []){
        for(let [username,instance] of this.instances.entries()){
            if(!excludeUsernames.includes(username)){
                this.queue.enqueue(instance)
            }
        }
    }


    constructor(
        events:BotInstanceMaster["events"]
    ) {
        this.events = events
    }

    
    
    
    async loadFromMongo(overwrite:boolean = false) : Promise<BotInstance[]> {
        const instanceSnapshots = await BotInstanceSnapshotModel.find()

        const newInstances : BotInstance[] = []

        for (let instanceSnapshot of instanceSnapshots){
            if(overwrite || (!overwrite  && this.getInstance(instanceSnapshot.user.username) == null)){
                const instance = BotInstance.fromInstanceSnapshot(
                    instanceSnapshot,
                    this.events
                )
                this.instances.set(instanceSnapshot.user.username,instance)
                newInstances.push(instance)
            }
        }

        return newInstances
    }

    private getInstance(username:string) : BotInstance | null {
        return this.instances.get(username) || null
    }

    public getAllInstances() : BotInstance[] {
        return Array.from(this.instances.values())
    }
}