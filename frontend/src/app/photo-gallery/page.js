// frontend/src/app/photo-gallery/page.js

// import React from 'react';    
// 
// This file is now using a new data structure for the photo gallery

import Image from 'next/image';
import galleryEvents from '@/data/galleryEvents'; // Import your new data file

export const metadata = {
  title: 'CARC Photo Gallery',
  description: 'Browse photos from Coastside Amateur Radio Club events and meetings.',
};

export default function CARCPhotoGalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">
        CARC Photo Gallery
      </h1>

      <p className="text-gray-700 leading-relaxed mb-8 text-center">
        Explore memorable moments from our club meetings, Field Day events, and other amateur radio activities!
      </p>

      {galleryEvents.length > 0 ? (
        galleryEvents.map(event => (
          <section key={event.id} className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 border-b pb-3 mb-4">
              {event.name} ({event.date})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {event.photos.map(photo => (
                <div key={photo.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={`/images/gallery/${event.folder}/${photo.filename}`} // Dynamic path construction
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    // Optional: If you want a blurred placeholder while loading (requires blurDataURL)
                    // You'd need to generate blurDataURL for each image during your build process
                    // or for small number of images, manually add them to the data.
                    // placeholder="blur"
                    // blurDataURL="/path/to/tiny/blurred/base64_image.jpg"
                  />
                  <div className="p-4 bg-white">
                    {/* You can add a photo caption here if you add it to your data */}
                    <p className="text-gray-800 font-semibold text-sm">{photo.alt}</p>
                    {/* <p className="text-sm text-gray-600">{photo.caption}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="text-gray-600 italic text-center">No event photos available yet. Check back soon!</p>
      )}
    </div>
  );
}