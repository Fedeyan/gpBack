import { config } from "dotenv";
import { Server } from "socket.io";
config()

export default function socketIoService(server) {
    const socketIoServer = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    })
    return socketIoServer
}