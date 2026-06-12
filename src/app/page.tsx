"use client";

import { useEffect, useState } from "react";
import { teams } from "@/data/stickers";
import StickerCard from "@/components/StickerCard";

export default function Home() {
  const [found, setFound] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("found");
    if (saved) {
      setFound(JSON.parse(saved));
    }
  }, []);

  const toggleSticker = (id: number) => {
    let updated;

    if (found.includes(id)) {
      updated = found.filter((x) => x !== id);
    } else {
      updated = [...found, id];
    }

    setFound(updated);
    localStorage.setItem("found", JSON.stringify(updated));
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">World Cup 2026 Stickers</h1>

      {Object.entries(teams).map(([team, stickers]) => (
        <div key={team} className="mb-10">
          <div className="flex flex-wrap gap-2">
            <h2 className="text-2xl font-bold mb-4">{team}</h2>
            {stickers.map((sticker) => {
              const uniqueId = Number(`${team.charCodeAt(0)}${sticker}`);

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
