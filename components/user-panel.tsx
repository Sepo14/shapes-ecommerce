import { auth } from "@/auth"
import UsernameChange from "./username-change-input"
import EmailChange from "./email-change-input"
import PasswordChange from "./password-change-input"
import OrderListUser from "./orders-list-user"
import prisma from "@/lib/prisma"
import { serializeUserOrders } from "@/lib/types"

export default async function UserPanel() {

    const session = await auth()

    const userOrderList = await prisma.order.findMany({ where: { userId: session?.user.id }, include: { products: { include: { product: true } } } })

    return (
        <>
            <div className="w-full flex justify-between min-h-70">
                <div className="w-1/3 pl-15 p-5 flex flex-col items-start">
                    <h2 className={`text-4xl border-b border-gray-300 mb-2`}>Your <em className="text-(--enfasis)">Account</em></h2>
                    <div className="gap-1 flex flex-col">
                        <UsernameChange name={session?.user.name ?? ""} id={session?.user.id ?? ""} />
                        <EmailChange email={session?.user.email ?? ""} id={session?.user.id ?? ""} />
                        <PasswordChange id={session?.user.id ?? ""} />
                    </div>
                </div>
                <OrderListUser orders={serializeUserOrders(userOrderList)} />
            </div>
        </>
    )
}