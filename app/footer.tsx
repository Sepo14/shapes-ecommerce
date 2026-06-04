import { dm_mono } from "./layout";

export default function Footer(){
    return(
        <footer className="w-full bg-(--color-black) py-10 px-4">
            <nav className="flex justify-between items-center text-gray-400">
                <a href="#" className="text-2xl text-white">
                    SHAPE
                </a>
                <div className={`${dm_mono.className} gap-5 flex text-xs uppercase`}>
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
                <p className={`${dm_mono.className} uppercase text-sm`}>© 2024 Shape Studio</p>
            </nav>
        </footer>
    )
}