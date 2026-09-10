import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "_hello", href: "#hello" },
    { label: "_about-me", href: "#about" },
    { label: "_projects", href: "#projects" },
];

export default function Header() {
    const [ active, setActive ] = useState("_hello");
    const [ menuOpen, setMenuOpen ] = useState(false);

    const handleNavClick = (label: string) => {
        setActive(label);
        setMenuOpen(false);
    };

    return (
        <header className="w-full bg-[#0a1628] font-mono text-sm ">
            <div className="flex items-center justify-between border-b border-gray-400 md:border-b-0">
                <nav className="hidden md:flex h-12 justify-center items-center ">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => handleNavClick(link.label)}
                            className={`px-6 h-12 flex items-center  transition-colors ${active === link.label
                                ? "text-white border-b-2 border-b-orange-400"
                                : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:block " />

                <a
                    href="mailto:abdallahnabil2003@gmail.com"
                    className="hidden md:flex px-6 h-12 items-center  text-gray-400 hover:text-gray-200"
                >
                    _Contact
                </a>

                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    className="md:hidden m-auto h-12 w-12 flex items-center justify-center  text-gray-400 hover:text-gray-200"
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {menuOpen && (
                <nav className="md:hidden flex flex-col">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => handleNavClick(link.label)}
                            className={`px-6 h-12 flex items-center justify-center border-b border-gray-400 transition-colors ${active === link.label
                                ? "text-white border-l-2 border-l-orange-400"
                                : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}

                    <a
                        href="mailto:abdallahnabil2003@gmail.com"
                        className="px-6 h-12 flex items-center justify-center text-gray-400 hover:text-gray-200"
                    >
                        _Contact
                    </a>
                </nav>
            )}
        </header>
    );
}