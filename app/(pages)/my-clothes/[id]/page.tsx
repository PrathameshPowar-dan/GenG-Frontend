'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeftIcon, DownloadIcon, Share2Icon, SparklesIcon, CalendarIcon, ScalingIcon, InfoIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import api from "@/configs/axios";
import toast, { Toaster } from "react-hot-toast";

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

export default function ProjectDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { getToken } = useAuth();

    const projectId = params.id;
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Button states
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const token = await getToken();
                if (!token) return;

                const { data } = await api.get(`/api/user/creation/${projectId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProject(data.creation);
            } catch (error) {
                console.error("Failed to fetch project:", error);
                toast.error("Failed to load details");
                router.push('/my-clothes'); // Redirect back if missing
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            fetchProjectDetails();
        }
    }, [projectId, getToken, router]);

    const handleDownload = async () => {
        setIsDownloading(true);
        const isVideo = !!project.generatedVideo;
        const fileExtension = isVideo ? 'mp4' : 'jpg';
        const fileName = `${project.name.replace(/\s+/g, '_')}.${fileExtension}`;
        const mediaUrl = isVideo ? project.generatedVideo : project.generatedImage;

        if (mediaUrl) await downloadFile(mediaUrl, fileName);
        setIsDownloading(false);
    };

    const handleShare = async () => {
        setIsSharing(true);
        const isVideo = !!project.generatedVideo;
        const mediaUrl = isVideo ? project.generatedVideo : project.generatedImage;

        if (mediaUrl) await shareFile(mediaUrl);
        setIsSharing(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-purple-400">
                <Loader2 className="size-12 animate-spin mb-4" />
                <p className="text-lg">Unpacking your outfit...</p>
            </div>
        );
    }

    if (!project) return null;

    const isVideo = !!project.generatedVideo;
    const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    });

    const uploadedPerson = project.uploadedImages?.[0];
    const uploadedDress = project.uploadedImages?.[1];

    return (
        <div className="min-h-screen pt-24 pb-32 px-4 md:px-16 lg:px-24 xl:px-32">
            <Toaster position="top-center" />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto flex items-center justify-between mb-8"
            >
                <button
                    onClick={() => router.push('/my-clothes')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeftIcon size={20} />
                    <span>Back to Gallery</span>
                </button>

                {!project.isGenerating && !project.error && (
                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            disabled={isSharing}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            {isSharing ? <Loader2 className="size-4 animate-spin" /> : <Share2Icon size={16} />}
                            Share
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/25 transition-all"
                        >
                            {isDownloading ? <Loader2 className="size-4 animate-spin" /> : <DownloadIcon size={16} />}
                            {isDownloading ? "Downloading..." : "Download Original"}
                        </button>
                    </div>
                )}
            </motion.div>

            <div className="mt-8 grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
                <motion.div
                    className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-3xl p-4 overflow-hidden"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                        {project.isGenerating ? (
                            <div className="flex flex-col items-center gap-4 text-purple-400">
                                <Loader2 className="size-12 animate-spin" />
                                <span className="font-medium text-lg text-white">We are weaving the fabric...</span>
                                <span className="text-sm text-slate-400">This usually takes about 20-30 seconds.</span>
                            </div>
                        ) : project.error ? (
                            <div className="text-center px-8 text-red-400">
                                <span className="font-bold text-xl block mb-2">Generation Failed</span>
                                <span className="text-sm text-red-400/80">{project.error}</span>
                            </div>
                        ) : isVideo ? (
                            <video
                                src={project.generatedVideo}
                                controls
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={project.generatedImage}
                                alt={project.name}
                                fill
                                className="object-cover"
                            />
                        )}

                        {!project.isGenerating && !project.error && (
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs font-medium text-purple-300 pointer-events-none">
                                <SparklesIcon size={14} />
                                AI Generated Result
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="lg:col-span-5 flex flex-col gap-6"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <h1 className="text-3xl font-bold text-white truncate">{project.name}</h1>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><CalendarIcon size={12} /> Created On</span>
                                <span className="text-slate-100 text-sm">{formattedDate}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><ScalingIcon size={12} /> Aspect Ratio</span>
                                <span className="text-slate-100 text-sm">{project.aspectRatio}</span>
                            </div>

                            <div className="flex flex-col gap-1 col-span-2 mt-2">
                                <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><InfoIcon size={12} /> Product Target</span>
                                <span className="text-slate-100 text-sm font-semibold capitalize bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1">
                                    {project.productName}
                                </span>
                            </div>

                            {project.userPrompt && (
                                <div className="flex flex-col gap-1 col-span-2 mt-1">
                                    <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><InfoIcon size={12} /> Custom Prompt</span>
                                    <span className="text-slate-300 text-sm italic bg-slate-950 p-3 rounded-xl border border-slate-800 mt-1">
                                        "{project.userPrompt}"
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                            Original Inputs
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-slate-400 font-medium">Person</span>
                                <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                                    {uploadedPerson ? (
                                        <Image src={uploadedPerson} alt="Person Input" fill className="object-cover" />
                                    ) : (
                                        <span className="absolute inset-0 flex items-center justify-center text-xs text-slate-600">No Image</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-slate-400 font-medium">Dress</span>
                                <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                                    {uploadedDress ? (
                                        <Image src={uploadedDress} alt="Dress Input" fill className="object-cover" />
                                    ) : (
                                        <span className="absolute inset-0 flex items-center justify-center text-xs text-slate-600">No Image</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}