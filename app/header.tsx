

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-(--background) py-5 px-4 md:px-8 border-b border-gray-300">
            <nav className="flex justify-between items-center">
                <a href="#" className="text-3xl">
                    SHAPE
                </a>
                <div className="flex items-center md:gap-1 gap-2">
                    <a
                        href="#"
                        className=" px-2 md:px-4 py-2 rounded-sm transition"
                    >
                        Home
                    </a>
                    <a href="#" className="px-2 md:px-4 py-2 rounded-sm transition">
                        Collections
                    </a>
                </div>
            </nav>
        </header>
    )
}