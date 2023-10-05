import {Schema} from "mongoose"
import {BotInstance} from "../types/BotClient.types"


const BotInstanceModel = new Schema<BotInstance>({
    user:{
        username:{
            required:true,
            type:String,
            validate:{
                validator:(email) => {
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
                validator:(proxyString) => {
                    return /^([A-Za-z]+\.?)+:[0-9]+:[a-zA-Z0-9]+:[a-zA-Z0-9]+$/.test(proxyString)
                },
                message:"invalid proxy string."
            }
        }
    }
})

