import { dm_mono } from "@/lib/fonts"

export default function Footer() {
    return (
        <footer className="w-full bg-(--color-dark) py-10 px-5">
            <nav className="grid grid-cols-3 items-center text-gray-400">

                <a href="#" className="text-2xl text-white">
                    SHAPE
                </a>

                <div className={`${dm_mono.className} flex justify-center gap-5 text-xs uppercase`}>
                    <a href="#" className="hover:text-white transition">
                        privacy policy
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Shippings
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Refounds
                    </a>
                </div>

                <p className={`${dm_mono.className} uppercase text-sm text-right`}>
                    © 2026 Shape Studio
                </p>

            </nav>
        </footer>
    )
}