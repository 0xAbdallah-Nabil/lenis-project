import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
//import GradientWaves from '@/components/GradientWaves';
import type { Project } from "@/types/project";
import DotGrid from '@/components/DotGrid';
// Clone the last item to the front and the first item to the back.
// This lets us animate straight past the "real" edges and then
// snap instantly (no animation) back into the matching real slide,
// creating the illusion of an infinite loop.
const slides: Project[] = [
    projects[ projects.length - 1 ],
    ...projects,
    projects[ 0 ],
];

export default function ProjectsSlider() {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isAnimatingRef = useRef(false);

    // index into `slides`; starts at 1 = first real project
    const [ index, setIndex ] = useState(1);

    const goTo = (nextIndex: number) => {
        if (isAnimatingRef.current) return;
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        isAnimatingRef.current = true;
        const slideWidth = container.offsetWidth;

        gsap.to(track, {
            x: -nextIndex * slideWidth,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
                isAnimatingRef.current = false;

                // Landed on a clone — snap instantly to the matching real slide
                if (nextIndex === slides.length - 1) {
                    setIndex(1);
                    gsap.set(track, { x: -1 * slideWidth });
                } else if (nextIndex === 0) {
                    setIndex(slides.length - 2);
                    gsap.set(track, { x: -(slides.length - 2) * slideWidth });
                } else {
                    setIndex(nextIndex);
                }
            },
        });
    };

    const handleNext = () => goTo(index + 1);
    const handlePrev = () => goTo(index - 1);

    // Keep the track aligned to the current slide on resize
    useLayoutEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        gsap.set(track, { x: -index * container.offsetWidth });

        const onResize = () => {
            gsap.set(track, { x: -index * container.offsetWidth });
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Real (non-clone) slide number for the dots/counter, 0-based
    const realIndex = (index - 1 + projects.length) % projects.length;

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative w-screen h-screen overflow-hidden bg-[#0a1628] font-mono border-t "
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor="#334155"
                    activeColor="#a392ea"
                    proximity={90}
                    shockRadius={140}
                    shockStrength={5}
                    resistance={500}
                    returnDuration={0.6}
                />
            </div>
            <div className="absolute top-10 left-6 md:left-12 z-10">
                <p className="text-slate-500 text-sm">// featured work</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-white">_projects</h2>
            </div>

            <div ref={trackRef} className="flex h-full w-full will-change-transform z-10">
                {slides.map((project, i) => (
                    <div key={`${project.id}-${i}`} className="w-screen h-full shrink-0">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            {/* controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10">
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous project"
                    className="h-12 w-12 rounded-full border border-slate-700 bg-slate-900/60
                               flex items-center justify-center text-slate-300
                               hover:border-orange-400 hover:text-orange-400 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                    {projects.map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${i === realIndex ? "w-6 bg-orange-400" : "w-1.5 bg-slate-700"
                                }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next project"
                    className="h-12 w-12 rounded-full border border-slate-700 bg-slate-900/60
                               flex items-center justify-center text-slate-300
                               hover:border-orange-400 hover:text-orange-400 transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center px-6 md:px-24">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded border border-slate-700 text-indigo-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        {project.title}
                    </h3>
                    <p className="text-slate-400 text-base mb-6 max-w-md">
                        {project.description}
                    </p>
                    <div className="flex gap-5 text-sm">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-400 hover:text-orange-300"
                            >
                                live →
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-slate-200"
                            >
                                code →
                            </a>
                        )}
                    </div>
                </div>

                <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 aspect-video">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div >
        </div >
    );
}