"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { getUsers, getDocuments } from "./action";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const documentId = params.documentId as string;
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); //这里的依赖项没用但是复合安全规范

  return (
    <LiveblocksProvider
      throttle={16} //实时协作的频率60hz
      //toRead
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room: documentId }),
        });
        return await response.json();
      }}
      //在数据库内根据当前在线协作users查找具体users信息
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
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
      //当前文档引用的其他文档信息
      resolveRoomsInfo={async ({ roomIds }) => {
        // 这个函数会在以下情况被自动调用：
        // 1. 用户输入新的文档引用时（比如输入 [[ 时）
        // 2. 文档内容发生变化时
        // 3. 被引用的文档信息更新时（通过 Liveblocks 的实时连接
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={documentId}
        initialStorage={{ leftMargin: 56, rightMargin: 56 }} //设置文档初始状态
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Room loading" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
