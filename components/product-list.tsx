
import DeleteProduct from "@/actions/delete_product";
import { ProductPriceString } from "@/lib/types"
import Image from "next/image"

export default function ProductList(
    { products, setterEdit, setterProduct }
        : { products: ProductPriceString[]; setterEdit: (arg: boolean) => void; setterProduct: (arg: ProductPriceString) => void }) {

    return (
        <>
            <div className="flex justify-between items-center pb-5">
                <h2 className="text-2xl">Product list</h2>
                <h2 className="bg-black text-white p-3">Products: {products.length}</h2>
            </div>
            <p className="md:hidden text-center text-(--enfasis) pb-5">In smaller divices this page losses some functionality</p>
            <div className="overflow-y-auto scrollbar-none max-h-125">
                <table className="table-auto border-collapse w-full text-nowrap">
                    <thead className="text-white">
                        <tr className="divide-x divide-white">
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Name</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Description</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Price</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Cat/Tag</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Stock</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Image</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-(--enfasis)/60 text-white">
                        {products.length > 0 ? products.sort((a, b) => a.category.localeCompare(b.category)).map((product) =>
                            <tr key={product.id} className="divide-x divide-y divide-white/30 text-gray-100">
                                <th className="p-1 font-light">{product.name}</th>
                                <th className="p-1 font-light">{product.description ? product.description : "No description given"}</th>
                                <th className="p-1 font-light">{product.price.toString()}€</th>
                                <th className="p-1 font-light">Cat:{product.category.toString()} <br /> Tag:<em>{product.tag ?? `No Tag`}</em></th>
                                <th className="p-1 font-light">{product.stock}</th>
                                <th className="p-1 font-light">
                                    <div className="flex justify-center">
                                        <Image src={product.image} alt={product.name} width={75} loading="eager" height={75} />
                                    </div>
                                </th>
                                <th className="p-1 font-light border-b border-white/30">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => { setterEdit(true); setterProduct(product) }}
                                            className={`py-2 px-4 w-1/2 justify-center text-sm border border-(--enfasis) bg-(--enfasis) text-(--background) 
                                                    uppercase gap-4 hover:bg-(--background) hover:text-(--enfasis) transition cursor-pointer`}>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => DeleteProduct(product.id)}
                                            className={`py-2 px-4 w-1/2 justify-center text-sm border border-(--enfasis) bg-(--enfasis) text-(--background) 
                                                    uppercase gap-4 hover:bg-(--background) hover:text-(--enfasis) transition cursor-pointer`}>
                                            Delete
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        ) : "There are no products on the database yet"}
                    </tbody>

                </table>
            </div>
        </>
    )
}