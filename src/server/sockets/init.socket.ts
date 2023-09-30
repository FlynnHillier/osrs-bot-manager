import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: Number(process.env.PORT) || 8080 });