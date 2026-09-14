import { useEffect, useState } from "react";
import FileExplorer from "./FileExplorer";
import BioEditor from "./BioEditor";
import SkillsPanel from "./SkillsPanel";

import { documents } from "@/data/documents";

// AOS does not ship TypeScript declarations.
// @ts-expect-error: the package is JavaScript-only and has no available declaration file.
import AOS from "aos";
import "aos/dist/aos.css";

export default function GeneralInfo() {
    const [ openTabIds, setOpenTabIds ] = useState<string[]>([ "bio" ]);
    const [ activeId, setActiveId ] = useState<string | null>("bio");

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleOpenFile = (id: string) => {
        setOpenTabIds((prev) =>
            prev.includes(id) ? prev : [ ...prev, id ]
        );
        setActiveId(id);
    };

    const handleCloseTab = (id: string) => {
        setOpenTabIds((prev) => {
            const next = prev.filter((tabId) => tabId !== id);

            if (id === activeId) {
                setActiveId(
                    next.length > 0 ? next[ next.length - 1 ] : null
                );
            }

            return next;
        });
    };

    const openDocs = openTabIds
        .map((id) => documents[ id ])
        .filter(
            (doc): doc is (typeof documents)[ string ] =>
                Boolean(doc)
        );

    return (
        <section
            id="about"
            className="w-full bg-[#0a1628] border-t border-slate-800"
        >
            <div className="flex flex-col md:flex-row relative">
                {/* ShapeGrid Background */}

                {/* Left + Center */}
                <div className="relative md:flex-1 md:sticky md:top-0 border-b border-slate-800  md:border-b-0 md:border-r md:h-screen overflow-hidden">
                    <div
                        className="absolute inset-0 pointer-events-none animate-throb"
                        style={{
                            backgroundImage:
                                "radial-gradient(rgba(148,163,184,0.25) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />


                    {/* Content */}
                    <div className="relative z-10 flex h-fit md:h-screen flex-col md:flex-row">
                        <FileExplorer
                            onOpenFile={handleOpenFile}
                            activeFileId={activeId}
                        />

                        <BioEditor
                            openDocs={openDocs}
                            activeId={activeId}
                            onSelectTab={setActiveId}
                            onCloseTab={handleCloseTab}
                        />
                    </div>
                </div>

                {/* Right */}
                <SkillsPanel />

            </div>
        </section>
    );
}