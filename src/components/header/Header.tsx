import { useRef, useState, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
    { label: "_hello", href: "#hello" },
    { label: "_about-me", href: "#about" },
    { label: "_projects", href: "#projects" },
    { label: "_Contact", href: "#contact" },
];

export default function Header() {
    const [ active, setActive ] = useState("_hello");
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ shouldRender, setShouldRender ] = useState(false);

    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<HTMLAnchorElement[]>([]);
    // eslint-disable-next-line react-hooks/refs
    linkRefs.current = [];

    const pendingHrefRef = useRef<string | null>(null);

    // NEW: remembers what was active right before the menu was opened
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

    // NEW: opening the menu — snapshot current active tab
    const openMenu = () => {
        previousActiveRef.current = active;
        setMenuOpen(true);
    };

    // NEW: closing via the X — no scroll, revert active tab
    const closeMenuViaX = () => {
        pendingHrefRef.current = null; // make sure onComplete has nothing to scroll to
        setActive(previousActiveRef.current); // revert to whatever it was before opening
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
        <header className="w-full bg-[#0a1628] font-mono text-sm ">
            <div className=" flex items-center justify-center border-b border-gray-400 md:border-b-0">
                <nav className="hidden md:flex h-12 justify-center items-center ">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => handleDesktopNavClick(link.label)}
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

                <button
                    type="button"
                    onClick={() => (menuOpen ? closeMenuViaX() : openMenu())}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    className="md:hidden m-auto h-12 w-12 flex items-center justify-center  text-gray-400 hover:text-gray-200"
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
                                className={`px-6 h-12 flex items-center justify-center border-b border-gray-400 transition-colors ${active === link.label
                                    ? "text-white border-l-2 border-l-orange-400"
                                    : "text-gray-400 hover:text-gray-200"
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