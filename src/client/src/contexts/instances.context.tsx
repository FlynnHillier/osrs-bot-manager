import {createContext,ReactNode, useReducer} from "react"
import { InstanceState } from "@common/types/instanceState.types"
import { Subset } from "@common/types/util.types";
import { isInstanceState } from "../logic/instance.logic";

interface Action<Type extends string,SubType extends String | undefined = undefined> {
    type:Type
    payload:{
        instanceState:InstanceState
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


type ClientAction = Action<"CLIENT","STARTED" | "CLOSED" | "QUEUED" | "DEQUEUED">


type Actions = Action<"NEW"> | ClientAction


function instancesReducer<T extends Actions>(instances:InstanceState[],action:T) : InstanceState[]{    
    const {type,payload} = action

    //validate payload
    if(!isInstanceState(payload.instanceState)){
        console.error(`ignoring event ${type}${payload.subType ? `:${payload.subType}`:""} . Malformed instance-state in payload: `,payload.instanceState)
        return instances
    }

    const existingInstanceIndex = instances.map(instance => instance.user.username).indexOf(payload.instanceState.user.username)
    let existingInstance = instances[existingInstanceIndex] || null

    //-- events that DO NOT require existing instance state --
    let requireExistingInstanceState = false
    switch (type){
        case "NEW":
            if(existingInstance) {
                //remove already existing version of client.
                instances.splice(existingInstanceIndex,1)
            }

            instances.push(action.payload.instanceState as InstanceState)
            break;
        default:
            requireExistingInstanceState = true
            break;
    }


    if(requireExistingInstanceState && !existingInstance){
        console.error(`ignoring event ${type}${payload.subType ? `:${payload.subType}`:""} . Expected existing instance-state in context, instance-state not found. event payload intance-state:`,payload.instanceState)
    }

    //-- events that DO require existing instance state --
    switch (type){
        case "CLIENT":  
            existingInstance.client = clientReducer(existingInstance.client,getSubAction(action as ClientAction))
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
        case "QUEUED":
            client.queue.isQueued = true
            client.queue.position = payload.instanceState.client.queue.position
            break;
        case "DEQUEUED":
            client.queue.isQueued = false
            client.queue.position = -1
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