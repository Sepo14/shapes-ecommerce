"use client"

import { useCart } from "@/context/cart-context";
import { dm_mono } from "@/lib/fonts";
import { GrCart } from "react-icons/gr";

export default function CartButton() {

    const cart = useCart()

    return (
        <>
            <button
                type="button"
                onClick={() => cart.setOpenCart(!cart.openCart)}
                className={`py-3 px-6 bg-(--background) flex items-center text-sm border-(--enfasis) ${dm_mono.className} border border-(--color-dark) uppercase w-fit gap-2 hover:bg-(--enfasis) cursor-pointer hover:text-white transition
                ${cart.items.length>0 ? "" : ""}`}
            >
                Cart
                <div className={`rounded-full p-2 ${cart.items.length>0 ? "bg-(--enfasis) text-white" : ""} transition-all`}>
                    <GrCart />
                </div>
            </button>
        </>
    )
}