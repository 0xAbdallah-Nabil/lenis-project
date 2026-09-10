
import photo1 from "@/assets/images/photo1.jpeg";
import { TypeAnimation } from "react-type-animation";
import { useLenisProgress, useLenisScrollY } from "@/features/scroll/useLenisScroll";

export default function Hero() {
    const progress = useLenisProgress();
    const scrollY = useLenisScrollY();
    console.log("scrollY", scrollY);
    const y = 30 + progress * 30;

    console.log("glowY", y);
    return (
        <section
            id="hello"
            className="relative overflow-hidden bg-[#0a1628] font-mono text-slate-200 min-h-[720px] flex items-center"
        >
            {/* Glow  decoration overlay*/}

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(148,163,184,0.25) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />



            {/* left and right sides*/}

            <div className="relative max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 items-center gap-12">

                {/* LEFT */}
                <div>
                    <p className="text-slate-300 text-lg mb-2">
                        "Hello world". I am
                    </p>

                    <h1 className="text-5xl md:text-6xl font-semibold text-white mb-4">
                        Abdallah Nabil
                    </h1>

                    <div className="text-2xl md:text-3xl text-indigo-400 mb-10">
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

                    <div className="space-y-1 text-slate-400 text-sm md:text-base">
                        <p>
                            <span className="text-slate-500">// </span>
                            Self-motivated, hardworking individual
                        </p>

                        <p>
                            <span className="text-slate-500">// </span>
                            a full stack developer with over 4 years of professional
                            experience.
                        </p>

                        <p>
                            <span className="text-indigo-400">const</span>{" "}
                            <span className="text-emerald-400">LinkedIn</span>{" "}
                            <span className="text-slate-300">=</span>{" "}
                            <span className="text-orange-300">
                                "0xabdallah-nabil"
                            </span>
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-center md:items-end gap-8">
                    <div className="w-95 h-95 rounded-full bg-black overflow-hidden shadow-2xl shadow-black">
                        <img
                            src={photo1}
                            alt="Abdullah Nabil"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

