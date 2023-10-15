import { InstanceState } from "@common/types/instanceState.types";
import { socket } from '../contexts/socket.context';
import { instanceStateSchema } from "../schemas/InstanceState.schema";

export class Instance implements InstanceState {
    public client: { isBooted: boolean; isSocketConnected: boolean; };
    public user: { username: string; proxy: string | null; };
    
    constructor(state:InstanceState){
        this.client = state.client
        this.user = state.user
    }

    public boot() {
        if(!this.client.isBooted){
            socket.emit("BOOT",this.user.username)
        }
    }

    static isValidInstanceState(instanceState:Record<string,any>) : boolean {
        const result = instanceStateSchema.validate(instanceState)
        if(result.error){
            return false
        }
        return true
    }
}