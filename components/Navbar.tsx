'use client'
import { MenuIcon, XIcon, SparklesIcon, VideoIcon } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import { navlinks } from "@/data/navlinks";
import { INavLink } from "@/types";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useAuth,
    useUser,
} from '@clerk/nextjs'
import api from "@/configs/axios";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [credits, setCredits] = useState({ 
        image: 0, 
        video: 0 
    });

    const getCredits = async () => {
        try {
            const token = await getToken();
            if(!token) return;

            const { data } = await api.get("/api/user/credits", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setCredits({
                image: data.ImageCredits || 0,
                video: data.VideoCredits || 0
            });
        } catch (error: any) {
            console.error("Error fetching credits:", error);
        }
    }

    useEffect(() => {
        if (isLoaded && user) {
            getCredits()
        }
    }, [isLoaded, user]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    

    return (
        <>
            <motion.nav
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-7xl rounded-2xl py-3 px-6 md:px-8 backdrop-blur-md bg-slate-950/80 border border-slate-800/60 shadow-xl shadow-purple-900/5"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative h-8 w-8">
                         <Image src="/assets/gengenie.png" alt="logo" fill className="object-contain" priority />
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        Genie
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navlinks.map((link: INavLink) => {
                        // Hide protected routes if user is NOT logged in
                        if (!user && (link.href === '/create' || link.href === '/my-clothes')) {
                            return null;
                        }

                        return (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Right Side Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-900/50 border border-slate-700/50 rounded-full">
                            <div className="flex items-center gap-1.5" title="Image Generation Credits">
                                <SparklesIcon className="size-3.5 text-purple-400" />
                                <span className="text-xs font-semibold text-slate-200">{credits.image}</span>
                            </div>
                            <div className="w-px h-3 bg-slate-700" /> 
                            <div className="flex items-center gap-1.5" title="Video Generation Credits">
                                <VideoIcon className="size-3.5 text-pink-400" />
                                <span className="text-xs font-semibold text-slate-200">{credits.video}</span>
                            </div>
                        </div>
                    )}

                    <SignedIn>
                        <UserButton afterSignOutUrl="/" appearance={{
                            elements: {
                                avatarBox: "w-9 h-9 border-2 border-purple-500/20 hover:border-purple-500 transition-colors"
                            }
                        }}/>
                    </SignedIn>

                    <SignedOut>
                        <div className="flex items-center gap-3">
                             <SignInButton mode="modal">
                                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-2">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-full transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 active:scale-95">
                                    Get Started
                                </button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <MenuIcon size={24} />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-100 bg-slate-950 flex flex-col p-6 md:hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                             <span className="text-xl font-bold text-white">Menu</span>
                             <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors"
                             >
                                <XIcon size={24} />
                             </button>
                        </div>

                        {/* Mobile Links */}
                        <div className="flex flex-col gap-6">
                            {navlinks.map((link: INavLink) => {
                                // Hide protected routes if user is NOT logged in for Mobile Menu
                                if (!user && (link.href === '/create' || link.href === '/my-clothes')) {
                                    return null;
                                }

                                return (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-auto flex flex-col gap-6 pb-8">
                            {user && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                                        <SparklesIcon className="size-6 text-purple-400" />
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-white">{credits.image}</p>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider">Images</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                                        <VideoIcon className="size-6 text-pink-400" />
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-white">{credits.video}</p>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider">Videos</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <SignedIn>
                                    <div className="flex justify-center">
                                        <UserButton afterSignOutUrl="/" showName />
                                    </div>
                                </SignedIn>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button onClick={() => setIsOpen(false)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button onClick={() => setIsOpen(false)} className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-purple-900/20">
                                            Create Account
                                        </button>
                                    </SignUpButton>
                                </SignedOut>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}