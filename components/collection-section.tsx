"use client"

import { ProductPriceString } from "@/lib/types"
import ProductCard from "./product-card"
import { dm_mono } from "@/lib/fonts"
import { useState } from "react"

export default function CollectionSection({ productData }: { productData: ProductPriceString[] }) {

    const [productsArray, setProductsArray] = useState(productData)

    return (
        <>
            <div className="flex gap-2 my-5 flex-wrap">
                <button className={`py-2 px-4 bg-(--color-dark) text-white flex justify-center text-sm ${dm_mono.className} uppercase w-fit gap-4 hover:bg-(--enfasis)  transition`}
                    onClick={() => setProductsArray(productData)}
                >
                    ALL
                </button>
                <button className={`py-2 px-4 bg-(--color-dark) text-white flex justify-center text-sm ${dm_mono.className} uppercase w-fit gap-4 hover:bg-(--enfasis)  transition`}
                    onClick={() => setProductsArray(productData.filter((product) => product.category === "TRIANGLE"))}
                >
                    Triangular
                </button>
                <button className={`py-2 px-4 bg-(--color-dark) text-white flex justify-center text-sm ${dm_mono.className} uppercase w-fit gap-4 hover:bg-(--enfasis)  transition`}
                    onClick={() => setProductsArray(productData.filter((product) => product.category === "QUADRILATERAL"))}
                >
                    Quadrilateral
                </button>
                <button className={`py-2 px-4 bg-(--color-dark) text-white flex justify-center text-sm ${dm_mono.className} uppercase w-fit gap-4 hover:bg-(--enfasis)  transition`}
                    onClick={() => setProductsArray(productData.filter((product) => product.category === "POLYGON"))}
                >
                    Poligon
                </button>
                <button className={`py-2 px-4 bg-(--color-dark) text-white flex justify-center text-sm ${dm_mono.className} uppercase w-fit gap-4 hover:bg-(--enfasis)  transition`}
                    onClick={() => setProductsArray(productData.filter((product) => product.category === "CURVED"))}
                >
                    Curved
                </button>

            </div>

            <div className="flex pt-2 divide-x divide-gray-500/50 overflow-x-auto">
                {productsArray.map((product) => {
                    return <ProductCard key={product.id} product={product} />
                })}
            </div>
        </>
    )
}