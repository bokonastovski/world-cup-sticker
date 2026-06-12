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
      w-12 h-12 rounded-lg font-bold
      ${found ? "bg-green-500" : "bg-red-500"}
      text-white
      `}
    >
      {number}
    </button>
  );
}
