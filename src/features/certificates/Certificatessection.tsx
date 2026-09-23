import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink, Search, X } from "lucide-react";

import { certificates } from "@/data/certificates";
import type { Certificate } from "@/types/certificate";

gsap.registerPlugin(ScrollTrigger);

export default function CertificatesGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLButtonElement[]>([]);
    // eslint-disable-next-line react-hooks/refs
    cardsRef.current = [];

    const [ query, setQuery ] = useState("");
    const [ activeIssuer, setActiveIssuer ] = useState<string | null>(null);
    const [ selected, setSelected ] = useState<Certificate | null>(null);

    const addCardRef = (el: HTMLButtonElement | null) => {
        if (el) cardsRef.current.push(el);
    };

    const issuers = useMemo(
        () => Array.from(new Set(certificates.map((c) => c.issuer))).sort(),
        []
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return certificates.filter((c) => {
            const matchesIssuer = !activeIssuer || c.issuer === activeIssuer;
            const matchesQuery =
                !q ||
                c.title.toLowerCase().includes(q) ||
                c.issuer.toLowerCase().includes(q) ||
                c.skills?.some((s) => s.toLowerCase().includes(q));
            return matchesIssuer && matchesQuery;
        });
    }, [ query, activeIssuer ]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filtered.length ]);

    // lightbox: close on Escape, lock body scroll while open
    useEffect(() => {
        if (!selected) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [ selected ]);

    return (
        <section
            id="certificates"
            ref={sectionRef}
            className="w-full bg-white dark:bg-[#0a1628] border-t border-slate-200 dark:border-slate-800 font-mono py-20 px-6 transition-colors"
        >
            <div className="max-w-6xl mx-auto">
                <p className="text-slate-500 text-sm mb-2">// proof of work</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-8">
                    _certificates
                </h2>

                {/* search + filter row */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="search certificates..."
                            className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-md pl-9 pr-3 py-2
                                       text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600
                                       focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30 transition-colors"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveIssuer(null)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeIssuer === null
                                ? "border-orange-400 text-orange-500 dark:text-orange-400"
                                : "border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600"
                                }`}
                        >
                            all ({certificates.length})
                        </button>
                        {issuers.map((issuer) => (
                            <button
                                key={issuer}
                                type="button"
                                onClick={() =>
                                    setActiveIssuer((prev) => (prev === issuer ? null : issuer))
                                }
                                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeIssuer === issuer
                                    ? "border-orange-400 text-orange-500 dark:text-orange-400"
                                    : "border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600"
                                    }`}
                            >
                                {issuer}
                            </button>
                        ))}
                    </div>
                </div>

                {/* image grid */}
                {filtered.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        // no certificates match "{query}"
                    </p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filtered.map((cert) => (
                            <button
                                key={cert.id}
                                type="button"
                                ref={addCardRef}
                                onClick={() => setSelected(cert)}
                                className="group text-left rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60
                                           overflow-hidden hover:border-orange-400/60 transition-colors"
                            >
                                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-950/60 flex items-center justify-center overflow-hidden">
                                    {cert.image ? (
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <Award
                                            size={28}
                                            className="text-slate-300 dark:text-slate-700"
                                        />
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                        {cert.date}
                                    </p>
                                    <p className="text-sm text-slate-900 dark:text-white font-medium leading-snug line-clamp-2">
                                        {cert.title}
                                    </p>
                                    <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">
                                        {cert.issuer}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* lightbox */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
                    onClick={() => setSelected(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-xs text-slate-500">certificate.view</span>
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                aria-label="Close"
                                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-950/60 flex items-center justify-center">
                            {selected.image ? (
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <Award size={48} className="text-slate-300 dark:text-slate-700" />
                            )}
                        </div>

                        <div className="p-5"
                            data-aos="fade-up"
                            data-aos-delay="100">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                {selected.date}
                            </p>
                            <h3 className="text-slate-900 dark:text-white font-medium text-lg mb-1">
                                {selected.title}
                            </h3>
                            <p className="text-indigo-500 dark:text-indigo-400 text-sm mb-4">
                                {selected.issuer}
                            </p>

                            {selected.skills && selected.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selected.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {selected.credentialUrl && (
                                <a
                                    href={selected.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300"
                                >
                                    verify credential <ExternalLink size={13} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}