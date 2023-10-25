import InstanceFrame from "./InstanceFrame"
import { InstanceState } from "@common/types/instanceState.types"
import "../styles/instanceFrameOverview.css"
import CheckBox from "./CheckBox"
import ClientStatusIcon from "./ClientStatusIcon"
import {useState} from "react"

interface Props {
    instanceStates:InstanceState[]
}

//TODO : change how state works, so when you click the 'select all' button it will select all.  


function InstanceFrameOverview({instanceStates}:Props) {
    let [multiSelection,setMultiSelection] = useState<InstanceState[]>([])


    function selectInstance(instance:InstanceState) {
        setMultiSelection((prev)=>{
            if(!prev.includes(instance)){
                return [instance,...prev]
            } else{
                return prev
            }
        })
    }

    function deselectInstance(instance:InstanceState) {
        setMultiSelection((prev)=>{
            const i = prev.indexOf(instance)
            if(i !== -1){
                return [...prev.slice(0,i), ...(i + 1 === prev.length ? [] : prev.slice(i + 1))]
            } else{
                return prev
            }
        })
    }


    function selectAllInstances(){
        instanceStates.forEach((state)=>{
            selectInstance(state)
        })
    }




    function deselectAllInstances(){
        instanceStates.forEach((state)=>{
            deselectInstance(state)
        })
    }

    
    return (
        <div className="instanceFrameOverview">
            <div className="aggregate">
                <CheckBox 
                    checked={multiSelection.length === instanceStates.length} 
                    onChange={(checked)=>{
                        if(checked){
                            selectAllInstances()
                        } else{
                            deselectAllInstances()
                        }
                    }}
                /> 
                <div className="datagrid">
                    <div className="descriptor">
                        <span className="description">
                            {multiSelection.length} instances selected
                        </span>

                        {
                            multiSelection.length > 0 
                            ?
                            <ClientStatusIcon instances={multiSelection}/>
                            :
                            <></> 
                        }
                    </div>
                </div>
            </div>
            <div className="list">
                {
                    instanceStates.map((state)=>{
                        return (
                            <InstanceFrame 
                                instanceState={state} 
                                key={state.user.username} 
                                isSelected={multiSelection.includes(state)} 
                                onSelectionChange={(selected:boolean)=>{
                                    if(selected){
                                        selectInstance(state)
                                    } else {
                                        deselectInstance(state)
                                    }
                                }}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default InstanceFrameOverview