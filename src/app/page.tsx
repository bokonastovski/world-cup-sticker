"use client";

import { useEffect, useState } from "react";
import { teams } from "@/data/stickers";
import StickerCard from "@/components/StickerCard";

export default function Home() {
  const [found, setFound] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("found");
    if (saved) {
      setFound(JSON.parse(saved));
    }
  }, []);

  const toggleSticker = (id: string) => {
    let updated: string[];

    if (found.includes(id)) {
      updated = found.filter((x) => x !== id);
    } else {
      updated = [...found, id];
    }

    setFound(updated);
    localStorage.setItem("found", JSON.stringify(updated));
  };

  return (
    <main className="p-2">
      {Object.entries(teams).map(([team, stickers]) => (
        <div key={team} className="grid grid-cols-[50px_1fr] items-center mb-1">
          {/* Team label */}
          <h2 className="text-sm font-bold">{team}</h2>

          {/* Stickers grid */}
          <div className="grid grid-cols-10 gap-1">
            {stickers.map((sticker) => {
              const uniqueId = `${team}-${sticker}`;

              return (
                <StickerCard
                  key={uniqueId}
                  number={sticker}
                  found={found.includes(uniqueId)}
                  onClick={() => toggleSticker(uniqueId)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
