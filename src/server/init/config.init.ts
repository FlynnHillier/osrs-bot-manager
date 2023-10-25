import { config } from "dotenv"
import { readFileSync } from "fs"
import path from "path"

export function initialiseEnvVariables() : void {
    config()

    const expectedEnvKeys = [
        "PORT",
        "MONGO_ACCESS_URI",
        "NODE_ENV",
        "CLIENT_URL"
    ]

    const undefinedKeys : string[] = []
    for(let key of expectedEnvKeys){
        if(process.env[key] === undefined){
            undefinedKeys.push(key)
        }
    }

    if(undefinedKeys.length !== 0){
        throw `some required enviroment variables are not defined: [ ${undefinedKeys.join(", ")} ]`
    }
}

export function loadConfig(){
    const fileData = readFileSync(path.join(__dirname,"..","config.json")).toString()
    return JSON.parse(fileData)
}

export const corsConfig = {
    origin:process.env.NODE_ENV === "development" && process.env.REACT_APP_URL ? process.env.REACT_APP_URL : process.env.HOST_URL,
    credentials:true,
}

initialiseEnvVariables()
export const configuration = loadConfig()