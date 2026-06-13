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

  const totalStickers = Object.values(teams).reduce(
    (sum, stickers) => sum + stickers.length,
    0,
  );

  const missingStickers = totalStickers - found.length;

  return (
    <main className="p-2">
      {/* Counter */}
      <div className="sticky top-0 z-50 bg-white border-b mb-3 p-3">
        <h1 className="text-xl font-bold">
          Missing Stickers: {missingStickers}
        </h1>
        <p className="text-sm text-gray-500">
          Found: {found.length} / {totalStickers}
        </p>
      </div>

      {Object.entries(teams).map(([team, stickers]) => (
        <div key={team} className="grid grid-cols-[50px_1fr] items-center mb-1">
          <h2 className="text-sm font-bold">{team}</h2>

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
