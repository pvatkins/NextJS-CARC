
// frontend/src/app/layout.js (was .tsx)
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Demonstration Web Project',
    description: 'A Next.js and Express.js demonstration project',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <div className="flex flex-1">
                        <SideMenu />
                        <main className="flex-1 p-8">
                            {children}
                        </main>
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
