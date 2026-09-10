export interface Skill {
    name: string;
    letter: string;   // placeholder glyph shown in the icon box
    color: string;     // tailwind text color class for the label
    iconBg: string;    // tailwind bg color class for the icon box
    iconText: string;  // tailwind text color class for the glyph
}

export interface SkillCategory {
    id: string;
    label: string; // shown as "@frontend" etc.
    skills: Skill[];
}