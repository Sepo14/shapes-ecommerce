"use client"
import { dm_mono } from "@/lib/fonts";
import { OrderData } from "@/lib/types";
import { useState } from "react";

export default function OrderList({ orders }: { orders: OrderData[]; }) {

    const [ordersArray, setOrdersArray] = useState(orders)

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl">Order list</h2>
                    <div className="flex gap-2">
                        <button className={`py-2 px-4 text-(--enfasis) cursor-pointer border flex justify-center text-sm ${dm_mono.className} hover:bg-(--enfasis) hover:text-white transition`}
                            onClick={() => setOrdersArray([...orders].sort((a, b) => b.products.reduce((sum, product) => sum + parseFloat(product.cost.toString()) * product.quantity, 0) - a.products.reduce((sum, product) => sum + parseFloat(product.cost.toString()) * product.quantity, 0)))}
                        >
                            COST
                        </button>
                        <button className={`py-2 px-4 text-(--enfasis) cursor-pointer border flex justify-center text-sm ${dm_mono.className} hover:bg-(--enfasis) hover:text-white transition`}
                            onClick={() => setOrdersArray([...orders].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()))}
                        >
                            DATE
                        </button>
                    </div>
                </div>
                <h2 className="bg-black text-white p-3">Orders: {orders.length}</h2>
            </div>
            <p className="md:hidden text-center text-(--enfasis)">In smaller divices this page losses some functionality</p>
            <div className="scrollbar-none overflow-y-auto max-h-125">
                {ordersArray.length > 0 ? <table className="table-auto border-collapse w-full">
                    <thead className="text-white">
                        <tr className="divide-x divide-white">
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Order Nº</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">User</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Items</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Cost / Amount</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Total Items</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Total Cost</th>
                            <th className="font-light text-xl top-0 p-1 sticky bg-(--color-primary)">Buy Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-(--enfasis)/60 text-white">
                        {ordersArray.map((order) =>
                            <tr key={order.id} className="divide-x divide-y divide-white/30 text-gray-100 text-center">
                                <td className="p-1 font-light">{order.orderNumber}</td>
                                <td className="p-1 font-light">{order.user?.name ?? "Deleted User"}</td>
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
                                            <p>{product.cost.toString()} € / {product.quantity}</p>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {order.products.reduce((sum, product) => sum + product.quantity, 0)}
                                </td>
                                <td className="p-1 font-light">
                                    {order.products.reduce((sum, product) => sum + parseFloat(product.cost.toString()) * product.quantity, 0).toFixed(2)} €
                                </td>
                                <td className="p-1 font-light border-b-white/30 border-b">{order.createdAt.toLocaleDateString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>: <p>There are no orders on the database</p>}
            </div>
        </>
    )
}