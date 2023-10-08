import {createContext,ReactNode, useReducer} from "react"
import { InstanceState } from "../types/instances.types"

type MultiInstancesState = {
    [key:string]:InstanceState
}

export interface InstanceReducerActionPayload {
    targetUser?:string
    instanceState:Partial<InstanceState>
}


export type InstanceReducerActionType = "UPDATE" | "NEW" | "DELETE"


export interface InstanceReducerAction {
    type:InstanceReducerActionType
    payload:InstanceReducerActionPayload
}

function instancesReducer(instances:MultiInstancesState,action:InstanceReducerAction) : MultiInstancesState{
    switch (action.type){
        default:
            return {...instances}
    }
}


const useProvideInstances = () => {
    const [instances,dispatchInstances] = useReducer(instancesReducer,{} as MultiInstancesState)

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