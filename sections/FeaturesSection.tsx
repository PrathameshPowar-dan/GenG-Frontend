'use client'
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { featuresData } from "@/data/features";
import { IFeature } from "@/types";
import Link from "next/link";

export default function FeaturesSection() {
    return (
        <div id="features" className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle text1="Features" text2="What you get" text3="Everything you need to Dress Up." />
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
                {featuresData.map((feature: IFeature, index: number) => (
                    <motion.div key={index} className={'p-px rounded-[13px] bg-linear-to-br from-purple-600 to-slate-800'}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 max-w-80 w-full">
                            {feature.icon}
                            <h3 className="text-base font-medium text-white">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 line-clamp-2 pb-4">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-40 relative mx-auto max-w-5xl">
                <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-purple-500/40 blur-3xl"></div>
                <motion.p className="text-slate-300 text-lg text-left max-w-3xl"
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    GenGenie helps you dress faster by transforming your vision into fully functional you, Occassian ready you.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
                    <motion.div className="md:col-span-2"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                    >
                        <Image className="h-full rounded-3xl w-auto" src="/assets/GenGenieShowCase2.png" alt="features showcase" width={1000} height={500} />
                    </motion.div>
                    <motion.div className="md:col-span-1"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <Image src="/assets/GenGenieShowCase3.png"  alt="features showcase" width={1000} height={500} className="hover:-translate-y-0.5 rounded-2xl transition duration-300" />
                        <h3 className="text-[24px]/7.5 text-slate-300 font-medium mt-6">Clothes matter to! </h3>
                        <p className="text-slate-300 mt-2">GenGenie empowers you to dress beautifully and scale effortlessly.</p>
                        <Link href="/" onClick={()=>scrollTo(0,0)} className="group flex items-center gap-2 mt-4 text-purple-600 hover:text-purple-700 transition">
                            Learn More
                            <ArrowUpRight className="size-5 group-hover:translate-x-0.5 transition duration-300" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}