"use client";

import { useState } from "react";

import InstagramConnectCard from "@/components/instagram/InstagramConnectCard";
import EmptyInstagram from "@/components/instagram/EmptyInstagram";

export default function InstagramPage() {
  const [connected] = useState(false);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Instagram
          </h1>

          <p className="mt-2 text-slate-400">
            Connect your Instagram Professional account.
          </p>
        </div>

      </div>

      <InstagramConnectCard
        connected={connected}
        onConnect={() => alert("Next step: Meta OAuth")}
      />

      {!connected && <EmptyInstagram />}

    </div>
  );
}