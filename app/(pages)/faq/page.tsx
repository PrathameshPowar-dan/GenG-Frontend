'use client'
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon, MessageCircleQuestionIcon } from "lucide-react";

const faqs = [
    {
        question: "What is GenGenie?",
        answer: "GenGenie is an AI-powered virtual try-on platform. You can upload a photo of yourself and a photo of an article of clothing (like a dress or a shirt), and our AI will generate a realistic image or video of you wearing that exact item."
    },
    {
        question: "How do the Credits work?",
        answer: "Every time you generate a new piece of content, it costs credits. Creating a standard Image costs 1 Image Credit. Creating a Video Try-On is more intensive and costs 1 Video Credit. You can view your balance in the top right menu when logged in!"
    },
    {
        question: "Why can't I select the Video option?",
        answer: "Video generation requires intense AI processing and is locked if you have 0 Video Credits. You will need to upgrade your plan in the 'Plans' section to unlock video generation capabilities."
    },
    {
        question: "What happens if a generation fails?",
        answer: "Don't worry! If the AI fails to generate your image or video due to a server error or safety flag, our system automatically detects it and refunds the credit back to your account immediately."
    },
    {
        question: "Are my uploaded photos safe and private?",
        answer: "Absolutely. We only use your uploaded images temporarily to generate the try-on results. We do not use your personal images to train our models, and you can delete your creations from your 'My Clothes' gallery at any time."
    },
    {
        question: "Can I use the images for commercial purposes?",
        answer: "Yes! Depending on the tier of your plan, you hold the rights to the generated images and can use them for your e-commerce store, social media, or personal mockups."
    }
];

export default function FAQPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle
                text1="Support"
                text2="Frequently Asked Questions"
                text3="Everything you need to know about GenGenie, credits, and generating your virtual wardrobe."
            />

            <div className="mt-16 max-w-3xl mx-auto flex flex-col gap-4">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-slate-900/50 border overflow-hidden rounded-2xl transition-colors duration-300 ${isActive ? "border-purple-500/50" : "border-slate-800 hover:border-slate-700"
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-purple-600/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>
                                        <MessageCircleQuestionIcon size={20} />
                                    </div>
                                    <span className="font-semibold text-slate-200 text-base md:text-lg">
                                        {faq.question}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: isActive ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`p-1 rounded-full ${isActive ? 'text-purple-400' : 'text-slate-500'}`}
                                >
                                    <ChevronDownIcon size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pt-2 text-slate-400 leading-relaxed ml-13">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* Still have questions CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
            >
                <p className="text-slate-400 mb-4">Still have questions?</p>
                <a href="mailto:powarprathamesh579@gmail.com" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors">
                    Contact Support
                </a>
            </motion.div>
        </div>
    );
}