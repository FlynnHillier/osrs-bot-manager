import { initialiseEnvVariables } from "./init/config.init";
import { initialiseMongoConnection } from "./init/mongoose.init";
import { initialiseSocketServer } from "./init/socket.init";
import { initialiseBotInstanceMaster } from "./init/botInstanceMaster.init";
import { botInstanceMaster } from "./init/botInstanceMaster.init";

export async function init() {
    initialiseEnvVariables()
    await initialiseMongoConnection(()=>{
        console.log("connected to mongodb")
    })
    await initialiseBotInstanceMaster()
    initialiseSocketServer(undefined)
    botInstanceMaster.startAll()
}

init()