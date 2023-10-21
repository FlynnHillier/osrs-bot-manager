import { BotInstance, BotInstanceEvents } from "../classes/BotInstance.class";
import { clientSocketBundle } from "../sockets/managers.socket";
import { Subset } from "@common/types/util.types";
import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { CallbackCollection } from "../util/CallbackCollection.util";

export const instanceEvents : BotInstanceMaster["events"] = {
    client:{
        onClose:new CallbackCollection(
            (i:BotInstance)=>{
                console.log(i.user.username, " closed")
            }
        )
    }
}