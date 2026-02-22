import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes you want to protect
const isProtectedRoute = createRouteMatcher([
    '/create(.*)',
    '/my-clothes(.*)'
]);

// Check if the user is trying to access a protected route
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect(); // Redirects to sign-in if not logged in
    }
});

// Configure the matcher so it doesn't block static assets (images, css)
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};