import { initialiseEnvVariables } from "./init/config.init";
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