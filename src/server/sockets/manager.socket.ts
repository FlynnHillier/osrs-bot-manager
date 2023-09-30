import { WebSocket } from "ws"

//This should map each unique osrs-client to a socket.
export class SocketManager {
    private sockets : Map<string,WebSocket> = new Map()

    constructor() {}

    /**
     * 
     * @param username - the username to which the socket should be bound to
     * @param socket - a web socket instance associated to the passed username
     * @description register a new client socket connection to a user, for identification later.
     */
    public register(username:string,socket:WebSocket) {
        if(this.existsClient(username)){
            this.deregister(username)
        }

        this.sockets.set(username,socket)
    }


    /**
     * 
     * @param username - the username to de-register
     * @returns void
     * @description deregister a client if it has been registered previously
     */
    public deregister(username:string) : void {
        if (!this.sockets.has(username)){
            return 
        }
        
        const existingSocket = this.sockets.get(username)
        existingSocket!.close()
        this.sockets.delete(username)
    }

    /**
     * 
     * @param username - check if the specified username exists within client entries
     * @returns boolean : 
     */
    public existsClient(username:string) : boolean {
        return this.sockets.has(username)
    }

    public getSocket(username:string) : WebSocket {
        if(!this.existsClient(username)){
            //raise socket not exists error
        }
        
        return this.sockets.get(username) as WebSocket
    }

    public get numberOfConnections() {
        return this.sockets.size
    }

    public get ConnectionIdentifiers() {
        return Array(this.sockets.keys())
    }
}

// instantiated instance for imports
export const socketManager = new SocketManager()