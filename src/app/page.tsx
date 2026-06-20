"use client";

import { useEffect, useState } from "react";
import { teams } from "@/data/stickers";
import StickerCard from "@/components/StickerCard";

const albumTotals: Record<string, number> = {
  FIFA_World_Cup_2006: 597,
  UEFA_Euro_2008: 535,
  UEFA_Euro_2012: 540,
  UEFA_Euro_2016: 680,
  UEFA_Euro_2020: 678,
  FIFA_World_Cup_2022: 670,
  UEFA_Euro_2024: 728,
  FIFA_World_Cup_2026: 980,
};

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
    <main className="p-3">
      {/* Album counters */}
      <div className="mb-5">
        {Object.entries(teams).map(([album, stickers]) => {
          const missing = stickers.filter(
            (sticker) => !found.includes(`${album}-${sticker}`),
          ).length;

          return (
            <h2 key={album} className="text-sm font-bold">
              {album.replaceAll("_", " ")} missing stickers {missing} out of{" "}
              {albumTotals[album]}
            </h2>
          );
        })}
      </div>

      {/* Stickers */}
      {Object.entries(teams).map(([album, stickers]) => {
        const missing = stickers.filter(
          (sticker) => !found.includes(`${album}-${sticker}`),
        ).length;

        return (
          <div key={album} className="mb-4">
            <h2 className="text-sm font-bold mb-2">
              {album.replaceAll("_", " ")}
            </h2>

            {missing === 0 ? (
              <button
                disabled
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-bold cursor-not-allowed"
              >
                Album is full ✅
              </button>
            ) : (
              <div className="flex flex-wrap gap-1">
                {stickers.map((sticker) => {
                  const uniqueId = `${album}-${sticker}`;

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
            )}
          </div>
        );
      })}
    </main>
  );
}
