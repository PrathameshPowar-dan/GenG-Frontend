'use client'
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeftIcon, DownloadIcon, Share2Icon, SparklesIcon, CalendarIcon, ScalingIcon, InfoIcon } from "lucide-react";
import Image from "next/image";

// Mock Datab
const mockProjectDetails = {
    id: "1",
    name: "Summer Date Night",
    type: "image",
    userPrompt: "Make the lighting warm and dramatic, like a sunset golden hour.",
    aspectRatio: "9:16",
    createdAt: "October 24, 2023",
    uploadedPerson: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop",
    uploadedDress: "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=500&auto=format&fit=crop",
    generatedImage: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop",
    generatedVideo: "",
};

export default function ProjectDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id;

    const project = mockProjectDetails;

    return (
        <div className="min-h-screen pt-24 pb-32 px-4 md:px-16 lg:px-24 xl:px-32">

            {/* Header & Back Button */}
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

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                        <Share2Icon size={16} />
                        Share
                    </button>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/25 transition-all">
                        <DownloadIcon size={16} />
                        Download High-Res
                    </button>
                </div>
            </motion.div>

            {/* Grid */}
            <div className="mt-8 grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">

                {/* Left Side */}
                <motion.div
                    className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-3xl p-4 overflow-hidden"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-black">
                        {project.type === "video" && project.generatedVideo ? (
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
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs font-medium text-purple-300">
                            <SparklesIcon size={14} />
                            AI Generated Result
                        </div>
                    </div>
                </motion.div>

                {/* Right Side */}
                <motion.div
                    className="lg:col-span-5 flex flex-col gap-6"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Info */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                        <h1 className="text-3xl font-bold text-white mb-6">{project.name}</h1>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><CalendarIcon size={12} /> Created On</span>
                                <span className="text-slate-100 text-sm">{project.createdAt}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><ScalingIcon size={12} /> Aspect Ratio</span>
                                <span className="text-slate-100 text-sm">{project.aspectRatio}</span>
                            </div>
                            <div className="flex flex-col gap-1 col-span-2 mt-2">
                                <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><InfoIcon size={12} /> Custom Prompt</span>
                                <span className="text-slate-100 text-sm italic bg-slate-950 p-3 rounded-xl border border-slate-800 mt-1">
                                    "{project.userPrompt || "No custom prompt provided."}"
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Original Inputs Display */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                            Original Inputs
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Person Input */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-slate-400 font-medium">Person</span>
                                <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-slate-700">
                                    <Image src={project.uploadedPerson} alt="Person Input" fill className="object-cover" />
                                </div>
                            </div>

                            {/* Dress Input */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-slate-400 font-medium">Dress</span>
                                <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-slate-700">
                                    <Image src={project.uploadedDress} alt="Dress Input" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}