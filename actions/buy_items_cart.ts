"use server"

import { auth } from "@/auth";
import { CartItemType } from "@/lib/types";
import StockCheck from "./stock_check";
import prisma from "@/lib/prisma";

export default async function BuyItemsCart(cart: CartItemType[]) {

    //compruebo si hay session para poder hacer el pedido
    const session = await auth()
    if (!session?.user.id) {
        throw new Error("No session")
    }
    // si el carrito esta vacio no hace nada
    if (cart.length === 0) {
        return
    }
    //comprueba que hay stock suficiente de los objetos del array
    const stockState = await StockCheck(cart)
    if (!stockState) {
        throw new Error("No Stock")
    }

    await prisma.order.create({
        data: {
            userId: session.user.id,
            products: {
                create: cart.map((item) => ({
                    quantity: item.quantity,
                    cost: item.product.price,
                    productId: item.product.id,
                }))
            }
        },include:{
            products:{
                include:{
                    product:true
                }
            }
        }
    })

    


}