import { initialiseEnvVariables } from "./init/init.config";
import { initialiseMongoConnection } from "./init/mongoose.init";
import { initialiseSocketServer } from "./init/socket.init";

async function init() {
    initialiseEnvVariables()
    await initialiseMongoConnection(()=>{
        console.log("connected to mongodb")
    })

    initialiseSocketServer(undefined)

}

init()