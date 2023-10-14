import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { BotInstance } from "../classes/BotInstance.class";
import { configuration } from "./config.init";
import { instanceEvents } from "../events/instance.events";

export const botInstanceMaster = new BotInstanceMaster(configuration.devious_jar_path,instanceEvents)

export async function initialiseBotInstanceMaster() : Promise<BotInstance[]> {
    return await botInstanceMaster.loadFromMongo()
}