"use client"

import { ProductPriceString } from "@/lib/types"
import CreateProductForm from "./create-product-form"
import EditProductForm from "./edit-product-form"
import ProductList from "./product-list"
import { useState } from "react"

export default function ProductClient({ products }: { products: ProductPriceString[] }) {

    const [switchForm, setSwitchForm] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductPriceString | null>(null)

    return (
        <>
            <div className={`${!switchForm ? "max-h-250" : "max-h-0 opacity-0  pointer-events-none"} duration-300 transition-all`}>
                <CreateProductForm />
            </div>
            <div className={`${switchForm ? "max-h-250" : "max-h-0 opacity-0 pointer-events-none"} duration-300 transition-all`}>
                <EditProductForm state={switchForm} setter={setSwitchForm} productData={selectedProduct} />
            </div>
            <ProductList products={products} setterEdit={setSwitchForm} setterProduct={setSelectedProduct} />
        </>
    )
}