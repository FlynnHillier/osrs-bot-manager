import { BotInstance } from "./BotInstance.class"


export class InstanceBootQueue {
    private queue : BotInstance[] = []


    constructor(){
        setInterval(this.next.bind(this),10000)    
    }

    public next(count:number = 2) : BotInstance[] {
        if(this.isEmpty()){
            return []
        }

        const front = this.queue.slice(0,count)
        this.queue = this.queue.slice(count)
        this.updatePositions()


        front.forEach(instance=>{instance.client.callbacks.queueFront()})

        return front
    }


    public enqueue(
        instance:BotInstance
    ) : number {
        const existingEntry = this.queue.find(i => i == instance)
        if(existingEntry != null){
            return this.queue.indexOf(existingEntry)
        }

        const pos = this.queue.push(instance) - 1
        instance.client.callbacks.enqueued(pos)
        return pos
    }

    private updatePositions(){
        for(let [indx,instance] of this.queue.entries()){
            instance.client.callbacks.queueMove(indx)
        }
    }


    public isEmpty() : boolean {
        return this.queue.length == 0
    }
}