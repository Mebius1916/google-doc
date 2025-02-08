"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const documentId = params.documentId as string;
  return (
    <LiveblocksProvider
      throttle={16} //实时协作的频率60hz
      authEndpoint="/api/liveblock-auth" //导入鉴权配置
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
