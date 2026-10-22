"use client"


import { useCart } from "@/context/cart-context"
import { dm_mono } from "@/lib/fonts"
import { CartItemType } from "@/lib/types"
import Image from "next/image"
import { IoMdAdd, IoMdRemove } from "react-icons/io"



export default function CartItem({ cartItem }: { cartItem: CartItemType }) {

    const { addProduct , removeOneProduct } = useCart()

    return (
        <div className="flex flex-col items-center border-b border-b-gray-400/50">
            <h2 className="text-center bg-(--color-primary) py-1 text-white w-full uppercase">{cartItem.product.name}</h2>
            <div className="flex justify-between w-full bg-(--enfasis)/15">
                <div className="w-15 h-15 relative m-2">
                    <Image src={cartItem.product.image} alt={cartItem.product.name} fill className="group-hover:scale-110 group-hover:rotate-10 duration-500 object-contain" />
                </div>
                <div className="flex items-center justify-evenly mr-2 w-8/10">
                    <p className={`text-center text-md ${dm_mono.className} text-gray-600`}>{cartItem.product.price}€</p>
                    <div className="flex items-center">
                        <button onClick={()=> addProduct(cartItem.product)} className="bg-black hover:bg-(--enfasis) transition cursor-pointer">
                            <IoMdAdd className="size-6 text-white" />
                        </button>
                        <p className={`w-10 text-center text-lg ${dm_mono.className} text-(--enfasis) leading-0`}>{cartItem.quantity}</p>
                        <button className="bg-black hover:bg-(--enfasis) transition cursor-pointer">
                            <IoMdRemove onClick={() => removeOneProduct(cartItem.product.id)} className="size-6 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}