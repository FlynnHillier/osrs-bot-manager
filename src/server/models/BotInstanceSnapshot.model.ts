import {Model, Schema,model} from "mongoose"
import {BotInstanceSnapshot} from "../types/BotInstance.types"

const BotInstanceSnapshotSchema = new Schema<BotInstanceSnapshot>({
    user:{
        username:{
            required:true,
            type:String,
            validate:{
                validator:(email:string) => {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                },
                message:"invalid email."
            }
        },
        password:{
            required:true,
            type:String
        },
        proxy:{
            required:true,
            type:String,
            validate:{
                validator:(proxyString:string) => {
                    return /^([A-Za-z]+\.?)+:[0-9]+:[a-zA-Z0-9]+:[a-zA-Z0-9]+$/.test(proxyString)
                },
                message:"invalid proxy string."
            }
        }
    }
})

export const BotInstanceSnapshotModel = model("BotInstance",BotInstanceSnapshotSchema)