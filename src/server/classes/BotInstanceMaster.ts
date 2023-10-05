import { exec,ChildProcess } from "child_process"
import mongoose from "mongoose"
import { BotInstanceModel } from "../models/BotInstance.model"

import { BotInstance, BotInstanceLocalised } from "../types/BotInstance.types"

export class BotInstanceMaster {
    private instances : Map<string,BotInstanceLocalised> = new Map<string,BotInstanceLocalised>()
    private deviousClientJarPath : string

    constructor(
        deviousClientJarPath : string,
    ) {
        //validate path is valid path here
        this.deviousClientJarPath = deviousClientJarPath
    }

    async loadFromMongo(overwrite:boolean = false) : Promise<BotInstance[]> {
        const instances = await BotInstanceModel.find()

        for (let instance of instances){
            const username = instance.user.username
            if(overwrite || (!overwrite  && this.get_instance(username) == null)){
                this.instances.set(username,BotInstanceMaster.instanceToLocalised(instance))
            }
        }

        return instances
    }


    private static instanceToLocalised(instance:BotInstance) : BotInstanceLocalised {
        return {
            ...instance,
            client:{
                isStarted:false,
                isConnectedSocket:false,
                proccess:null,
            }
        }
    }


    start_client(username) : ChildProcess | null {
        let client = this.get_instance(username)
        if(!client || client.client.isStarted){
            return null
        }

        //run jar
        const process = exec(`java -jar ${this.deviousClientJarPath}`)

        //bind process to client object
        client.client.isStarted = true
        client.client.proccess = process
        return process
    }

    get_instance(username) : BotInstanceLocalised | null {
        return this.instances.get(username) || null
    }

    set_socket_connected(username) : void {
        let client = this.get_instance(username)
        if(!client){
            return
        }

        client.client.isConnectedSocket = true
    }


    set_socket_disconnected(username) : void {
        let client = this.get_instance(username)
        if(!client){
            return
        }

        client.client.isConnectedSocket = false
    }
}