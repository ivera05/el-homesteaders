import * as Dialog from "@radix-ui/react-dialog";
import { Product } from "@/app/types";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface ProductDrawerProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDrawer({ product, isOpen, onClose }: ProductDrawerProps) {
  if (!product) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal forceMount>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
             transition-opacity duration-300 ease-in-out
             data-[state=closed]:opacity-0
             data-[state=open]:opacity-100"
        />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 h-full w-full sm:max-w-md bg-white shadow-2xl
             [transition:transform_500ms_cubic-bezier(0.32,0.72,0,1)]
             data-[state=closed]:translate-x-full
             data-[state=open]:translate-x-0"
        >
          <div className="flex h-full flex-col overflow-y-scroll bg-white">
            {/* Header */}
            <div className="relative h-72 w-full bg-slate-100">
              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 rounded-full bg-white/80 p-2 text-stone-500 shadow-md hover:bg-white"
              >
                <FontAwesomeIcon icon={faX} className="w-1 h-1" />
              </button>
              <div className="flex h-full items-center justify-center text-slate-400">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col p-6">
              <Dialog.Title className="text-2xl font-bold text-slate-900">
                {product.title}
              </Dialog.Title>
              <p className="mt-1 text-xl font-semibold text-slate-700">
                ${product.price?.toFixed(2)}
              </p>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-slate-900">Description</h4>
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-10">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-white hover:bg-slate-800 transition-transform active:scale-95">
                  Add to Cart
                </button>
                <div className="mt-3 text-center">
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-4 w-full text-sm text-slate-500 hover:underline">
                    View Full Product Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
