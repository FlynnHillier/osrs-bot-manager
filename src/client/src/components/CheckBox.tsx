import React,{useState,useEffect} from 'react'
import "../styles/checkbox.css"

interface Props {
    onActiveStateChange:(active:boolean) => void
}

const CheckBox = ({ onActiveStateChange } : Props) => {
    let [isActive,setIsActive] = useState<boolean>(false)

    useEffect(()=>{
        onActiveStateChange(isActive)
    },[isActive,onActiveStateChange])

    const onClick = () => {
        setIsActive((wasActive)=>{
            return !wasActive
        })
    }

    return (
        <div 
            className={`checkbox ${isActive ? "active" : "inactive"}`}
            onClick={onClick}
        />
    )
}

export default CheckBox