import { BotInstance, BotInstanceEvents } from "../classes/BotInstance.class";
import { clientSocketBundle } from "../sockets/managers.socket";
import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { CallbackCollection } from "../util/CallbackCollection.util";

export const instanceEvents : BotInstanceMaster["events"] = {
    client:{
        onClose:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:CLOSED",i.clientState)
            }
        ),
        onStart:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:STARTED",i.clientState)
            }
        ),
        onEnqueue:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:QUEUED",i.clientState)
            }
        ),
        onDequeue:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:DEQUEUED",i.clientState)
            }
        ),
        onSocketConnected:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:SOCKETCONNECTED",i.clientState)
            }
        ),
        onSocketDisconnected:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:SOCKETDISCONNECTED",i.clientState)
            }
        ),
    }
}