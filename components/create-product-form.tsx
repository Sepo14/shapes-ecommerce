"use client"

import CreateProduct from "@/actions/create_product"
import { useState } from "react"
import { IoMdArrowDropdownCircle } from "react-icons/io"
import { toast } from "sonner"

export default function CreateProductForm() {

    const [open, setOpen] = useState(false)

    async function handleAction(e:FormData) {
        
        try{
            await CreateProduct(e)

            toast.success("Product created successfully")
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("something went wrong")
            }
        }

    }

    return (
        <div className="overflow-hidden ">
            <button className="text-2xl flex items-center gap-2 group text-white hover:bg-(--enfasis) bg-black/90 px-4 py-2 cursor-pointer transition"  onClick={() => setOpen(!open)}>Add new product
                <IoMdArrowDropdownCircle  className={`transition duration-300 ${open ? "rotate-0" : "rotate-90"}`} />
            </button>

            <div className={`transition-all duration-500 ease-in-out ${open ? "max-h-100" : "max-h-0"}`}>
                <form action={handleAction} className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <input type="text" placeholder="Name" name="name" className="bg-white border hover:border-(--enfasis) h-fit transition outline-none" required />
                    <textarea name="description" placeholder="Description*" className="bg-white border hover:border-(--enfasis) transition outline-none col-span-2"></textarea>
                    <input type="number" name="price" step="0.01" placeholder="Price ej.10,00" className="bg-white border h-fit hover:border-(--enfasis) transition outline-none" required />
                    <input type="number" name="stock" placeholder="Stock*" className="bg-white border h-fit hover:border-(--enfasis) transition outline-none" />
                    <select name="category" className="bg-white border hover:border-(--enfasis) transition h-fit outline-none" defaultValue={""} required>
                        <option value="" disabled>CATEGORY</option>
                        <option value="TRIANGLE">TRIANGLE</option>
                        <option value="QUADRILATERAL">QUADRILATERAL</option>
                        <option value="POLYGON">POLYGON</option>
                        <option value="CURVED">CURVED</option>
                    </select>
                    <select name="tag" className="bg-white border hover:border-(--enfasis) h-fit transition outline-none" defaultValue={""}>
                        <option value="" disabled>TAG</option>
                        <option value="HOT">HOT</option>
                        <option value="NEW">NEW</option>
                        <option value="DISCOUNT">DISCOUNT</option>
                        <option value="POPULAR">POPULAR</option>
                    </select>
                    <input type="file" accept=".svg,image/svg+xml" name="image" className="bg-white border h-fit hover:border-(--enfasis) transition outline-none max-w-50" required />
                    <button
                        className={`py-3 px-6 justify-center text-sm border border-(--enfasis) 
                        uppercase w-fit gap-4 hover:bg-(--enfasis) hover:text-white transition cursor-pointer`}
                        type="submit">SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}