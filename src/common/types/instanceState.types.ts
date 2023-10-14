export interface InstanceState {
    user:{
        username:string
        proxy:string | null
    }
    client:{
        isBooted:boolean
        isSocketConnected:boolean
    }
}