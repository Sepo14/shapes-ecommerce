
import prisma from "@/lib/prisma";
import { UserData } from "@/lib/types";
import { revalidatePath } from "next/cache";

export default function UserList({ users }: { users: UserData[]; }) {

    const usersSorted = [...users].sort((a, b) => a.createdAt.getDate() - b.createdAt.getDate())

    return (
        <>
            <div className="flex justify-between items-center pb-5">
                <h2 className="text-2xl">User list</h2>
                <h2 className="bg-black text-white p-3">Users: {users.length}</h2>
            </div>
            <div className="scrollbar-none overflow-y-auto max-h-125">
                <table className="table-auto border-collapse w-full">
                    <thead className="text-white">
                        <tr className="divide-x divide-white">
                            <th className="font-light text-xl top-0 sticky bg-(--color-primary)">Name</th>
                            <th className="font-light text-xl top-0 sticky bg-(--color-primary)">Email</th>
                            <th className="font-light text-xl top-0 sticky bg-(--color-primary)">Orders</th>
                            <th className="font-light text-xl top-0 sticky bg-(--color-primary)">Total Spent</th>
                            <th className="font-light text-xl top-0 sticky bg-(--color-primary)">Rol</th>
                            <th className="font-light text-xl top-0 sticky bg-(--color-primary)">Creation Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-(--enfasis)/60 text-white">
                        {usersSorted.length > 0 ? usersSorted.map((user) =>
                            <tr key={user.id} className="divide-x divide-y divide-white/30 text-gray-100 text-center">
                                <td className="relative overflow-hidden justify-center group p-1 font-light">
                                    {user.name}
                                    <div className="absolute flex justify-center translate-y-full opacity-0 pointer-events-none inset-0 right-0 bg-black cursor-pointer text-white group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 hover:bg-(--enfasis)">
                                        <button
                                            onClick={async () => {
                                                "use server"
                                                await prisma.user.delete({ where: { id: user.id } })
                                                revalidatePath("/admin")
                                            }}
                                            className="cursor-pointer">DELETE
                                        </button>
                                    </div>
                                </td>
                                <td className="p-1 font-light">{user.email}</td>
                                <td className="p-1 font-light">{user.orders.length}</td>
                                <td className="p-1 font-light">
                                    {/* tendria que haber puesto esto desde un principio en la base de datos XD */}
                                    {/* total gastado sumando todos los costes de todos los objetos comprados */}
                                    {user.orders.reduce((sum, order) => sum + order.products.reduce((sum, product) => sum + parseFloat(product.cost.toString()) * product.quantity, 0), 0).toFixed(2)} €
                                </td>
                                <td className="relative overflow-hidden justify-center group p-1 font-light">
                                    {user.role}
                                    {user.role === "CUSTOMER" &&
                                        <div className="absolute flex justify-center translate-y-full opacity-0 pointer-events-none inset-0 right-0 bg-black cursor-pointer text-white group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 hover:bg-(--enfasis)">
                                            <button
                                                onClick={async () => {
                                                    "use server"
                                                    await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } })
                                                    revalidatePath("/admin")
                                                }}
                                                className="cursor-pointer">TURN ADMIN
                                            </button>
                                        </div>
                                    }
                                </td>
                                <td className="p-1 font-light border-b-white/30 border-b">{user.createdAt.toLocaleDateString()}</td>
                            </tr>
                        ) : "There are no users on the database yet"}
                    </tbody>
                </table>
            </div>
        </>
    )
}