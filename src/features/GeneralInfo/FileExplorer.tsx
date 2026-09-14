import { useState } from "react";
import { ChevronDown, ChevronRight, FileCode2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";


interface FileExplorerProps {
    onOpenFile: (id: string) => void;
    activeFileId: string | null;
}

export default function FileExplorer({ onOpenFile, activeFileId }: FileExplorerProps) {
    const [ openFolders, setOpenFolders ] = useState({
        root: true,
        education: true,
    });

    const toggleFolder = (key: keyof typeof openFolders) =>
        setOpenFolders((prev) => ({ ...prev, [ key ]: !prev[ key ] }));

    const fileClasses = (id: string) =>
        `flex items-center gap-1 w-full px-3 py-1.5 transition-colors ${activeFileId === id
            ? "text-white bg-slate-800/60"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
        }`;

    return (
        <aside className="w-full md:w-64 shrink-0 self-start md:self-stretch h-fit md:h-full bg-[#0a1628d6] border-r border-slate-800 font-mono text-sm text-slate-300">
            {/* root folder */}
            <button
                onClick={() => toggleFolder("root")}
                className="flex items-center gap-1 w-full px-3 py-2 text-slate-200 font-medium hover:bg-slate-800/40"
            >
                {openFolders.root ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                personal-info
            </button>

            {openFolders.root && (
                <div className="pl-4">
                    {/* bio — plain file, opens directly */}
                    <button onClick={() => onOpenFile("bio")} className={fileClasses("bio")}>
                        <FileCode2 size={14} className="text-blue-400" />
                        bio
                    </button>

                    {/* experiences — plain file, opens directly */}
                    <button
                        onClick={() => onOpenFile("experiences")}
                        className={fileClasses("experiences")}
                    >
                        <FileCode2 size={14} className="text-blue-400" />
                        experiences
                    </button>

                    {/* education — folder, toggles to reveal files */}
                    <button
                        onClick={() => toggleFolder("education")}
                        className="flex items-center gap-1 w-full px-3 py-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    >
                        {openFolders.education ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        education
                    </button>

                    {openFolders.education && (
                        <div className="ml-3">
                            <button
                                onClick={() => onOpenFile("edu-uol")}
                                className={fileClasses("edu-uol")}
                                style={{ fontSize: "12px" }}
                            >
                                <FileCode2 size={14} className="text-orange-400" />
                                B.Sc in Computer Engineering
                            </button>
                            <button
                                onClick={() => onOpenFile("edu-degree")}
                                className={fileClasses("edu-degree")}
                                style={{ fontSize: "12px" }}
                            >
                                <FileCode2 size={14} className="text-orange-400" />
                                M.Sc in Computer Engineering
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* contacts */}
            <div className=" md:block hidden mt-4 px-3 py-2 text-slate-200 font-medium border-t border-slate-800">
                contacts
            </div>
            <div className="pl-4 pb-4 md:flex md:flex-col md:items-start md:gap-2 hidden">
                <a
                    href="mailto:abdallahnabil2003@gmail.com"
                    className="flex items-center justify-start  px-3 py-1.5 text-slate-400 hover:text-slate-200"
                >

                    abdallahnabil2003@gmail.com
                </a>
                <div className="flex items-center gap-2 px-3 py-1.5 text-slate-400">
                    <a className="text-slate-400 hover:text-slate-200 hover:scale-120" href="https://github.com/0xAbdallah-Nabil" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={18} />
                    </a>
                    <a className="text-slate-400 hover:text-slate-200 hover:scale-120" href="https://www.linkedin.com/in/0xabdallah-nabil/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={18} />
                    </a>
                    <a className="text-slate-400 hover:text-slate-200 hover:scale-120" href="https://www.facebook.com/abdallah.nabil.9421/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={18} />
                    </a>
                </div>
            </div>
        </aside >
    );
}