import { skillCategories } from "@/data/skills";

export default function SkillsPanel() {


    return (
        <aside className="sticky top-0  w-full md:w-[420px] shrink-0 bg-[#0a1628] border-l border-slate-800 font-mono text-sm px-6 py-6 ">
            <p className="text-slate-500 mb-6">
                // Relevant Skills
            </p>

            <div
                className="space-y-6"
            >
                {skillCategories.map((category) => (
                    <div key={category.id}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-indigo-400">
                                {category.label}
                            </span>

                            <button className="text-slate-500 text-xs hover:text-slate-300">
                                details
                            </button>
                        </div>

                        <div className="border border-slate-800 rounded-md p-4 grid grid-cols-2 gap-y-3 gap-x-4">
                            {category.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${skill.iconBg} ${skill.iconText}`}
                                    >
                                        {skill.letter}
                                    </span>

                                    <span className={skill.color}>
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}