import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSlider() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const mm = gsap.matchMedia();

        // Pinned horizontal scroll only on md+ screens.
        // Below that, the track falls back to native horizontal scroll-snap (see className below).
        mm.add("(min-width: 768px)", () => {
            const getDistance = () => track.scrollWidth - section.offsetWidth;

            const tween = gsap.to(track, {
                x: () => -getDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${getDistance()}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative w-screen overflow-hidden bg-[#0a1628] font-mono"
        >
            <div className="pt-16 md:pt-10 px-6 md:absolute md:top-10 md:left-12 md:pt-0 z-10">
                <p className="text-slate-500 text-sm">// featured work</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-white">_projects</h2>
            </div>

            <div
                ref={trackRef}
                className="flex md:h-screen h-auto items-stretch md:items-center gap-6 md:gap-8
                           px-6 md:pl-12 md:pr-[10vw] pb-6 md:pb-0 pt-8 md:pt-0
                           overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none
                           will-change-transform"
            >
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <article
            className="group relative shrink-0 snap-center
                       w-[85vw] sm:w-[60vw] md:w-[38vw] lg:w-[32vw]
                       h-[70vh] md:h-[65vh]
                       rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40"
        >
            <span className="absolute top-4 left-4 z-10 text-6xl font-bold text-white/10 select-none">
                {String(index + 1).padStart(2, "0")}
            </span>

            <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40
                           group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded border border-slate-700 text-indigo-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex gap-4 text-sm">
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
            </div >
        </article >
    );
}