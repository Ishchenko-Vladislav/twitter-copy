import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";
export async function GET(req: NextRequest, res: NextResponse) {
  const s = new Server(3000, {});
  s.on("connection", (socket) => {
    console.log("user COnected");
  });
  return res;
  //   if (!res.socket || !res.socket.server.io) {
  //     const io = new Server(res.socket.server);
  //     io.on("connection", (socket) => {
  //       // socket.on('disconnect', () => {
  //       // })
  //     });
  //   }
  //   return res;
  //   const io = new Server({
  //     cors: {
  //       origin: "http://localhost:3000",
  //     },
  //   });
  //   console.log("SOCKET", req);
  //   return NextResponse.json(io);
}
