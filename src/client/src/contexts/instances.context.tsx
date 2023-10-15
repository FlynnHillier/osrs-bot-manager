import {createContext,ReactNode, useReducer} from "react"
import { InstanceState } from "@common/types/instanceState.types"
import { Subset } from "@common/types/util.types";
import { isInstanceState } from "../logic/instance.logic";

export interface InstanceReducerActionPayload {
    instanceState?:Subset<InstanceState>
}


export type InstanceReducerActionType = "NEW" | "KILLED" | "BOOTED"


export interface InstanceReducerAction {
    type:InstanceReducerActionType
    payload:InstanceReducerActionPayload
}

function instancesReducer(instances:InstanceState[],action:InstanceReducerAction) : InstanceState[]{    
    const {type,payload} = action

    let targetInstanceIndex = payload.instanceState?.user?.username ? instances.map(instance => instance.user.username).indexOf(payload.instanceState?.user?.username) : -1
    let targetInstance = targetInstanceIndex !== -1 ? instances[targetInstanceIndex] : null

    switch (type){
        case "NEW":
            if(!action.payload.instanceState || !isInstanceState(action.payload.instanceState)){
                //invalid payload
                break;
            }

            if(targetInstance) {
                //remove already existing version of client.
                instances.splice(targetInstanceIndex,1)
            }
            
            instances.push(action.payload.instanceState as InstanceState)
            break;
        case "KILLED":    
            if(targetInstance){
                targetInstance.client.isBooted = false
            }
            break;
        case "BOOTED":
            if(targetInstance){
                targetInstance.client.isBooted = true
            }
            break;
        default:
            break;
    }

    //force state update by deepcopy
    return [...instances]
}


const useProvideInstances = () => {
    const [instances,dispatchInstances] = useReducer(instancesReducer,[] as InstanceState[])

    return {
        instances,
        dispatchInstances
    }
}

export const InstancesContext = createContext<ReturnType<typeof useProvideInstances>>({} as ReturnType<typeof useProvideInstances>)

export const InstancesProvider = ({children} : {children:ReactNode}) => {
    const auth = useProvideInstances()

    return (
        <InstancesContext.Provider value={auth}>
            {children}
        </InstancesContext.Provider>
    )
}

export default InstancesProvider