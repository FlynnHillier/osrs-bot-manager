import mongoose from "mongoose"

function initialiseMongooseConnectionEvents(setConnectionStatus:(value:boolean)=>void) : void {
    mongoose.connection.on("disconnected",()=>{
        setConnectionStatus(false)
    })
    mongoose.connection.on("close",()=>{
        setConnectionStatus(false)
    })
    mongoose.connection.on("connected",()=>{
        setConnectionStatus(true)
    })
    mongoose.connection.on("reconnect",()=>{
        setConnectionStatus(true)
    })
}

let mongoConnectionStatus = false
export function getMongoConnectionStatus(){
    return mongoConnectionStatus
}

export async function initialiseMongoConnection(onConnection:()=>void = ()=>{}) : Promise<void> {
    initialiseMongooseConnectionEvents((v:boolean)=>{mongoConnectionStatus=v})
    
    mongoose.connection.on("connection",onConnection)

    try {
        console.log("connecting.")
        await mongoose.connect(process.env.MONGO_ACCESS_URI as string)
        console.log("connected.")
    } catch(err){
        console.log("error")
        throw {
            message:`an error occured while attempting to establish a connection with mongoDB.`,
            error:err,
        }
    }
}