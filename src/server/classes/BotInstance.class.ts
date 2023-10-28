import { BotInstanceSnapshotModel } from "../models/BotInstanceSnapshot.model"
import { unwrappedCallbackCollections,InstanceEvent,BotInstanceSnapshot } from "../types/BotInstance.types"
import { BotClient,BotClientEvents } from "./BotClient.class"
import { CallbackCollection } from "../util/CallbackCollection.util"
import { configuration } from "../init/config.init"
import { Subset } from "@common/types/util.types"
import { InstanceState } from "@common/types/instanceState.types"

export interface BotInstanceEvents {
    client:unwrappedCallbackCollections<BotClientEvents>
}



export class BotInstance {
    public user : {
        username:string
        password:string
        proxy:string | null
    }
    public client : BotClient
    
    public events:BotInstanceEvents = {
        client:{
            onClose:new CallbackCollection<InstanceEvent>,
            onDequeue:new CallbackCollection<InstanceEvent>,
            onEnqueue:new CallbackCollection<InstanceEvent>,
            onMove: new CallbackCollection<InstanceEvent>,
            onQueueFront: new CallbackCollection<InstanceEvent>,
            onStart: new CallbackCollection<InstanceEvent>,
        }
    }

    constructor(
        user : {
            username:string
            password:string
            proxy:string | null
        },
        events:Subset<BotInstanceEvents> = {}
    ){
        this.events = {
            client:{
                ...this.events.client,
                ...(events.client ? events.client : {})
            } as BotInstance["events"]["client"] //Hacky, potentially fix in future? Not sure why type error is thrown.
        }

        this.user = user
        this.client = new BotClient(this.wrapCallBackCollections(this.events.client))


        //-- bind standard events. These events are events that are called on every instance, regardless of which events are passed --
        this.events.client.onQueueFront.register(()=>{
            this.client.start(configuration.devious_jar_path,this.user,configuration.devious_dev_plugin)
        })
    }


    /**
     * @description given an object containing key value pairs, <string,CallBackCollection<InstanceEvent>> return 
     * a new object, with the same keys as argument object, with the values mutated to a plain callback <()=>void>
     * that encapsulates the argObject[key]'s callBackColection.call method, with an arg passed as 'this' referencing
     * the whole instance object.
     * @param collections - an object containing the callback collections that must be wrapped.
     * @returns - an object with matching keys as 'collections' with value's mutated to be callbacks encapsulating the collections[key].call method, with an arg 'this' (as BotInstance) passed
    */
    private wrapCallBackCollections<CBC extends {[collection:string]:CallbackCollection<InstanceEvent>}> (collections:CBC) : {[event in keyof CBC]: ()=> void}{
        return Object.entries(collections)
        .map(
            ([key,cbCollection])=>{
                return {
                    key,
                    val:()=>{
                        cbCollection.call(this)
                    }
                }
            }
        ).reduce<{[event in keyof CBC]: ()=> void}>((prev,current) => {
                return {...prev,[current.key]:current.val}
            },
            {} as {[event in keyof CBC]: ()=> void}
        )
    }




    public static fromInstanceSnapshot(instanceSnapshot:BotInstanceSnapshot,events:ConstructorParameters<typeof BotInstance>[1] = {}) : BotInstance {
        return new BotInstance(instanceSnapshot.user,events)
    }


    public async storeSnapshot() : Promise<void> {
        //test this.
        await new BotInstanceSnapshotModel(this).save()
    }


    get clientState() : InstanceState {
        //return a client valid state
        return {
            user:{
                username:this.user.username,
                proxy:this.user.proxy,
            },
            client:this.client.state
        }
    }
}