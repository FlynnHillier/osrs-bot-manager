import { Socket } from "socket.io"

export class SocketBundle {
    private rooms : Set<string> = new Set<string>()
    private sockets : Socket[] = []
    public username : string

    constructor(username:string) {
        this.username = username
    }

    public join(room:string){
        if(!this.rooms.has(room)){
            for(let socket of this.sockets){
                socket.join(room)
            }
        }
        this.rooms.add(room)
    }

    public joins(...rooms:string[]){
        for(let room of rooms){
            this.join(room)
        }
    }

    public leave(room:string){
        if(this.rooms.delete(room)){
            for(let socket of this.sockets){
                socket.leave(room)
            }
        }
    }

    public leaves(...rooms:string[]){
        for(let room of rooms){
            this.leave(room)
        }
    }

    public onSocketConnection(socket:Socket) {
        this.sockets.push(socket)
        
        for(let room of this.rooms){
            socket.join(room)
        }
    }

    public onSocketDisconnect(socket:Socket){
        const socketIndex = this.sockets.indexOf(socket)

        if(socketIndex == -1){
            return 
        }

        this.sockets.splice(socketIndex,1)
    }

    public emitToAll(ev:string,...args:any[]) : number {
        for(let socket of this.sockets){
            socket.emit(ev,...args)
        }
        return this.sockets.length
    }
}