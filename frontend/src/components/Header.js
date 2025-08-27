<<<<<<< HEAD
// frontend/src/components/Header.js
// frontend/src/components/Header.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        // Use a flex container for the entire header.
        // 'items-center' will vertically center all direct children (logo and title).
        // 'space-x-4' adds consistent horizontal space between the logo and title.
        <header className="bg-blue-600 text-white py-4 px-6 flex items-center space-x-6 relative">

            {/* Logo container, as a direct child of the flex container */}
            <div className="flex-shrink-0">
                <Link href="/" passHref>
                    {/* The Image component with fixed width and height */}
                    <Image
                        src="/images/misc/wa6tow-logo.gif"
                        alt="Coastside ARC Club Logo"
                        width={60}  // Adjusted to a more common header height
                        height={60} // Adjusted to a more common header height
                        priority
                    />
                </Link>
            </div>

            {/* Title container, as a direct child */}
            {/* 'flex-grow' allows it to take up the rest of the space,
               but we can remove it for a simpler centered look */}
            <div className="flex-grow text-center">
                <h1 className="text-3xl font-bold">
                    Coastside Amateur Radio Club
                </h1>
            </div>

=======
import React from 'react';

const Header = () => {
    return (
        <header className = "bg-blue-600 text-white text-center p-4">
            <h1 className = "text-3xl font-bold">Coastside ARC NextJS Web Project</h1>
>>>>>>> e7a11db (Initial commit of new website under development)
        </header>
    );
};

<<<<<<< HEAD
export default Header;
=======
export default Header;

// This is a simple header component for a web project.
// It uses Tailwind CSS for styling and displays a title.
// The header has a blue background and white text, with padding for spacing.
// The title is centered and uses a larger font size for emphasis.

>>>>>>> e7a11db (Initial commit of new website under development)
