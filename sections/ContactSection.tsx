'use client'
import SectionTitle from "@/components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            // Replace 'YOUR_FORM_ID_HERE' with your actual Formspree endpoint ID (e.g., 'mvoeqbqw')
            const response = await fetch("https://formspree.io/f/xpwlzwno", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Message sent successfully! We'll be in touch.");
                form.reset();
            } else {
                if (Object.hasOwn(data, 'errors')) {
                    const errorMessages = data.errors.map((error: any) => error.message).join(", ");
                    toast.error(errorMessages || "Please fix the errors and try again.");
                } else {
                    toast.error("Something went wrong.");
                }
            }
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 pb-20">
            <SectionTitle text1="Contact" text2="Reach out to us" text3="Ready to grow your brand? Let’s connect and build something exceptional together." />

            <form onSubmit={handleSubmit} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full' >
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Your name</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 bg-slate-900/50 focus-within:border-purple-500 focus-within:bg-slate-900 transition-colors'>
                        <UserIcon className='size-5 text-slate-400' />
                        <input name='name' type="text" required placeholder='Enter your name' className='w-full p-3 bg-transparent outline-none' />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Email id</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 bg-slate-900/50 focus-within:border-purple-500 focus-within:bg-slate-900 transition-colors'>
                        <MailIcon className='size-5 text-slate-400' />
                        <input name='email' type="email" required placeholder='Enter your email' className='w-full p-3 bg-transparent outline-none' />
                    </div>
                </motion.div>

                <motion.div className='sm:col-span-2'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Message</p>
                    <textarea name='message' required rows={6} placeholder='Enter your message' className='w-full p-4 bg-slate-900/50 border border-slate-700 rounded-lg outline-none focus:border-purple-500 focus:bg-slate-900 transition-colors resize-none' />
                </motion.div>

                <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-max flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-800 disabled:text-slate-400 text-white px-10 py-3 rounded-full transition-colors'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Submit
                            <ArrowRightIcon className="size-5" />
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    );
}