import { useRef, useState, useLayoutEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import type { RootState, AppDispatch } from "@/store";
import { toggleTheme } from "@/features/theme/themeSlice";

const navLinks = [
    { label: "_hello", href: "#hello" },
    { label: "_about-me", href: "#about" },
    { label: "_projects", href: "#projects" },
    { label: "_certificates", href: "#certificates" },
    { label: "_Contact", href: "#contact" },
];

export default function Header() {
    const [ active, setActive ] = useState("_hello");
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ shouldRender, setShouldRender ] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<HTMLAnchorElement[]>([]);
    // eslint-disable-next-line react-hooks/refs
    linkRefs.current = [];

    const pendingHrefRef = useRef<string | null>(null);
    const previousActiveRef = useRef(active);

    const addLinkRef = (el: HTMLAnchorElement | null) => {
        if (el) linkRefs.current.push(el);
    };

    const handleDesktopNavClick = (label: string) => {
        setActive(label);
    };

    const handleMobileNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        label: string,
        href: string
    ) => {
        e.preventDefault();
        setActive(label);
        pendingHrefRef.current = href;
        setMenuOpen(true);
    };

    const openMenu = () => {
        previousActiveRef.current = active;
        setMenuOpen(true);
    };

    const closeMenuViaX = () => {
        pendingHrefRef.current = null;
        setActive(previousActiveRef.current);
        setMenuOpen(false);
    };

    useLayoutEffect(() => {
        if (menuOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShouldRender(true);
        }
    }, [ menuOpen ]);

    useLayoutEffect(() => {
        if (!shouldRender) return;

        const links = linkRefs.current;

        if (menuOpen) {
            gsap.fromTo(
                links,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    stagger: 0.08,
                }
            );
        } else {
            gsap.to(links, {
                opacity: 0,
                x: -20,
                duration: 0.2,
                ease: "power2.in",
                stagger: { each: 0.05, from: "end" },
                onComplete: () => {
                    setShouldRender(false);

                    const href = pendingHrefRef.current;
                    if (href) {
                        const target = document.querySelector(href);
                        target?.scrollIntoView({ behavior: "smooth" });
                        pendingHrefRef.current = null;
                    }
                },
            });
        }
    }, [ menuOpen, shouldRender ]);

    return (
        <header className="w-full bg-white dark:bg-[#0a1628] font-mono text-sm transition-colors">
            <div className="flex items-center justify-center border-b border-slate-200 dark:border-gray-400 md:border-b-0 relative">
                <nav className="hidden md:flex h-12 justify-center items-center ">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => handleDesktopNavClick(link.label)}
                            className={`px-6 h-12 flex items-center transition-colors ${active === link.label
                                ? "text-slate-900 dark:text-white border-b-2 border-b-orange-400"
                                : "text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:block " />
                <button
                    type="button"
                    onClick={() => dispatch(toggleTheme())}
                    aria-label="Toggle theme"
                    className="absolute right-4 h-12 w-12 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200 transition-colors"
                >
                    {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                    type="button"
                    onClick={() => (menuOpen ? closeMenuViaX() : openMenu())}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    className="md:hidden m-auto h-12 w-12 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {
                shouldRender && (
                    <nav ref={navRef} className="md:hidden flex flex-col">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                ref={addLinkRef}
                                href={link.href}
                                onClick={(e) => handleMobileNavClick(e, link.label, link.href)}
                                className={`px-6 h-12 flex items-center justify-center border-b border-slate-200 dark:border-gray-400 transition-colors ${active === link.label
                                    ? "text-slate-900 dark:text-white border-l-2 border-l-orange-400"
                                    : "text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))
                        }
                    </nav >
                )
            }
        </header >
    );
}