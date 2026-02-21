'use client'
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
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
import toast from "react-hot-toast";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useUser();
    const { getToken } = useAuth();

    const [credits, setCredits] = useState(0);

    const getCredits = async () => {
        try {
            const token = await getToken();

            const { data } = await api.get("/api/user/credits", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
            setCredits(data.credits);
        } catch (error: any) {
            console.error("Error fetching credits:", error);
            setCredits(0);
            toast.error("Failed to fetch credits. Please try again later.");
        }
    }

    useEffect(() => {
        if (user) {
            (async () => 
                await getCredits()
            )();
        }
    }, [user])


    return (
        <>
            <motion.nav
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-7xl rounded-2xl py-4 px-6 md:px-12 backdrop-blur-md bg-slate-950/50 border border-slate-800"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link href="/" className="flex justify-center items-center gap-1">
                    <Image className="h-8.5 w-auto" src="/assets/gengenie.png" alt="logo" width={130} height={34} priority />
                    <span className="text-2xl">Genie</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    {navlinks.map((link: INavLink) => (
                        <Link key={link.name} href={link.href} className="hover:text-purple-500 transition">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* auth controls for desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        {/* Desktop Sign In */}
                        <SignInButton mode="modal">
                            <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all rounded-full">
                                Sign In
                            </button>
                        </SignInButton>

                        {/* Desktop Sign Up */}
                        <SignUpButton mode="modal">
                            <button className="px-6 py-2.5 border border-purple-600 text-purple-600 hover:bg-purple-50 active:scale-95 transition-all rounded-full">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                </div>
                <button onClick={() => setIsOpen(true)} className="md:hidden">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-black/80 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {navlinks.map((link: INavLink) => (
                    <Link key={link.name} href={link.href} onNavigate={() => setIsOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {/* mobile menu */}
                <div className="flex flex-col items-center gap-4 pt-6">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 transition-all rounded-full"
                            >
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-2.5 border border-purple-600 text-purple-600 hover:bg-purple-50 transition-all rounded-full"
                            >
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                </div>

                <button onClick={() => setIsOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-purple-600 hover:bg-purple-700 transition text-white rounded-md flex">
                    <XIcon />
                </button>
            </div>
        </>
    );
}