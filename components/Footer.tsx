'use client'
import { footerData } from "@/data/footer";
import { DribbbleIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { IFooterLink } from "@/types";

export default function Footer() {
    return (
        <footer className="mt-20 py-10 px-4 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 border-t border-slate-800/50 bg-slate-950/20">
            <div className="flex flex-col md:flex-row justify-between gap-12 overflow-hidden max-w-7xl mx-auto w-full">
                
                {/* Logo and Links */}
                <motion.div 
                    className="flex flex-col sm:flex-row items-start gap-10 md:gap-16 lg:gap-24 w-full md:w-auto"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    {/* Logo Section */}
                    <a href="/" className="shrink-0">
                        <Image 
                            className="size-10 object-contain" 
                            src="/assets/gengenie.png" 
                            alt="footer logo" 
                            width={40} 
                            height={40} 
                            priority 
                        />
                    </a>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 w-full">
                        {footerData.map((section, index) => (
                            <div key={index} className="flex flex-col">
                                <p className="text-slate-100 font-semibold mb-4 text-sm tracking-wide">
                                    {section.title}
                                </p>
                                <ul className="space-y-3">
                                    {section.links.map((link: IFooterLink, linkIndex: number) => (
                                        <li key={linkIndex}>
                                            <Link 
                                                href={link.href} 
                                                className="hover:text-purple-400 transition-colors text-slate-400"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Socials and Copy */}
                <motion.div 
                    className="flex flex-col items-center sm:items-start md:items-end text-center sm:text-left md:text-right gap-4 shrink-0"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    <p className="max-w-70 text-slate-400 leading-relaxed">
                        Making every customer feel valued—no matter the size of your audience.
                    </p>
                    
                    <div className="flex items-center gap-5 mt-2">
                        <a href="https://dribbble.com/prebuiltui" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors hover:-translate-y-1 transform duration-200">
                            <DribbbleIcon className="size-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/prathamesh-powar-dan" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors hover:-translate-y-1 transform duration-200">
                            <LinkedinIcon className="size-5" />
                        </a>
                        <a href="/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors hover:-translate-y-1 transform duration-200">
                            <TwitterIcon className="size-5" />
                        </a>
                        <a href="/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors hover:-translate-y-1 transform duration-200">
                            <YoutubeIcon className="size-6" />
                        </a>
                    </div>
                    
                    <p className="mt-2 text-slate-500 text-xs">
                        &copy; {new Date().getFullYear()} <a href="https://prebuiltui.com?utm_source=pixels" className="hover:text-purple-400 transition-colors">GenGenie</a>. All rights reserved.
                    </p>
                </motion.div>

            </div>
        </footer>
    );
}