import { config } from "dotenv"

export function initialiseEnvVariables() : void {
    config()

    const expectedEnvKeys = [
        "PORT",
        "MONGO_ACCESS_URI",
        "NODE_ENV",
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

export const corsConfig = {
    origin:process.env.NODE_ENV === "development" && process.env.REACT_APP_URL ? process.env.REACT_APP_URL : process.env.HOST_URL,
    credentials:true,
}