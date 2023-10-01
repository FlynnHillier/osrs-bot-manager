import { Socket } from "socket.io";

export class SocketManager {
    public socketMap: Map<string,{rooms:string[],sockets:Socket[]}> = new Map()
    
    constructor(){}
    
    join(username:string,room:string) : void {
        const existingMapEntry = this.socketMap.get((username))

        this.socketMap.set(username, //update socket map entry
            {
                sockets:[],
                ...existingMapEntry,
                rooms:[
                    room,
                    ...(existingMapEntry?.rooms || [])
                ]
            })

        for(let socket of existingMapEntry?.sockets || []){ //update all socket connections to be within room
            socket.join(room)
        }
    }

    leave(username:string,room:string) : void {
        const existingMapEntry = this.socketMap.get((username))

        this.socketMap.set(username, //update socket map entry
            {
                sockets:[],
                ...existingMapEntry,
                rooms:existingMapEntry?.rooms.splice(existingMapEntry.rooms.indexOf(room),1) || []
            })

        for(let socket of existingMapEntry?.sockets || []){ //update all socket connections to leave room
            socket.leave(room)
        }
    }


    registerConnection(username:string,socket:Socket) : void{
        const existingMapEntry = this.socketMap.get((username))

        this.socketMap.set(username,
            {
                rooms:[],
                ...existingMapEntry,
                sockets:[
                    socket,
                    ...(existingMapEntry?.sockets || [])
                ]
            })

        for(let room of existingMapEntry?.rooms || []){
            socket.join(room)
        }
    }
}

export const socketManager = new SocketManager()