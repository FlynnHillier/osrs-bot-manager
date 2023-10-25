import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { BotInstance } from "../classes/BotInstance.class";
import { instanceEvents } from "../events/instance.events";

export const botInstanceMaster = new BotInstanceMaster(instanceEvents)

export async function initialiseBotInstanceMaster() : Promise<BotInstance[]> {
    return await botInstanceMaster.loadFromMongo()
}