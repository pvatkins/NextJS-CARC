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
    <div bg-url="/images/carc_background.jpg" >
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
                </p>
            </div>  

          
        </div>
      
    </div>
  );
}
