import { cormorant_Garamond } from "@/lib/fonts";
import Link from "next/link";

export default function HeaderAdmin() {
    return (
        <nav className="flex md:justify-between flex-wrap gap-2 px-5 py-2 justify-center items-center border-b border-gray-300">
            <Link href="/admin" className={`text-3xl text-center uppercase ${cormorant_Garamond.className}  text-(--enfasis)`}>Admin Panel</Link>
            <div className="flex flex-wrap items-center gap-2 justify-center">
                <Link
                    href="/admin"
                    className={`py-3 px-6 flex justify-center text-sm border border-(--enfasis) bg-(--enfasis) text-(--background) uppercase gap-4 hover:bg-(--background) hover:text-(--enfasis) transition`}
                >
                    Users
                </Link>
                <Link
                    href="/admin/products"
                    className={`py-3 px-6 flex justify-center text-sm border border-(--enfasis) bg-(--enfasis) text-(--background) uppercase gap-4 hover:bg-(--background) hover:text-(--enfasis) transition`}
                >
                    Products
                </Link>
                <Link
                    href="/admin/orders"
                    className={`py-3 px-6 flex justify-center text-sm border border-(--enfasis) bg-(--enfasis) text-(--background) uppercase gap-4 hover:bg-(--background) hover:text-(--enfasis) transition`}
                >
                    Orders
                </Link>
            </div>
        </nav>
    )
}