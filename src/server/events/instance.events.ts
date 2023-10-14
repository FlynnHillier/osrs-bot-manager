import { BotInstance, BotInstanceEvents } from "../classes/BotInstance.class";
import { clientSocketBundle } from "../sockets/managers.socket";
import { Subset } from "@common/types/util.types";

export const instanceEvents : Subset<BotInstanceEvents> = {
    client:{
        onIsActiveChange:(instance:BotInstance,active:boolean)=>{
            if(active){
                clientSocketBundle.emitToAll("BOOTED",instance.user.username)
            } else if(!active){
                clientSocketBundle.emitToAll("KILLED",instance.user.username)
            }
        }
    }
}