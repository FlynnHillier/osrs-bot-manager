export interface InstanceState {
    user:{
        username:string
        proxy:string | null
    }
    client:{
        queue:{
            isQueued:boolean,
            position:number
        }
        isActive:boolean
        isSocketConnected:boolean
    }
}