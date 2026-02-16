import { IPricing } from "@/types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 0,
        period: "month",
        features: [
            "Access to all basic courses",
            "Community support",
            "10 practice projects",
            "Course completion certificate",
            "Basic code review"
        ],
        mostPopular: true
    },
    {
        name: "Pro",
        price: 69,
        period: "month",
        features: [
            "Video Dress Mode",
            "Access to all Pro",
            "Priority dress support",
            "30 projects",
            "Dress upscale",
            "Advance AI",
            "Ads assistance"
        ],
        mostPopular: true
    }
];