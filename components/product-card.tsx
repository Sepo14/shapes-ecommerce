"use client"

import { useCart } from "@/context/cart-context"
import { dm_mono } from "@/lib/fonts"
import { ProductPriceString } from "@/lib/types"
import Image from "next/image"
import { toast } from "sonner"

export default function ProductCard({ product }: { product: ProductPriceString }) {

    const { addProduct } = useCart()

    function handleProduct() {
        try {
            addProduct(product)
            toast.success('Product added')
        } catch {
            toast.error("Error adding product to cart")
        }
    }

    return (
        <>
            <div className="bg-(--enfasis)/10 w-70 h-120 flex flex-col items-center justify-between group relative min-w-60">
                {product.tag && <h2 className={`absolute top-0 right-0 py-2 px-4 bg-(--enfasis) text-white text-sm ${dm_mono.className}`}>{product.tag}</h2>}
                <div className="flex items-center h-full">
                    <div className="w-30 h-30 relative">
                        <Image src={product.image} alt={product.name} fill className="group-hover:scale-110 group-hover:rotate-10 duration-500 object-contain" />
                    </div>

                </div>
                <div className={`w-full relative`}>
                    {product.stock != 0 &&
                        <div className="absolute flex justify-center w-full h-10 bg-black text-white translate-y-0 pointer-fine:translate-y-full pointer-fine:group-hover:-translate-y-full pointer-coarse:-translate-y-full transition-all duration-300 hover:bg-(--enfasis)">
                            <button
                                onClick={() => handleProduct()}
                                className={`${dm_mono.className} cursor-pointer w-full`}>ADD TO CART
                            </button>
                        </div>
                    }
                    <div className={`relative  flex flex-col p-5 gap-2 ${product.stock != 0 ? "bg-(--background)" : "bg-gray-300"}`}>
                        <div>
                            <h2 className="text-xl">{product.name}</h2>
                        </div>
                        <div className={`relative flex justify-between ${dm_mono.className} text-sm`}>
                            <h2>{product.price.toString()}€</h2>
                            <h2>Stock: {product.stock}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}