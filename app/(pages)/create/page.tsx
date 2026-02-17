'use client'
import { useState, useRef } from "react";
import SectionTitle from "@/components/SectionTitle";
import { motion } from "motion/react";
import { XIcon, SparklesIcon, Image as ImageIcon, ShirtIcon, VideoIcon, CameraIcon } from "lucide-react";
import Image from "next/image";

export default function CreatePage() {
    const [personImage, setPersonImage] = useState<string | null>(null);
    const [dressImage, setDressImage] = useState<string | null>(null);
    const [creationName, setCreationName] = useState("");
    const [aspectRatio, setAspectRatio] = useState("9:16");
    const [prompt, setPrompt] = useState("");
    const [generationType, setGenerationType] = useState<"image" | "video">("image");

    const personInputRef = useRef<HTMLInputElement>(null);
    const dressInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string | null) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setter(url);
        }
    };

    const ratios = ["1:1", "9:16", "16:9", "4:5"];

    return (
        <div className="min-h-screen pt-20 pb-32 px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle
                text1="Create"
                text2="Design your perfect look"
                text3="Upload a photo of yourself and the outfit you want to try. Let GenGenie work its magic."
            />

            <div className="mt-16 grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch">

                {/* Image Uploads */}
                <motion.div
                    className="lg:col-span-7 flex flex-col gap-6 h-full"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Person Upload */}
                        <UploadCard
                            title="Person Image"
                            icon={<ImageIcon className="size-6 mb-2 text-purple-400" />}
                            image={personImage}
                            setImage={setPersonImage}
                            inputRef={personInputRef}
                            handleFileChange={(e: any) => handleFileChange(e, setPersonImage)}
                        />

                        {/* Dress Upload */}
                        <UploadCard
                            title="Dress Image"
                            icon={<ShirtIcon className="size-6 mb-2 text-pink-400" />}
                            image={dressImage}
                            setImage={setDressImage}
                            inputRef={dressInputRef}
                            handleFileChange={(e: any) => handleFileChange(e, setDressImage)}
                        />
                    </div>

                    {/* Preview */}
                    <div className="bg-purple-950/20 border border-purple-900/50 rounded-2xl p-8 min-h-75 flex-1 flex items-center justify-center text-center">
                        {personImage && dressImage ? (
                            <div className="flex flex-col items-center gap-4 text-purple-300">
                                <SparklesIcon className="size-8 animate-pulse" />
                                <span className="text-lg font-medium">Ready to Generate {generationType === 'image' ? 'Image' : 'Video'}!</span>
                            </div>
                        ) : (
                            <p className="text-slate-500 text-sm">Upload both images to see the magic preview.</p>
                        )}
                    </div>
                </motion.div>

                {/* Right Side */}
                <motion.div
                    className="lg:col-span-5 flex flex-col gap-8 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl h-full"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Creation Name */}
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Name of Creation</label>
                        <input
                            type="text"
                            value={creationName}
                            onChange={(e) => setCreationName(e.target.value)}
                            placeholder="e.g. Summer Date Night"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    {/* Generation Mode Selector */}
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-3">Generation Mode</label>
                        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                            <button
                                onClick={() => setGenerationType("image")}
                                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${generationType === "image"
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                <CameraIcon size={16} />
                                Image
                            </button>
                            <button
                                onClick={() => setGenerationType("video")}
                                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${generationType === "video"
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                <VideoIcon size={16} />
                                Video
                            </button>
                        </div>
                    </div>

                    {/* Aspect Ratio */}
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-3">Aspect Ratio</label>
                        <div className="grid grid-cols-4 gap-3">
                            {ratios.map((ratio) => (
                                <button
                                    key={ratio}
                                    onClick={() => setAspectRatio(ratio)}
                                    className={`py-2 rounded-lg text-sm font-medium border transition-all ${aspectRatio === ratio
                                        ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25"
                                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-purple-500/50"
                                        }`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Promp */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-slate-300 text-sm font-medium">Prompt (Optional)</label>
                            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">AI Enhanced</span>
                        </div>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe any specific adjustments..."
                            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-white resize-none focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    {/* Generate Button */}
                    <button className="w-full py-4 mt-auto bg-linear-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2">
                        <SparklesIcon className="size-5 fill-white" />
                        Generate {generationType === 'image' ? 'Image' : 'Video'}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

// Helper Component for Upload Cards
function UploadCard({ title, icon, image, setImage, inputRef, handleFileChange }: any) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-slate-300 text-sm font-medium pl-1">{title}</span>
            <div
                onClick={() => inputRef.current?.click()}
                className={`relative h-64 w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group ${image ? "border-purple-500/50" : "border-slate-700 hover:border-purple-500/50 hover:bg-slate-800/30"
                    }`}
            >
                <input
                    type="file"
                    hidden
                    ref={inputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {image ? (
                    <>
                        <Image src={image} alt={title} fill className="object-cover" />
                        <button
                            onClick={(e) => { e.stopPropagation(); setImage(null); }}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 rounded-full text-white backdrop-blur-sm transition"
                        >
                            <XIcon size={16} />
                        </button>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 group-hover:text-purple-300 transition">
                        {icon}
                        <p className="text-sm font-medium">Click to upload</p>
                        <p className="text-xs opacity-60 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                )}
            </div>
        </div>
    );
}