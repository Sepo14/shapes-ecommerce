import prisma from "@/lib/prisma";
import { CartItemType } from "@/lib/types";

export default async function StockCheck(items:CartItemType[]) {

    const ItemsData = await prisma.product.findMany({where:{id:{in: items.map(item => item.product.id)}}})
    
    const hasStock = items.some(item => {
        const stockToCheck = ItemsData.find(i => i.id === item.product.id)?.stock

        if(stockToCheck! < item.quantity){return false}

        return true
    })

    return hasStock
}