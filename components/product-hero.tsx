import { dm_mono } from "@/lib/fonts"
import { ProductPriceString } from "@/lib/types"
import Image from "next/image"

export default function ProductHero({ product }: { product: ProductPriceString }) {

    return (
        <>
            <div className="w-4/10 h-1/2 flex flex-col items-center justify-between group relative border-gray-100/20 border pb-5 bg-(--enfasis)/5 min-w-80">
                <div className="flex items-center h-full">
                    <a href="#collection">
                    <div className="w-60 h-60 relative animate-float">
                        <Image src={product.image} alt={product.name} fill loading="eager" className="blur-xs opacity-30 group-hover:scale-110 transition duration-500" />
                        <Image src={product.image} alt={product.name} fill loading="eager" className="group-hover:scale-110 transition duration-500" />
                    </div>
                    </a>
                </div>
                <div className="flex justify-around w-full items-center">
                    <h2 className="text-2xl text-white">{product.name}</h2>
                    <h2 className={`text-[#DCB291] ${dm_mono.className}`}>{product.price}€</h2>
                </div>
            </div>
        </>
    )
}