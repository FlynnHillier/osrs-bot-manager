import { InstanceState } from "@common/types/instanceState.types";
import {instanceStateSchema} from "../schemas/InstanceState.schema"
import { socket } from '../contexts/socket.context';

export function isInstanceState(state:any) {
    return !instanceStateSchema.validate(state).error
}

export function bootInstance(instance:InstanceState) {
    if(!instance.client.isBooted){
        socket.emit("BOOT",instance.user.username)
    }
}

