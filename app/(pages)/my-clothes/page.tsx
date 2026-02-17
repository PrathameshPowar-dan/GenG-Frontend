'use client'
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { motion, AnimatePresence } from "motion/react";
import { PlayIcon, ImageIcon, VideoIcon, LayoutGridIcon, DownloadIcon, Share2Icon, SparklesIcon } from "lucide-react";
import Image from "next/image";

// Mock Data
const mockProjects: any[] = [
    // {
    //     id: "1",
    //     name: "Summer Vibes",
    //     generatedImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    //     generatedVideo: "",
    //     type: "image",
    //     createdAt: "2 days ago"
    // },
    // {
    //     id: "2",
    //     name: "Formal Suit Walk",
    //     generatedImage: "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=1000&auto=format&fit=crop",
    //     generatedVideo: "https://example.com/video.mp4",
    //     type: "video",
    //     createdAt: "5 days ago"
    // },
    // {
    //     id: "3",
    //     name: "Casual Friday",
    //     generatedImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
    //     generatedVideo: "",
    //     type: "image",
    //     createdAt: "1 week ago"
    // },
    // {
    //     id: "4",
    //     name: "Runway Ready",
    //     generatedImage: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop",
    //     generatedVideo: "https://example.com/video2.mp4",
    //     type: "video",
    //     createdAt: "2 weeks ago"
    // },
];

export default function MyClothesPage() {
    const [filter, setFilter] = useState<"all" | "image" | "video">("all");

    const filteredProjects = mockProjects.filter(project =>
        filter === "all" ? true : project.type === filter
    );

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle
                text1="Gallery"
                text2="My Clothes"
                text3="View and manage your generated outfits and videos."
            />

            {/* Filter Tabs */}
            <div className="mt-12 flex justify-center">
                <div className="flex bg-slate-900/50 border border-slate-800 p-1.5 rounded-full">
                    <FilterButton
                        active={filter === "all"}
                        onClick={() => setFilter("all")}
                        icon={<LayoutGridIcon size={16} />}
                        label="All"
                    />
                    <FilterButton
                        active={filter === "image"}
                        onClick={() => setFilter("image")}
                        icon={<ImageIcon size={16} />}
                        label="Images"
                    />
                    <FilterButton
                        active={filter === "video"}
                        onClick={() => setFilter("video")}
                        icon={<VideoIcon size={16} />}
                        label="Videos"
                    />
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center border border-purple-500 rounded-2xl p-10 text-slate-500"
                >
                    <p className="text-gray-400">No creations found for this category.</p>
                    <button>
                        <a href="/create" className="mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-900/20 hover:bg-purple-700 transition-colors">
                            <SparklesIcon size={16} />
                            Create Your First Outfit
                        </a>
                    </button>
                </motion.div>
            )}
        </div>
    );
}

function FilterButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${active
                ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function ProjectCard({ project }: any) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10"
        >
            <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                    src={project.generatedImage}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Video Indicator */}
                {project.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white group-hover:scale-110 transition-transform">
                            <PlayIcon size={20} fill="currentColor" />
                        </div>
                    </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-1.5">
                    {project.type === 'video' ? <VideoIcon size={12} /> : <ImageIcon size={12} />}
                    <span className="capitalize">{project.type}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-white truncate pr-2">{project.name}</h3>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{project.createdAt}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-lg transition-colors">
                        <DownloadIcon size={14} />
                        Download
                    </button>
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors">
                        <Share2Icon size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}