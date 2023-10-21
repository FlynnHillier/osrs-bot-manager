import {createContext,ReactNode, useReducer} from "react"
import { InstanceState } from "@common/types/instanceState.types"
import { Subset } from "@common/types/util.types";
import { isInstanceState } from "../logic/instance.logic";

interface Action<Type extends string,SubType extends String | undefined = undefined> {
    type:Type
    payload:{
        instanceState?:Subset<InstanceState>
        subType?:SubType
    }
}


type ExtractSubType<T> = T extends Action<any, infer SubType> ? SubType : never;

type SubAction<A extends Action<any,any>> = Action<ExtractSubType<A>>

function getSubAction<A extends Action<any,any>>(action:A) : SubAction<A> {
    if(!action.payload.subType){
        throw "cannot create sub-action if no sub-type within passed action."
    }
    
    return {
        type:action.payload.subType,
        payload:{
            instanceState:action.payload.instanceState
        }
    }
}


type ClientAction = Action<"CLIENT","STARTED" | "CLOSED">



type Actions = Action<"NEW"> | ClientAction


function instancesReducer<T extends Actions>(instances:InstanceState[],action:T) : InstanceState[]{    
    const {type,payload} = action

    let targetInstanceIndex = payload.instanceState?.user?.username ? instances.map(instance => instance.user.username).indexOf(payload.instanceState?.user?.username) : -1
    let targetInstance = targetInstanceIndex !== -1 ? instances[targetInstanceIndex] : null

    switch (type){
        case "NEW":
            if(!action.payload.instanceState || !isInstanceState(action.payload.instanceState)){
                console.error("recieved malformed instance-context reducer event.")
                break;
            }

            if(targetInstance) {
                //remove already existing version of client.
                instances.splice(targetInstanceIndex,1)
            }

            instances.push(action.payload.instanceState as InstanceState)
            break;
        case "CLIENT":  
            if(!targetInstance || !payload.subType){
                console.error("recieved malformed client-context reducer event.")
                break
            }
            targetInstance.client = clientReducer(targetInstance.client,getSubAction(action as ClientAction))
            break;
        default:
            break;
    }

    //force state update by deepcopy
    return [...instances]
}

function clientReducer(client:InstanceState["client"],action:SubAction<ClientAction>) : InstanceState["client"] {
    const {type,payload} = action

    switch(type){
        case "STARTED":
            client.isActive = true
            break;
        case "CLOSED":
            client.isActive = false
            break;
        default:
            break;
    }

    return {...client}
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