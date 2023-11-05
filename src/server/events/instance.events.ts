import { BotInstance, BotInstanceEvents } from "../classes/BotInstance.class";
import { clientSocketBundle } from "../sockets/managers.socket";
import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { CallbackCollection } from "../util/CallbackCollection.util";

export const instanceEvents : BotInstanceMaster["events"] = {
    client:{
        onClose:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:CLOSED",i.state)
            }
        ),
        onStart:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:STARTED",i.state)
            }
        ),
        onEnqueue:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:QUEUED",i.state)
            }
        ),
        onDequeue:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:DEQUEUED",i.state)
            }
        ),
        onSocketConnected:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:SOCKETCONNECTED",i.state)
            }
        ),
        onSocketDisconnected:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("CLIENT:SOCKETDISCONNECTED",i.state)
            }
        ),
    },
    activity:{
        onJobChange:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("ACTIVITY:JOB-CHANGED",i.state)
            }
        ),
        onTaskChange:new CallbackCollection(
            (i:BotInstance)=>{
                clientSocketBundle.emitToAll("ACTIVITY:TASK-CHANGED",i.state)
            }
        )
    }
}