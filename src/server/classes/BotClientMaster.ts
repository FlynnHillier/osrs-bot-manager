import { exec,ChildProcess } from "child_process"
import mongoose from "mongoose"

import { BotInstanceLocalised } from "../types/BotClientLocalised"

export class BotClientMaster {
    private clients : Map<string,BotInstanceLocalised> = new Map<string,BotInstanceLocalised>()
    private deviousClientJarPath : string

    constructor(
        deviousClientJarPath : string
    ) {
        //validate path is valid path here
        this.deviousClientJarPath = deviousClientJarPath

        //load all known bot clients from BotClients db load into memory.


    }

    loadFromDatabase(mongo_uri:string) {
        
    }

    start_client(username) : ChildProcess | null {
        let client = this.get_client(username)
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

    get_client(username) : BotInstanceLocalised | null {
        return this.clients.get(username) || null
    }

    set_socket_connected(username) : void {
        let client = this.get_client(username)
        if(!client){
            return
        }

        client.client.isConnectedSocket = true
    }


    set_socket_disconnected(username) : void {
        let client = this.get_client(username)
        if(!client){
            return
        }

        client.client.isConnectedSocket = false
    }
}