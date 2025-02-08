"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { getUsers } from "./action";
import { toast } from "sonner";
type User = {id: string; name: string; avatar:string}
export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const documentId = params.documentId as string;
  const [users,setUsers] = useState<User[]>([]);
  const fetchUsers = useMemo(
    () => async () =>{
      try{
        const list = await getUsers();
        setUsers(list);
      } catch{
        toast.error("Failed to fetch users")
      }
    },
    [],
  );

  useEffect(()=>{
    fetchUsers();
  },[fetchUsers]);//这里的依赖项没用但是复合安全规范

  return (
    <LiveblocksProvider
      throttle={16} //实时协作的频率60hz
      //toRead
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;
        
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });
      
        return await response.json();
      }}
      //在数据库内根据当前在线协作users查找具体users信息
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        )
      }}
      
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;
        
        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filteredUsers.map((user) => user.name);
      }}
      resolveRoomsInfo={()=>[]}
    

    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Room loading"/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
