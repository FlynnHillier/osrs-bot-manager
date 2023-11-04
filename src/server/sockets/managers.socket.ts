import { SocketManager } from "../classes/SocketManager.class";
import { SocketBundle } from "../classes/SocketBundle.class";
import { socketHeartbeatEvents,socketEvents } from "../events/socket.events";

export const osrsPluginSocketManager = new SocketManager(socketEvents,socketHeartbeatEvents)

export const clientSocketBundle = new SocketBundle("client")