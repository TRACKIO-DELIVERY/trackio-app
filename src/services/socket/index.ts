import { io } from "socket.io-client";

export const socket = io("http://192.168.0.19:3333", {
  path: "/track/socket.io",
  transports: ["websocket"],
});
