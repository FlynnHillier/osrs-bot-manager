import { BotInstance, BotInstanceEvents } from "../classes/BotInstance.class";
import { clientSocketBundle } from "../sockets/managers.socket";
import { Subset } from "@common/types/util.types";
import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { CallbackCollection } from "../util/CallbackCollection.util";

export const instanceEvents : BotInstanceMaster["events"] = {
    client:{
        onClose:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:CLOSED",i)
            }
        ),
        onStart:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:STARTED",i)
            }
        ),
    }
}