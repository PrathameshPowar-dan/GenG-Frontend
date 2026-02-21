'use client'
import { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import { motion, AnimatePresence } from "motion/react";
import { PlayIcon, ImageIcon, VideoIcon, LayoutGridIcon, DownloadIcon, Share2Icon, TrashIcon, SparklesIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import api from "@/configs/axios";

// Utility functions
const downloadFile = async (url: string, fileName: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
        toast.success("Downloaded successfully!");
    } catch (error) {
        console.error("Download failed:", error);
        toast.error("Failed to download file");
    }
};

const shareFile = async (url: string) => {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            toast.success("Link copied to clipboard!");
        }
    } catch (error) {
        console.error("Copy failed:", error);
        toast.error("Failed to copy link");
    }
};

export default function MyClothesPage() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [filter, setFilter] = useState<"all" | "image" | "video">("all");
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const token = await getToken();
            if (!token) return;

            const { data } = await api.get('/api/user/creations', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // console.log(data)

            setProjects(data.creations || []);
        } catch (error) {
            console.error("Failed to fetch creations:", error);
            toast.error("Failed to load your gallery.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchProjects();
        } else if (isLoaded && !isSignedIn) {
            setIsLoading(false);
        }
    }, [isLoaded, isSignedIn]);

    // Format project data to easily identify type
    const formattedProjects = projects.map(p => ({
        ...p,
        type: p.generatedVideo ? "video" : "image"
    }));

    const filteredProjects = formattedProjects.filter(project =>
        filter === "all" ? true : project.type === filter
    );

    const handleDeleteProject = async (projectId: string) => {
        try {
            const token = await getToken();
            await api.delete(`/api/create/delete/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            toast.success("Creation deleted!");
            setProjects(prev => prev.filter(p => p.id !== projectId));
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete creation");
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 md:px-16 lg:px-24 xl:px-32">
            <Toaster position="top-center" />
            <SectionTitle
                text1="Gallery"
                text2="My Clothes"
                text3="View and manage your generated outfits and videos."
            />

            {/* Filter Tabs */}
            <motion.div
                className="mt-12 flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            >
                <div className="flex bg-slate-900/50 border border-slate-800 p-1.5 rounded-full backdrop-blur-md">
                    <FilterButton active={filter === "all"} onClick={() => setFilter("all")} icon={<LayoutGridIcon size={16} />} label="All" />
                    <FilterButton active={filter === "image"} onClick={() => setFilter("image")} icon={<ImageIcon size={16} />} label="Images" />
                    <FilterButton active={filter === "video"} onClick={() => setFilter("video")} icon={<VideoIcon size={16} />} label="Videos" />
                </div>
            </motion.div>

            {isLoading ? (
                <div className="mt-20 flex flex-col items-center justify-center text-purple-400">
                    <Loader2 className="size-10 animate-spin mb-4" />
                    <p>Loading your wardrobe...</p>
                </div>
            ) : (
                <>
                    {/* Grid */}
                    <motion.div
                        layout
                        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    onDelete={() => handleDeleteProject(project.id)} 
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 text-center border border-purple-500/30 rounded-3xl p-16 bg-slate-900/50"
                        >
                            <p className="text-gray-400 mb-6 text-lg">Your wardrobe is empty!</p>
                            <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-medium shadow-lg shadow-purple-900/20 hover:bg-purple-500 hover:scale-105 active:scale-95 transition-all">
                                <SparklesIcon size={18} />
                                Create Your First Outfit
                            </Link>
                        </motion.div>
                    )}
                </>
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

function ProjectCard({ project, onDelete }: any) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const isGenerating = project.isGenerating;

    const handleDownload = async () => {
        setIsDownloading(true);
        const fileExtension = project.type === 'video' ? 'mp4' : 'jpg';
        const fileName = `${project.name.replace(/\s+/g, '_')}.${fileExtension}`;
        const mediaUrl = project.type === 'video' ? project.generatedVideo : project.generatedImage;

        if (mediaUrl) await downloadFile(mediaUrl, fileName);
        setIsDownloading(false);
    };

    const handleShare = async () => {
        setIsSharing(true);
        const mediaUrl = project.type === 'video' ? project.generatedVideo : project.generatedImage;

        if (mediaUrl) await shareFile(mediaUrl);
        setIsSharing(false);
    };

    const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 flex flex-col"
        >
            <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                {isGenerating ? (
                    <div className="flex flex-col items-center text-purple-400">
                        <Loader2 className="size-8 animate-spin mb-2" />
                        <span className="text-xs font-medium">Processing Magic...</span>
                    </div>
                ) : project.error ? (
                    <div className="text-center px-4">
                        <span className="text-red-400 text-xs font-medium block mb-1">Failed</span>
                        <span className="text-slate-500 text-[10px]">{project.error}</span>
                    </div>
                ) : (
                    <>
                        <Image
                            src={project.generatedImage || project.uploadedImages[0]}
                            alt={project.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {project.type === "video" && project.generatedVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors pointer-events-none">
                                <div className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white group-hover:scale-110 transition-transform">
                                    <PlayIcon size={20} fill="currentColor" />
                                </div>
                            </div>
                        )}
                    </>
                )}

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-1.5 z-10">
                    {project.type === 'video' ? <VideoIcon size={12} /> : <ImageIcon size={12} />}
                    <span className="capitalize">{project.type}</span>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-white truncate pr-2">{project.name}</h3>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap pt-1">{formattedDate}</span>
                </div>

                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading || isGenerating || !!project.error}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:text-slate-500 text-slate-200 text-xs py-2 rounded-lg transition-colors"
                    >
                        <DownloadIcon size={14} />
                        {isDownloading ? "..." : "Download"}
                    </button>
                    <button
                        onClick={handleShare}
                        disabled={isSharing || isGenerating || !!project.error}
                        className="p-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:text-slate-500 text-slate-200 rounded-lg transition-colors"
                        title="Share this creation"
                    >
                        <Share2Icon size={14} />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 bg-slate-800 hover:bg-red-900/80 text-slate-200 hover:text-white rounded-lg transition-colors"
                        title="Delete this creation"
                    >
                        <TrashIcon size={14} />
                    </button>
                </div>

                <div className="mt-4">
                    <Link href={`/my-clothes/${project.id}`} className="block p-2 rounded-xl bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600 w-full text-center text-sm font-medium text-purple-300 hover:text-white transition-all">
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}