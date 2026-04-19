import Image from "next/image";

export default function ProductCard({ imageUrl, name, price, onSelect, onAddToCart }: {
  imageUrl: string, name: string; price: number; onSelect: () => void; onAddToCart: () => void;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          className="object-cover"
          onClick={onSelect}
        />
      </div>

      <h3 className="font-bold text-stone-700">
        <button
          type="button"
          onClick={onSelect}
          className="text-left hover:underline"
        >
          {name}
        </button>
      </h3>

      <p className="text-stone-500 text-sm mt-1">
        <button
          type="button"
          onClick={onSelect}
          className="text-left hover:underline"
        >
          ${price.toFixed(2)}
        </button>
      </p>

      <button
        type="button"
        onClick={onAddToCart}
        className="mt-auto flex w-full items-center justify-center rounded-lg bg-stone-800 px-4 py-2 text-sm text-white hover:bg-stone-700"
      >
        Add to Cart
      </button>
    </div>
  );
}