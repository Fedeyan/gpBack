import { config } from "dotenv";
import { Server } from "socket.io";
config();

export default function socketIoService(server) {
  const socketIoServer = new Server(server, {
    cors: {
      origin: "https://gpback-production-8754.up.railway.app/",
      credentials: true,
    },
  });
  return socketIoServer;
}
