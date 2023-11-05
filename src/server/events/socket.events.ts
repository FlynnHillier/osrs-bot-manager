import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { SocketEntry } from "../classes/SocketEntry.class";
import { botInstanceMaster } from "../init/botInstanceMaster.init";
import { GenericSocketHeartbeatEvents } from "../classes/SocketManager.class";

export const socketHeartbeatEvents : GenericSocketHeartbeatEvents = {
    heartbeat:(username)=>{
        if(botInstanceMaster.instanceExists(username))
        {
            botInstanceMaster.getInstance(username)?.client.getCallbacks().socketConnected()
        }
    },
    disconnect:(username)=>{
        if(botInstanceMaster.instanceExists(username))
        {
            botInstanceMaster.getInstance(username)?.client.getCallbacks().socketDisconnected()
        }
    }
}

export const socketEvents : SocketEntry["events"] = {
    ["ACTIVITY:JOB-CHANGED"]:(username,jobTitle)=>{        
        if(!jobTitle) return;

        botInstanceMaster.getInstance(username)?.activity.getCallbacks().jobChanged(jobTitle)
    },
    ["ACTIVITY:TASK-CHANGED"]:(username,taskTitle)=>{
        if(!taskTitle) return;

        botInstanceMaster.getInstance(username)?.activity.getCallbacks().taskChanged(taskTitle)
    },
}