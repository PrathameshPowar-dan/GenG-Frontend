import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export const metadata = {
    title: 'GenGenie',
    description: 'Dress up',
    appleWebApp: {
        title: 'GenGenie',
    },
};

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
