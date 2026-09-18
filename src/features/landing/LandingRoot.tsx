//import photo1 from "@/assets/images/photo1.jpeg";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";
import ShapeGrid from "@/components/ShapeGrid";
import photo1 from "@/assets/images/image2.jpeg";
import type { RootState } from "@/store";

export default function Hero() {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const isDark = mode === "dark";

    return (
        <section
            id="hello"
            className="relative overflow-hidden bg-white dark:bg-[#0a1628] text-slate-700 dark:text-slate-200 font-mono py-16 sm:py-20 md:py-0 md:min-h-[720px] flex items-center transition-colors"
        >
            {/* dot-grid background decoration */}
            <div className="absolute inset-0 z-0">
                <ShapeGrid
                    speed={0.2}
                    squareSize={40}
                    direction="diagonal"
                    borderColor={isDark ? "#334155" : "#cbd5e1"}
                    hoverFillColor={isDark ? "#222" : "#e2e8f0"}
                    shape="hexagon"
                    hoverTrailAmount={5}
                />
            </div>

            <div className="relative max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-12">
                {/* PHOTO — single block, reordered per breakpoint instead of duplicated */}
                <div className="order-1 md:order-2 flex justify-center md:justify-end">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-95 md:h-95 rounded-full bg-slate-200 dark:bg-black overflow-hidden shadow-2xl shadow-slate-400/50 dark:shadow-black">
                        <img
                            src={photo1}
                            alt="Abdallah Nabil"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* TEXT */}
                <div className="order-2 md:order-1 text-center md:text-left">
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-2">
                        "Hello world". I am
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-4">
                        Abdallah Nabil
                    </h1>

                    <div className="flex justify-center md:justify-start text-xl sm:text-2xl md:text-3xl text-indigo-500 dark:text-indigo-400 mb-8 md:mb-10">
                        <h2>
                            {"> "}
                            <TypeAnimation
                                sequence={[
                                    "Frontend Developer",
                                    2000,
                                    "Backend Developer",
                                    2000,
                                    "Full Stack Developer",
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </h2>
                    </div>

                    {/* code-comment lines: block is centered on mobile, but text inside stays
                        left-aligned — centering each line individually would read badly */}
                    <div className="inline-block text-left mx-auto md:mx-0 space-y-1 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                        <p>
                            <span className="text-slate-400 dark:text-slate-500">// </span>
                            Self-motivated, hardworking individual
                        </p>

                        <p>
                            <span className="text-slate-400 dark:text-slate-500">// </span>
                            a full stack developer with over 4 years of professional
                            experience.
                        </p>

                        <p>
                            <span className="text-indigo-500 dark:text-indigo-400">const</span>{" "}
                            <span className="text-emerald-600 dark:text-emerald-400">LinkedIn</span>{" "}
                            <span className="text-slate-500 dark:text-slate-300">=</span>{" "}
                            <span className="text-orange-600 dark:text-orange-300">
                                "in/0xabdallah-nabil"
                            </span>
                        </p>
                        <p>
                            <span className="text-indigo-500 dark:text-indigo-400">const</span>{" "}
                            <span className="text-emerald-600 dark:text-emerald-400">GitHub</span>{" "}
                            <span className="text-slate-500 dark:text-slate-300">=</span>{" "}
                            <span className="text-orange-600 dark:text-orange-300">
                                "0xabdallah-nabil"
                            </span>
                        </p>
                        <p>
                            <span className="text-indigo-500 dark:text-indigo-400">const</span>{" "}
                            <span className="text-emerald-600 dark:text-emerald-400">Facebook</span>{" "}
                            <span className="text-slate-500 dark:text-slate-300">=</span>{" "}
                            <span className="text-orange-600 dark:text-orange-300">
                                "abdallah.nabil.9421"
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}