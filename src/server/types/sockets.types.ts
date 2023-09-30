
export type SocketEvent = "status" | "heartbeat" | "identify"

export interface SocketMessage {
    event:SocketEvent,
    payload:SocketIdentifyPayload
}

export interface SocketIdentifyPayload {
    username:string
}


