"use client";

import { CartDrawerProps } from "@/app/lib/types/carts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

export default function CartDrawer({ cart, isOpen, onClose }: CartDrawerProps) {
  const items = cart?.items ?? [];

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal forceMount>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
            transition-opacity duration-300 ease-in-out
            data-[state=closed]:pointer-events-none
            data-[state=closed]:opacity-0
            data-[state=open]:pointer-events-auto
            data-[state=open]:opacity-100"
        />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 h-full w-full sm:max-w-md bg-white shadow-2xl
            [transition:transform_500ms_cubic-bezier(0.32,0.72,0,1)]
            data-[state=closed]:translate-x-full
            data-[state=open]:translate-x-0"
        >
          <div className="flex h-full flex-col overflow-y-auto bg-white">
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
              <Dialog.Title className="text-xl font-semibold text-stone-900">
                My Cart
              </Dialog.Title>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                aria-label="Close cart drawer"
              >
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 px-6 py-5">
              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-200 p-6 text-center text-stone-500">
                  Cart is empty.
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const lineTotal = item.quantity * item.product.price;

                    return (
                      <li
                        key={item.id}
                        className="flex gap-4 rounded-xl border border-stone-200 p-4"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            width={100}
                            height={100}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate font-medium text-stone-900">
                                {item.product.title}
                              </p>
                              <p className="text-sm text-stone-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="shrink-0 font-semibold text-stone-900">
                              ${lineTotal.toFixed(2)}
                            </p>
                          </div>

                          <p className="mt-2 text-sm text-stone-500">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-stone-200 px-6 py-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Subtotal</span>
                  <span>${cart?.subtotal.toFixed(2) ?? "0.00"}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-stone-900">
                  <span>Total</span>
                  <span>${cart?.total.toFixed(2) ?? "0.00"}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-stone-900 px-6 py-4 text-white hover:bg-stone-800 transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
