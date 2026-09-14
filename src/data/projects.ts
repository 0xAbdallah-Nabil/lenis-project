import type { Project } from "@/types/project";
import geanlaern from "@/assets/images/genlearn.png";
import learnova from "@/assets/images/learnova.png";
import famory from "@/assets/images/famory.png";
export const projects: Project[] = [
    {
        id: "p1",
        title: "Project One",
        description: "Short one/two line description of what it does and the impact it had.",
        image: geanlaern,
        tags: [ "React", "TypeScript", "Tailwind" ],
        link: "https://example.com",
        github: "https://github.com/0xAbdallah-Nabil",
    },
    {
        id: "p2",
        title: "Project Two",
        description: "Short one/two line description of what it does and the impact it had.",
        image: famory,
        tags: [ "Node.js", "MongoDB" ],
        github: "https://github.com/0xAbdallah-Nabil",
    },
    {
        id: "p3",
        title: "Project Three",
        description: "Short one/two line description of what it does and the impact it had.",
        image: learnova,
        tags: [ "ROS2", "Python", "SLAM" ],
        github: "https://github.com/0xAbdallah-Nabil",
    }
];