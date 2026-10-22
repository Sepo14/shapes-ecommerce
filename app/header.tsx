import { auth } from "@/auth"
import Link from "next/link"
import LogoutButton from "@/components/logout-button"
import { dm_mono } from "@/lib/fonts"
import CartButton from "@/components/cart-button"
export default async function Header() {
    const session = await auth()

    return (
        <>
            <header className="sticky top-0 z-50 w-full h-full bg-(--background) p-5 border-b border-gray-300">
                <nav className="flex justify-between items-center">
                    <Link href="/" className="text-3xl">
                        SHAPE
                    </Link>

                    <div className="flex h-full items-stretch gap-2">

                        {session?.user?.role === "ADMIN" &&
                            <Link href="/admin" scroll={true}
                                className={`py-3 px-6 flex justify-center items-center text-sm border border-(--enfasis) ${dm_mono.className} uppercase w-fit gap-4 hover:bg-(--enfasis) hover:text-white transition`}
                            >
                                admin panel
                            </Link>
                        }

                        {session && <CartButton />}

                        {session ? <LogoutButton /> :
                            <a href="#login"
                                className={`py-3 px-6 bg-(--color-dark) items-center text-white flex justify-center text-sm ${dm_mono.className} uppercase w-fit gap-4 hover:bg-(--enfasis)  transition`}>
                                Login
                            </a>
                        }
                    </div>
                </nav>
            </header>
        </>
    )
}