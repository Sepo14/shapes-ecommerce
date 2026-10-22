"use client"

import { useCart } from "@/context/cart-context"
import { dm_mono } from "@/lib/fonts"
import { MdClose } from "react-icons/md"
import CartItem from "./cart-item"
import BuyItemsCart from "@/actions/buy_items_cart"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export default function Cart() {

    const { openCart, setOpenCart, items ,removeAll } = useCart()

    const total = items.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0).toFixed(2)

    const router = useRouter()

    //handler para la compra "TENGO QUE USAR MAS DE ESTOS" si se ejecuta la compra elimina el carrito
    const handleBuy = async () => {
        try {
            await BuyItemsCart(items)
            removeAll()
            setOpenCart(false)
            router.refresh()
            toast.success("Thanks for buying")
        } catch (error){
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("something went wrong")
            }
        }
    }

    return (
        <aside className={`fixed top-0 mt-21.75 right-0 h-screen w-80 bg-(--background) border-l-black border-l z-50 flex flex-col justify-between pb-20 transition-all duration-300 ${openCart ? "translate-x-0" : "translate-x-full"}`}>
            <div>
                <div className="w-full flex justify-between items-center border-b border-gray-400/50">
                    <h2 className={`${dm_mono.className} justify-self-center text-center w-full uppercase`}>Shopping Cart</h2>
                    <button className="group cursor-pointer border-l hover:bg-(--enfasis) p-2 border-gray-400/50 transition"
                        onClick={() => setOpenCart(!openCart)}>
                        <MdClose className="size-8 group-hover:text-white transition" />
                    </button>
                </div>
                <div className="flex flex-col">
                    {items.map((item) => { return <CartItem cartItem={item} key={item.product.id} /> })}
                </div>
            </div>
            <div className="flex flex-col">
                <h2 className={`${dm_mono.className} justify-self-center text-center w-full uppercase py-2 border-t border-gray-400/50`}>Total cost: {items ? total.toString() : 0} €</h2>
                <button onClick={handleBuy}
                    className={`${items.length !== 0 ? "bg-black hover:bg-(--enfasis)" : "bg-gray-500 pointer-events-none"} text-white p-5 pb-6  transition text-2xl cursor-pointer ${dm_mono.className}`}>
                    BUY
                </button>
            </div>
        </aside>
    )
}