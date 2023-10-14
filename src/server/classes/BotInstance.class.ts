import { exec,ChildProcess,spawn } from "child_process"
import { BotInstanceSnapshotModel } from "../models/BotInstanceSnapshot.model"
import { BotInstanceSnapshot } from "../types/BotInstance.types"
import { AtLeastOnePropertyOf } from "../types/util.types"
import {InstanceState} from "@common/types/instanceState.types"
import { updateObject } from "../util/objects.util"
import { Subset } from "@common/types/util.types"

export interface BotInstanceEvents {
    client:{
        onIsActiveChange:(instance:BotInstance,isActive:boolean)=>any
    }
}


export class BotInstance {
    private _user : {
        username:string
        password:string
        proxy:string | null
    }
    private _client : {
        isActive:boolean
        isSocketConnected:boolean
        process:ChildProcess | null
    }
    private _events:BotInstanceEvents = {
        client:{
            onIsActiveChange:(instance,active) => {}
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
        this._user = user

        this._client = {
            isActive:false,
            isSocketConnected:false,
            process:null
        }

        //update default events with those that are passed
        this._events = {
            client:{
                ...this._events.client,
                ...events.client
            } as BotInstance["_events"]["client"] //hacky way. fix in future?
        }
    }

    public static fromInstanceSnapshot(instanceSnapshot:BotInstanceSnapshot,events:Subset<BotInstanceEvents> = {}) : BotInstance {
        return new BotInstance(instanceSnapshot.user,events)
    }


    public start(deviousClientJarPath:string) : ChildProcess {
        //starts the client.
        this._client.process = spawn(`java -jar ${deviousClientJarPath}`,{shell:true})

        this._client.process.on("close",()=>{
            this.setClient({isActive:false})
        })
        this.setClient({isActive:true})

        return this._client.process
    }   

    public kill() : boolean {
        if(this._client.process == null){
            return false
        }

        this._client.process.kill()
        this._client.process = null

        return true
    }

    private setClient(updates:AtLeastOnePropertyOf<BotInstance["client"]>){
        const ogClient = this.client //take a copy of client before change, for comparison after change.
        
        this._client = updateObject(this.client,updates)
        const {client} = this

        if(ogClient.isActive != client.isActive){
            this._events.client.onIsActiveChange(this,client.isActive)
        }
    }


    public async storeSnapshot() : Promise<void> {
        //test this.
        await new BotInstanceSnapshotModel(this).save()
    }

    get clientState() : InstanceState {
        //return a client valid state
        return {
            user:{
                username:this._user.username,
                proxy:this._user.proxy,
            },
            client:{
                isBooted:this.client.isActive,
                isSocketConnected:this.client.isSocketConnected
            }
        }
    }

    get client() : BotInstance["_client"] {
        return {...this._client}
    }

    get user() : BotInstance["_user"] {
        return {...this._user}
    }
}