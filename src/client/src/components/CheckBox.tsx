import React,{useState,useEffect} from 'react'
import "../styles/checkbox.css"

interface Props {
    checked:boolean
    onChange:(checked:boolean)=>any
}

const CheckBox = ({ checked,onChange } : Props) => {
    return (
        <div 
            className={`checkbox ${checked ? "active" : "inactive"}`}
            onClick={()=>{
                onChange(!checked)
            }}
        />
    )
}

export default CheckBox