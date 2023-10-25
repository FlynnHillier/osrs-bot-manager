import {createContext,ReactNode} from "react"
import io,{Socket} from "socket.io-client"

const targetURL = process.env.REACT_APP_SERVER_BASE_URL?.replace(/\/+$/g, '') + "/client" //add namespace to socket url

export const socket = io(targetURL,{withCredentials:true})

export const SocketContext = createContext<Socket>(socket)

export const SocketProvider = ({children} : {children:ReactNode}) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider