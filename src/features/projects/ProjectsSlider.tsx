import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { projects } from "@/data/projects";
//import GradientWaves from '@/components/GradientWaves';
import type { Project } from "@/types/project";
import type { RootState } from "@/store";
import DotGrid from '@/components/DotGrid';

// Clone the last item to the front and the first item to the back.
const slides: Project[] = [
    projects[ projects.length - 1 ],
    ...projects,
    projects[ 0 ],
];

export default function ProjectsSlider() {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isAnimatingRef = useRef(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const isDark = mode === "dark";

    // index into `slides`; starts at 1 = first real project
    const [ index, setIndex ] = useState(1);

    // Ref to store touch start coordinates
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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

    // --- NEW: Touch Swipe Handlers ---
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[ 0 ];
            touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStartRef.current) return;

            const touch = e.changedTouches[ 0 ];
            const deltaX = touch.clientX - touchStartRef.current.x;
            const deltaY = touch.clientY - touchStartRef.current.y;

            // Thresholds to prevent accidental swipes
            const SWIPE_THRESHOLD = 50; // Minimum distance (px) for a swipe
            const VERTICAL_TOLERANCE = 1.5; // Horizontal movement must be greater than vertical * this

            // Check if horizontal swipe is significant and dominant over vertical
            if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY) * VERTICAL_TOLERANCE) {
                if (deltaX < 0) {
                    // Swiped left -> next slide
                    handleNext();
                } else {
                    // Swiped right -> previous slide
                    handlePrev();
                }
            }

            // Reset touch start
            touchStartRef.current = null;
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchend", handleTouchEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ index ]); // Re-bind when index changes so closures have the latest index

    // Real (non-clone) slide number for the dots/counter, 0-based
    const realIndex = (index - 1 + projects.length) % projects.length;

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative w-screen h-screen overflow-hidden bg-[#eaddc0] dark:bg-[#0a1628] font-mono border-t border-slate-200 dark:border-slate-800 transition-colors touch-pan-y"
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor={isDark ? "#334155" : "#7c6ce0"}
                    activeColor={isDark ? "#a392ea" : "#7c0000"}
                    proximity={90}
                    shockRadius={140}
                    shockStrength={5}
                    resistance={500}
                    returnDuration={0.6}
                />
            </div>
            <div className="absolute top-10 left-6 md:left-12 z-10">
                <p className="text-slate-500 text-sm">// featured work</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white">_projects</h2>
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
                    className="h-12 w-12 rounded-full border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60
                               flex items-center justify-center text-slate-600 dark:text-slate-300
                               hover:border-orange-400 hover:text-orange-400 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                    {projects.map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${i === realIndex ? "w-6 bg-orange-400" : "w-1.5 bg-slate-300 dark:bg-slate-700"
                                }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next project"
                    className="h-12 w-12 rounded-full border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60
                               flex items-center justify-center text-slate-600 dark:text-slate-300
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
                                className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4">
                        {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-base mb-6 max-w-md">
                        {project.description}
                    </p>
                    <div className="flex gap-5 text-sm">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300"
                            >
                                live →
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            >
                                documentation →
                            </a>
                        )}
                    </div>
                </div>

                <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 aspect-video">
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