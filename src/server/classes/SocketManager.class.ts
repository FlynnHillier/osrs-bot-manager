import { SocketBundle } from "../classes/SocketBundle.class";


export class SocketManager {
    private socketBundles: Map<string,SocketBundle> = new Map<string,SocketBundle>()
    
    constructor(){}
    
    public getBundle(username:string) {
        let bundle = this.socketBundles.get(username)

        if(!bundle){
            bundle = new SocketBundle(username)
            this.socketBundles.set(username,bundle)
        }

        return bundle
    }
}