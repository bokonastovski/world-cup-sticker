type Props = {
  number: number;
  found: boolean;
  onClick: () => void;
};

export default function StickerCard({ number, found, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-7 h-7
        text-xs
        flex items-center justify-center
        rounded-md
        font-semibold
        transition
        ${found ? "bg-green-500 text-white" : "bg-red-800 text-white"}
      `}
    >
      {number}
    </button>
  );
}
