import Image from "next/image";

export default function ProductCard({
                                      imageUrl,
                                      name,
                                      price
                                    }: {
  imageUrl: string, name: string;
  price: number;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <h3 className="font-bold text-stone-700">{name}</h3>
      <p className="text-stone-500 text-sm mt-1">${price.toFixed(2)}</p>
      <button className="w-full mt-4 py-2 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700">
        Add to Cart
      </button>
    </div>
  );
}