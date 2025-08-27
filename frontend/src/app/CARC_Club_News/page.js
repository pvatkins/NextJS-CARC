// frontend/src/app/CARC_News/page.js

// import React from "react";   // No need to import React in Next.js 13+ with the new app directory
import Link from "next/link"; // For internal links
import SideMenu from "@/components/SideMenu"; // Assuming your SideMenu component path

export const metadata = {
  title: "CARC News",
  description: "Latest news and updates from the Coastside Amateur Radio Club (CARC).",
};

export default function CARCNews() {
  return (
    // The main container will use a grid layout for the sidebar and content
    // 'md:grid-cols-[250px_1fr]' sets a fixed sidebar width on medium screens and up
    // 'gap-8' adds space between the grid columns
    <div bg-url="/images/carc_background.jpg" className="p-4 md:grid md:grid-cols-[250px_1fr] gap-8">
        {/* The page header */}
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
                Coastside ARC News
            </h2>
        </div>

        {/* The news items */}
        <div className="space-y-4">

            {/* News item 0, Upcoming Ham Radio Flea Market in Pacifica */}
            <div className="p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-150">
              <h3 className="text-lg font-semibold mb-2">
                Upcoming Ham Radio Flea Market in Pacifica
              </h3>
                <p className="text-gray-700 mb-2">
                    Join us for the upcoming Amateur Radio & Electronics Garage Sale in Pacifica on 
                    Saturday, August 9 from 9AM until 4 PM presented by K6BV & K6KLY!
                    A great opportunity to buy, sell, and trade radio equipment!
                    see the <Link href="https://pacificaham.org/flea-market/">Pacifica Ham Radio website</Link> for more details.
                </p>
            </div>  

          {/* News Item 1: External Link */}
          <div className="p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-150">
            {/* IMPORTANT: For external links, use a standard <a> tag */}
            <a
              href="http://www.carlaradio.net/wattsnew/index.php?wid=309"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Security best practice for target="_blank"
              className="text-blue-600 hover:underline font-medium text-lg block"
            >
              Thank You note for the $1000 donation made by CARC for the repair of the repeater burned up in the 2018 Carr fire.
            </a>
            {/* Added a <br> here like your original, though p tags usually handle breaks */}
            <p className="text-sm text-gray-500 mt-1">
              (Link to CARLA Radio - Watts New page)
            </p>
          </div>

          {/* News Item 2: Internal Link (assuming it becomes a Next.js page) */}
          <div className="p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-150">
            {/* IMPORTANT: For internal links, use Next.js's <Link> component */}
            {/* Assuming this "index.html" becomes a Next.js page, e.g., /coastside-arc-news-files */}
            <Link href="/coastside-arc-news-files" passHref>
              <span className="text-blue-600 hover:underline font-medium text-lg block cursor-pointer">
                Dave Conroy, operating as VA3NIA, from his cottage in Canada (gridsquare FN15ac).
              </span>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
                (Link to details about Dave Conroy's operation)
            </p>
          </div>
        </div>
      
    </div>
  );
}
