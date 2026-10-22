
import OrderList from "@/components/orders-list";
import prisma from "@/lib/prisma";
import { serializeOrders } from "@/lib/types";

export default async function OrdersPage() {

    const ordersData = await prisma.order.findMany({ include: { products: { include: { product: true } }, user: true } })

    return (
        <div className="p-5 flex flex-col h-full gap-5">
            <OrderList orders={serializeOrders(ordersData)} />
        </div>
    )
}