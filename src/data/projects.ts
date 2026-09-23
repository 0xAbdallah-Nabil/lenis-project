import type { Project } from "@/types/project";
import geanlaern from "@/assets/images/genlearn.png";
import learnova from "@/assets/images/learnova.png";
import famory from "@/assets/images/famory.png";
export const projects: Project[] = [
    {
        id: "p1",
        title: "GENLEARN",
        description: "Short one/two line description of what it does and the impact it had.",
        image: geanlaern,
        tags: [ "React", "TypeScript", "Tailwind", "Tailwind", "TankQuery", "LENIS", "AZURE", "AI", " PostgreSQL" ],
        link: "https://gen-learn-front-end.vercel.app/",
        github: "https://github.com/Gen-Learn/Documentation"
    },
    {
        id: "p2",
        title: "Project Two",
        description: "Short one/two line description of what it does and the impact it had.",
        image: famory,
        tags: [ "React", "JAVAScript", "Tailwind", "react-router" ],
        link: "https://famory-icyqka08h-abdallahnabil2003-gmailcoms-projects.vercel.app/#/",
    },
    {
        id: "p3",
        title: "Project Three",
        description: "Short one/two line description of what it does and the impact it had.",
        image: learnova,
        tags: [ "Node.js", "MongoDB", "REACT", "Tailwind", "JAVAScript", "Redux", "GSAP", "LENIS" ],
        link: "https://learnova-yhcq.vercel.app/",
    }
];