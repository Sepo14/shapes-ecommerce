import { auth } from "@/auth";
import HeaderAdmin from "@/components/header-admin";
import { dm_mono } from "@/lib/fonts";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await auth()

    if (session?.user.role === "COSTUMER" || !session) {
        return (
            redirect("/")
        )
    }

    return (
        <main className={`flex flex-col min-h-svh ${dm_mono.className}`}>
            <section className="w-full h-full bg-(--background)">
                <HeaderAdmin />
                {children}
            </section>
        </main>
    )

}