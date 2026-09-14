import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, XCircle } from "lucide-react";
import type { ContactFormData, ContactStatus } from "@/types/contacts";
import contactArt from "@/assets/svgs/contact us.svg";
import MagicRings from '@/components/MagicRings';
gsap.registerPlugin(ScrollTrigger);

// Replace with your own Formspree form id (or EmailJS/backend endpoint).
const FORM_ENDPOINT = "https://formspree.io/f/xnpqkdzr";

const initialData: ContactFormData = { name: "", email: "", message: "" };

export default function ContactForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const fieldsRef = useRef<HTMLDivElement[]>([]);
    // eslint-disable-next-line react-hooks/refs
    fieldsRef.current = [];

    const [ data, setData ] = useState<ContactFormData>(initialData);
    const [ status, setStatus ] = useState<ContactStatus>("idle");
    const [ errorMsg, setErrorMsg ] = useState<string | null>(null);

    const addFieldRef = (el: HTMLDivElement | null) => {
        if (el) fieldsRef.current.push(el);
    };

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                fieldsRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [ name ]: value }));
    };

    const validate = (): string | null => {
        if (!data.name.trim()) return "name is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "enter a valid email";
        if (!data.message.trim() || data.message.trim().length < 10)
            return "message should be at least 10 characters";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setErrorMsg(validationError);
            setStatus("error");
            return;
        }

        setStatus("sending");
        setErrorMsg(null);

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("submission failed");

            setStatus("success");
            setData(initialData);
        } catch {
            setStatus("error");
            setErrorMsg("something went wrong — try again or email me directly");
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="w-full bg-[#0a1628] border-t border-slate-800 font-mono py-20 px-6 relative isolate"
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <MagicRings
                    color="#FF9FFC"
                    colorTwo="#030440"
                    ringCount={6}
                    speed={0.2}
                    attenuation={10}
                    lineThickness={2}
                    baseRadius={0.35}
                    radiusStep={0.1}
                    scaleRate={0.1}
                    opacity={0.5}
                    blur={0}
                    noiseAmount={0.1}
                    rotation={0}
                    ringGap={1.5}
                    fadeIn={0.7}
                    fadeOut={0.5}
                    followMouse={false}
                    mouseInfluence={0.2}
                    hoverScale={1.2}
                    parallax={0.05}
                    clickBurst={false}
                />
            </div>
            <div className="relative z-20 max-w-4xl mx-auto">
                <p className="text-slate-500 text-sm mb-2 relative z-10">// let's talk</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-10 relative z-10">
                    _contact
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-sm overflow-hidden"
                >
                    {/* terminal-style header bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                        <span className="w-3 h-3 rounded-full bg-red-500/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <span className="w-3 h-3 rounded-full bg-green-500/70" />
                        <span className="ml-3 text-xs text-slate-500">contact.sh</span>
                    </div>
                    <div className="flex block md:flex-row">

                        <div className="p-6 space-y-5 md:w-2/3 w-full">
                            <div ref={addFieldRef}>
                                <label htmlFor="name" className="block text-sm text-indigo-400 mb-1">
                                    <span className="text-slate-500">$</span> name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full bg-slate-950/60 border border-slate-800 rounded-md px-3 py-2
                                           text-slate-200 text-sm placeholder:text-slate-600
                                           focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30
                                           transition-colors"
                                />
                            </div>

                            <div ref={addFieldRef}>
                                <label htmlFor="email" className="block text-sm text-indigo-400 mb-1">
                                    <span className="text-slate-500">$</span> email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full bg-slate-950/60 border border-slate-800 rounded-md px-3 py-2
                                           text-slate-200 text-sm placeholder:text-slate-600
                                           focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30
                                           transition-colors"
                                />
                            </div>

                            <div ref={addFieldRef}>
                                <label htmlFor="message" className="block text-sm text-indigo-400 mb-1">
                                    <span className="text-slate-500">$</span> message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={data.message}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-slate-950/60 border border-slate-800 rounded-md px-3 py-2
                                           text-slate-200 text-sm placeholder:text-slate-600 resize-none
                                           focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30
                                           transition-colors"
                                />
                            </div>

                            <div ref={addFieldRef} className="flex items-center justify-between pt-2">
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-md
                                           bg-orange-400 text-slate-900 font-medium text-sm
                                           hover:bg-orange-300 disabled:opacity-50 disabled:cursor-not-allowed
                                           transition-colors"
                                >
                                    <Send size={15} />
                                    {status === "sending" ? "sending..." : "send message"}
                                </button>

                                {status === "success" && (
                                    <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
                                        <CheckCircle2 size={16} /> sent!
                                    </span>
                                )}
                                {status === "error" && errorMsg && (
                                    <span className="flex items-center gap-1.5 text-red-400 text-sm">
                                        <XCircle size={16} /> {errorMsg}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="md:flex justify-center items-center bg-slate-950/40 hidden md:w-1/2 ">
                            <img
                                src={contactArt}
                                alt="Contact illustration"
                                className="w-full h-56 object-contain"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}