import { BotInstanceMaster } from "../classes/BotInstanceMaster";
import { BotInstance } from "../types/BotInstance.types";

export const botInstanceMaster = new BotInstanceMaster("")

export async function initialiseBotInstanceMaster() : Promise<BotInstance[]> {
    return await botInstanceMaster.loadFromMongo()
}