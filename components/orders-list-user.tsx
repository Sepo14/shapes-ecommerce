"use client"

import { dm_mono } from "@/lib/fonts"
import { UserOrderData } from "@/lib/types"

export default function OrderList({ orders }: { orders: UserOrderData[] }) {

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col items-start">
                <h2 className="text-4xl border-b border-gray-300">Orders</h2>
            </div>
            <div className="scrollbar-none overflow-y-auto max-h-100 min-h-">
                <table className={`table-auto border-collapse w-full ${dm_mono.className} ${orders.length > 0 ? "" : "hidden"}`}>
                    <thead className="text-white">
                        <tr className="divide-x divide-white">
                            <th className="font-light text-xl top-0 p-1 text-nowrap sticky bg-(--color-primary)">Order Nº</th>
                            <th className="font-light text-xl top-0 p-1 text-nowrap sticky bg-(--color-primary)">Items</th>
                            <th className="font-light text-xl top-0 p-1 text-nowrap sticky bg-(--color-primary)">Cost / Amount</th>
                            <th className="font-light text-xl top-0 p-1 text-nowrap sticky bg-(--color-primary)">Total Items</th>
                            <th className="font-light text-xl top-0 p-1 text-nowrap sticky bg-(--color-primary)">Total Cost</th>
                            <th className="font-light text-xl top-0 p-1 text-nowrap sticky bg-(--color-primary)">Buy Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-(--enfasis)/60 text-white">
                        {orders.length > 0 ? orders.map((order) =>
                            <tr key={order.id} className="divide-x divide-y divide-white/30 text-gray-100 text-center">
                                <td className="p-1 font-light">{order.orderNumber}</td>
                                <td className="font-light divide-y divide-white/30">
                                    {order.products.map((product) =>
                                        <div className="p-1" key={product.id}>
                                            <p>{product.product.name}</p>
                                        </div>
                                    )}
                                </td>
                                <td className="font-light divide-y divide-white/30">
                                    {order.products.map((product) =>
                                        <div className="p-1" key={product.id}>
                                            <p>{product.cost} € / {product.quantity}</p>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {order.products.reduce((sum, product) => sum + product.quantity, 0)}
                                </td>
                                <td className="p-1 font-light">
                                    {order.products.reduce((sum, product) => sum + parseFloat(product.cost) * product.quantity, 0).toFixed(2)} €
                                </td>
                                <td className="p-1 font-light border-b-white/30 border-b">{order.createdAt.toLocaleDateString()}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>
                {orders.length > 0 ? "" : <h2 className="text-2xl py-5">You have not bought anything yet</h2>}
            </div>
            <div className="flex gap-2">
                <div className="flex flex-col items-center bg-(--color-primary) p-2 justify-center">
                    <h2 className={`text-white text-xl ${dm_mono.className}`}>Orders</h2>
                    <h2 className={`text-white text-xl ${dm_mono.className}`}>{orders.length}</h2>
                </div>
                {orders.length>0 ? <><div className="flex flex-col items-center bg-(--color-primary) p-2 text-center justify-center">
                    <h2 className={`text-white text-xl ${dm_mono.className}`}>Total Items</h2>
                    <h2 className={`text-white text-xl ${dm_mono.className}`}>
                        {orders.reduce((total, order) => total + order.products.reduce((sum, product) => sum + product.quantity, 0),0)}
                    </h2>
                </div>
                <div className="flex flex-col items-center bg-(--color-primary) justify-center p-2">
                    <h2 className={`text-white text-xl ${dm_mono.className}`}>Spent</h2>
                    <h2 className={`text-white text-xl ${dm_mono.className}`}>
                        {orders.reduce((total, order) => total + order.products.reduce((totalItem, item)=> totalItem + Number(item.cost) * item.quantity,0),0).toFixed(2)}€
                    </h2>
                </div></> : ""}
            </div>
        </div>
    )
}