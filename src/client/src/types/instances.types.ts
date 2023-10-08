export interface InstanceState {
    user:{
        username:string
        proxy:string | null
    }
    client:{
        isActive:boolean
    }
}