"use client"

import { CartItemType, ProductPriceString } from "@/lib/types"
import { createContext, useContext, useState } from "react"

type CartContextType = {
    items: CartItemType[]
    addProduct: (item: ProductPriceString) => void
    removeProduct: (id: string) => void
    removeOneProduct: (id: string) => void
    removeAll: () => void
    openCart: boolean
    setOpenCart: (value: boolean) => void
}

export const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {

    const [items, setItems] = useState<CartItemType[]>([])
    const [openCart, setOpenCart] = useState(false)

    function addProduct(product: ProductPriceString) {

        setItems(prev => {
            //comprobar si el item existe ya en el array
            const exist = prev.find(item => item.product.id === product.id)
            //si existe le añade +1 a quantity
            if (exist) {

                return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            //de lo contrario agarra el array anterior crea el producto y settea la quantity en 1
            return [...prev, { product, quantity: 1 }]
        })

    }

    function removeProduct(id: string) {
        //elimina el item que tenga el mismo id
        setItems(prev => prev.filter(item => item.product.id !== id))
    }

    function removeOneProduct(id: string) {
        setItems(prev => {
            //guardo el item que quiero cheakear
            const item = prev.find(item => item.product.id === id)
            //si no existe dejo el array como esta
            if (!item) return prev
            //si existe compruebo si quantity es mayo que 1 si es así le resta 1 a quantity
            if (item.quantity > 1) {
                return prev.map(item =>
                    item.product.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            }
            //de lo contrario elimina el item del array
            return prev.filter(item => item.product.id !== id)
        })
    }

    function removeAll(){
        setItems([])
    }

    return (
        <CartContext.Provider value={{ openCart, setOpenCart, items, addProduct, removeProduct, removeOneProduct, removeAll }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {

    const context = useContext(CartContext)

    if (!context) {
        throw new Error("useCart debe estar dentro de CartProvider")
    }

    return context
}