import type { Certificate } from "@/types/certificate";

// Importing all certificate images
import autonomous_MMS_training from "@/assets/images/certificates/autonomous MMS trainnung.png";
import DEPI_REACT_web_developer from "@/assets/images/certificates/DEPI REACT web developer.png";
import EVER_autonomous_participation from "@/assets/images/certificates/EVER autonomous Participation.png";
import F1Tenth_qualification from "@/assets/images/certificates/F1Tenth Qualification.png";
import Head_of_autonomous from "@/assets/images/certificates/Head of autonomous .jpg";
import IEEE_most_active_volunteers from "@/assets/images/certificates/IEEE most active volunteers in frontend.jpg";
import mahara_tech_javascript from "@/assets/images/certificates/mhara tech JavaScript course .png";
import NTI_mean_stack from "@/assets/images/certificates/NTI summer trianning web Designer.png";
import NTI_web_designer from "@/assets/images/certificates/NTI summer trianning web Designer.png";
import sprints_microsoft_web_dev from "@/assets/images/certificates/sprints and microsoft web develpment.png";
import starkLab_instructor from "@/assets/images/certificates/starkLab instructor.jpg";
import STARKS_embedded_member from "@/assets/images/certificates/STARKS embedded system member.png";
import DEPI_Business_English from "@/assets/images/certificates/DEPI business english track.png";
import F1Tenth_participation from "@/assets/images/certificates/F1 Tenth participation.png";
export const certificates: Certificate[] = [
    {
        id: "c1",
        title: "Autonomous Fundamentals Training Course",
        issuer: "Mansoura Motorsport",
        date: "Oct 2023",
        image: autonomous_MMS_training,
        skills: [ "Autonomous Systems", "Engineering", "Robotics" ],
    },
    {
        id: "c2",
        title: "Software Development - React Frontend Web Developer",
        issuer: "DEPI",
        date: "Dec 2025",
        image: DEPI_REACT_web_developer,
        skills: [ "React", "Frontend Development", "Web Development" ],
    },
    {
        id: "c3",
        title: "Autonomous Track Participation - Electric Vehicle Rally",
        issuer: "Mansoura Motorsport",
        date: "Sep 2024",
        image: EVER_autonomous_participation,
        skills: [ "Autonomous Vehicles", "Embedded Systems", "Competition" ],
    },
    {
        id: "c4",
        title: "2nd International F1TENTH Sim Racing League Qualification",
        issuer: "Mansoura Motorsport",
        date: "2024",
        image: F1Tenth_qualification,
        skills: [ "F1TENTH", "Sim Racing", "Autonomous Systems" ],
    },
    {
        id: "c5",
        title: "2nd International F1TENTH Sim Racing League Participation",
        issuer: "Mansoura Motorsport",
        date: "2024",
        image: F1Tenth_participation,
        skills: [ "F1TENTH", "Sim Racing", "Autonomous Systems" ],
    },
    {
        id: "c6",
        title: "Head of Autonomous Committee Appreciation",
        issuer: "Mansoura Motorsport",
        date: "2024",
        image: Head_of_autonomous,
        skills: [ "Leadership", "Management", "Autonomous Systems" ],
    },
    {
        id: "c7",
        title: "Most Active Volunteer in Frontend",
        issuer: "IEEE",
        date: "2024",
        image: IEEE_most_active_volunteers,
        skills: [ "Frontend Development", "Volunteering", "Community" ],
    },
    {
        id: "c8",
        title: "JavaScript Course Completion",
        issuer: "ITI",
        date: "Jul 2025",
        image: mahara_tech_javascript,
        skills: [ "JavaScript", "Web Development" ],
    },
    {
        id: "c9",
        title: "MEAN-Stack Web Development Summer Training",
        issuer: "NTI",
        date: "Aug 2025",
        image: NTI_mean_stack,
        skills: [ "MEAN Stack", "MongoDB", "Express", "Angular", "Node.js" ],
    },
    {
        id: "c10",
        title: "Web Designer Summer Training",
        issuer: "NTI",
        date: "Sep 2024",
        image: NTI_web_designer,
        skills: [ "Web Design", "Freelancing", "Project Management" ],
    },
    {
        id: "c11",
        title: "Web Development Summer Camp",
        issuer: "Sprints & Microsoft",
        date: "2025",
        image: sprints_microsoft_web_dev,
        skills: [ "Web Development", "HTML", "CSS", "JavaScript" ],
    },
    {
        id: "c12",
        title: "Instructor Contribution in Embedded Systems",
        issuer: "STARKS Team",
        date: "Sep 2024",
        image: starkLab_instructor,
        skills: [ "Embedded Systems", "Teaching", "Instructing" ],
    },
    {
        id: "c13",
        title: "Embedded Committee Member Appreciation",
        issuer: "STARKS Team",
        date: "Oct 2023",
        image: STARKS_embedded_member,
        skills: [ "Embedded Systems", "Teamwork", "Dedication" ],
    },
    {
        id: "c14",
        title: "Business English Track - Round 3",
        issuer: "DEPI",
        date: "Dec 2025",
        image: DEPI_Business_English,
        skills: [ "Business English", "Communication", "Professional Development" ],
    }
];