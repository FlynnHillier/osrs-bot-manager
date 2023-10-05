import {Model, Schema,model} from "mongoose"
import {BotInstance} from "../types/BotInstance.types"

const BotInstanceSchema = new Schema<BotInstance>({
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

export const BotInstanceModel = model("BotInstance",BotInstanceSchema)