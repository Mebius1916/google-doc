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
      publicApiKey={
        "pk_dev_2SsTLo7xH2p94sw1kg8WV3c0mQqEM9s760rk4xRpDP5iMglkLs9HB-bUzn7Srikn"
      }
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>

      </RoomProvider>
    </LiveblocksProvider>
  );
}
