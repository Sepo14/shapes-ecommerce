import ProductClient from "@/components/product-client";
import prisma from "@/lib/prisma";

export default async function ProductsPage() {

    const productsData = await prisma.product.findMany()
    const products = productsData.map(product => ({...product, price: product.price.toString()}))

    return(
        <div className="p-5 flex flex-col h-full">
        <ProductClient products={products}/>
        </div>
    )
}   