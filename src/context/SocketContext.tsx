"use client";

import { FC, PropsWithChildren, createContext } from "react";
import { io } from "socket.io-client";
const socket = io(process.env.NEXT_APP_WEBSOCKET_URL as string);
export const SocketContext = createContext(socket);

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
// "use client";
// import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
// import { io, SocketOptions, ManagerOptions, Socket } from "socket.io-client";
// // import { useAuth } from "./auth/Authorization";
// // import cookie from "js-cookie";
// // import { TOKENS_ENUM } from "@/utils/constants";

// type TSocket = null | Socket;
// const socket = io(
//   process.env.NEXT_APP_WEBSOCKET_URL as string
//   // {
//   //   transportOptions: {
//   //     polling: {
//   //       extraHeaders: {
//   //         Authorization: cookie.get(TOKENS_ENUM.ACCESS_TOKEN),
//   //       },
//   //     },
//   //   },
//   // } as Partial<ManagerOptions & SocketOptions>
// );
// export const SocketContext = createContext(socket);

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) console.log("you must use in socket provider");

//   return context;
// };

// export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
// //   const { user } = useAuth();
//   // const [socket, setSocket] = useState<TSocket>(null);
//   // const socketOptions: Partial<ManagerOptions & SocketOptions> = {
//   //   transportOptions: {
//   //     polling: {
//   //       extraHeaders: {
//   //         Authorization: cookie.get(TOKENS_ENUM.ACCESS_TOKEN), // 'Bearer h93t4293t49jt34j9rferek...'
//   //       },
//   //     },
//   //   },
//   // };

//   // useEffect(() => {
//   //   const access_token = cookie.get(TOKENS_ENUM.ACCESS_TOKEN);
//   //   console.log("IMPORTANT -0202022", user, access_token, socket);
//   //   if (user && access_token && !socket) {
//   //     // setSocket(
//   //     // );
//   //     // socket.emit("join", user.id);
//   //   }

//   //   return () => {
//   //     // socket.off("join");
//   //   };
//   // }, [user]);

// //   useEffect(() => {
// //     if (user) {
// //       socket.emit("join", user.id);
// //     }

// //     return () => {};
// //   }, []);
//     return (
//         <SocketC
//     )
// //   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };
