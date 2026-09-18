import { X } from "lucide-react";
import type { Document } from "@/types/document";

interface BioEditorProps {
    openDocs: Document[];
    activeId: string | null;
    onSelectTab: (id: string) => void;
    onCloseTab: (id: string) => void;
}

export default function BioEditor({ openDocs, activeId, onSelectTab, onCloseTab }: BioEditorProps) {
    const activeDoc = openDocs.find((doc) => doc.id === activeId) ?? null;

    if (!activeDoc) {
        return (
            <div className="flex-1 min-w-0  font-mono text-sm flex items-center justify-center text-slate-400 dark:text-slate-600">
                // select a file to view
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-0  font-mono text-sm">
            {/* tab bar */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
                {openDocs.map((doc) => (
                    <div
                        key={doc.id}
                        onClick={() => onSelectTab(doc.id)}
                        className={`flex items-center gap-2 px-4 py-2 border-t-2 cursor-pointer shrink-0 ${doc.id === activeId
                            ? "border-t-orange-400 bg-slate-100 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200"
                            : "border-t-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                    >
                        {doc.title}
                        <X
                            size={13}
                            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            onClick={(e) => {
                                e.stopPropagation(); // don't also trigger onSelectTab
                                onCloseTab(doc.id);
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* code body */}
            <div className="flex overflow-x-auto">
                <div className="select-none px-3 py-4 text-right text-slate-400 dark:text-slate-600">
                    {activeDoc.lines.map((_, i) => (
                        <div key={i} className="leading-6">{i + 1}</div>
                    ))}
                </div>

                <div className="flex-1 px-3 py-4 text-slate-600 dark:text-slate-400 whitespace-pre">
                    {activeDoc.lines.map((line, i) => (
                        <div key={i} className="leading-6">{line}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}