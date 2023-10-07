import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { BotInstance } from "../classes/BotInstance.class";
import { configuration } from "./config.init";

export const botInstanceMaster = new BotInstanceMaster(configuration.devious_jar_path)

export async function initialiseBotInstanceMaster() : Promise<BotInstance[]> {
    return await botInstanceMaster.loadFromMongo()
}