export default function Navbar() {
    return (
        <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-20">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <div className="text-2xl font-semibold tracking-wide text-gray-900">
                    Finanzas360
                </div>

                <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
                   
                </ul>

                <button className="md:hidden p-2 rounded bg-gray-100 text-gray-700">
                    ☰
                </button>

            </nav>
        </header>
    );
}
