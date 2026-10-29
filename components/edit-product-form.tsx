"use client"

import EditProduct from "@/actions/edit_products";
import { Category, Tag } from "@/app/generated/prisma/enums";
import { ProductPriceString } from "@/lib/types";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast } from "sonner";

export default function EditProductForm({ state, setter, productData }: { setter: (arg: boolean) => void; state: boolean; productData: ProductPriceString | null }) {

    const [formData, setFormData] = useState<ProductPriceString | null>(productData)

    if (productData?.id !== formData?.id) {
        setFormData(productData)
    }

    async function handleAction(e:FormData) {
        try{
            await EditProduct(e)
            toast.success("Changes saved")
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("something went wrong")
            }
        };
    }

    return (
        <div className="overflow-hidden">
            <button className="text-2xl flex items-center gap-2 border-b border-gray-300 group" onClick={() => setter(!state)}>Edit product
                <IoCloseCircleSharp className={`group-hover:text-(--enfasis)`} />
            </button>

            <div className={`transition-all duration-500 ease-in-out ${state ? "max-h-100" : "max-h-0"}`}>
                <form action={handleAction} className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-2 my-2">
                    <input type="text" placeholder="Name" name="name" value={formData?.name ?? ""} onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
                        className="bg-white border hover:border-(--enfasis) transition outline-none" required />
                    <textarea name="description" value={formData?.description ?? ""} placeholder="Description*" onChange={(e) => setFormData({ ...formData!, description: e.target.value })}
                        className="bg-white border hover:border-(--enfasis) transition outline-none col-span-2"></textarea>
                    <input type="number" name="price" value={formData?.price ?? ""} step="0.01" placeholder="Price ej.10,00" onChange={(e) => setFormData({ ...formData!, price: e.target.value })}
                        className="bg-white border hover:border-(--enfasis) transition outline-none" required />
                    <input type="number" name="stock" value={formData?.stock ?? ""} placeholder="Stock*" onChange={(e) => setFormData({ ...formData!, stock: parseInt(e.target.value) })}
                        className="bg-white border hover:border-(--enfasis) transition outline-none" />
                    <select name="category" onChange={(e) => setFormData({ ...formData!, category: e.target.value as Category })}
                        className="bg-white border hover:border-(--enfasis) transition outline-none" value={formData?.category ?? ""} required>
                        <option value="" disabled>TYPE</option>
                        <option value="TRIANGLE">TRIANGLE</option>
                        <option value="QUADRILATERAL">QUADRILATERAL</option>
                        <option value="POLYGON">POLYGON</option>
                        <option value="CURVED">CURVED</option>
                    </select>
                    <select name="tag" onChange={(e) => setFormData({ ...formData!, tag: e.target.value as Tag })}
                        className="bg-white border hover:border-(--enfasis) transition outline-none" value={formData?.tag ?? ""}>
                        <option value="">TAG</option>
                        <option value="HOT">HOT</option>
                        <option value="NEW">NEW</option>
                        <option value="DISCOUNT">DISCOUNT</option>
                        <option value="POPULAR">POPULAR</option>
                    </select>
                    <input type="file" accept=".svg,image/svg+xml" name="image"
                        className="bg-white border hover:border-(--enfasis) transition outline-none w-50" />
                    <input type="hidden" name="id" value={formData?.id ?? ""} onChange={(e) => setFormData({ ...formData!, id: e.target.value })} />
                    <button className={`py-3 px-6 justify-center text-sm border border-(--enfasis) uppercase w-fit gap-4 hover:bg-(--enfasis) hover:text-white transition cursor-pointer`}
                        type="submit"
                        onClick={() => setter(!state)}
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}