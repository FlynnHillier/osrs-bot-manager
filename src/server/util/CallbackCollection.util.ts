export class CallbackCollection<T extends (...args:any[]) => any = (...args:any[])=>any> {
    public events : Set<T> = new Set()
    
    constructor(...cbs:T[]){
        this.events = new Set(cbs)
    }

    public register(cb:T) : () => void {
        this.events.add(cb)

        return () => {
            this.deregister(cb)
        }
    }

    public deregister(cb:T) : boolean {
        return this.events.delete(cb)
    }


    public inherit(callbackCollection:CallbackCollection<T>) {
        for (let e of callbackCollection.events){
            this.register(e)
        }
    }


    public call(...args:Parameters<T>){
        for(let e of this.events){
            e(...args)
        }
    }
}

//converts an object of value pairs <k,v> to object of pairs <k,v[]>. Note: if v has multiple possible types,
export type keysToArray<T extends {[key:string]:any}> = {[key in keyof T]:T[keyof T][]}