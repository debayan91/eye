import PremiumHeader from './PremiumHeader'; // We kept the filename, but content is new Header
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <PremiumHeader />
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
