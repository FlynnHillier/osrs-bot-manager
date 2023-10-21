import {BotInstance} from "../classes/BotInstance.class"
import { ExcludeMethods } from "./util.types"
import { CallbackCollection } from "../util/CallbackCollection.util"

//event callback to be fired when some value changes.
export type InstanceEvent = (instance:BotInstance)=>any

//takes a generic type U, which is an object containing key value pairs <string,()=>void> . Types object of same keys, with CallbackCollection<instanceEvent> values instead.
export type unwrappedCallbackCollections<U extends {[key:string | symbol]:()=>void}> = {[key in keyof U]:CallbackCollection<InstanceEvent>}

//a 'snapshot' of client state to be stored within database with the ability for re-loading at a later time.
export type BotInstanceSnapshot = ExcludeMethods<Omit<BotInstance,"client">>