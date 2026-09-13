import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/0xAbdallah-Nabil",
        icon: FaGithub,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/0xabdallah-nabil/",
        icon: FaLinkedin,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/abdallah.nabil.9421/",
        icon: FaFacebook,
    },
];

export default function Footer() {
    const year = new Date().getFullYear();



    return (
        <footer className="w-full bg-[#0a1628] border-t border-slate-800 font-mono text-sm">
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* socials, reused from FileExplorer */}
                <div className="flex items-center gap-4 justify-between">
                    <p className="text-white font-semibold text-base">
                        Abdallah<span className="text-orange-400">.</span>Nabil
                    </p>
                    <div
                        className="flex items-center gap-4"
                    >
                        {socialLinks.map(({ label, href, icon: Icon }) => (

                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="text-slate-400 hover:text-slate-200 hover:scale-120 transition-transform"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
                {/* top row: brand + nav + socials */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    {/* brand / terminal line */}
                    <div>

                        <p className="text-slate-500 mt-1">
                            <span className="text-indigo-400">$</span> echo "thanks for
                            scrolling this far"
                        </p>
                    </div>


                </div>

                {/* divider */}
                <div className="border-t border-slate-800 my-6" />

                {/* bottom row: copyright + contact email */}
                <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-3 text-slate-500 text-xs">
                    <p>
                        <span className="text-slate-600">// </span>
                        &copy; {year} Abdallah Nabil. All rights reserved.
                    </p>
                    <a
                        href="mailto:abdallahnabil2003@gmail.com"
                        className="hover:text-slate-300 transition-colors"
                    >
                        abdallahnabil2003@gmail.com
                    </a>
                </div >
            </div >
        </footer >
    );
}