// frontend/src/app/CARC_Home_Page/page.js

import Link from "next/link";
import Image from "next/image"; // Import Image component

export const metadata = {
  title: "CARC Home Page",
  description: "This is the official homepage for the Coastside Amateur Radio Club (CARC), featuring meeting information, nets, and membership details.", // Corrected description syntax
};

// Data for repetitive image-link blocks (Optional, but makes it cleaner)
const homePageQuickLinks = [
  {
    imageSrc: "/images/misc/tow_003.gif", // Path relative to public/
    imageAlt: "Small tower icon", // Descriptive alt text
    title: "Next Meeting -- 2nd Wed of the month",
    linkHref: "/CARC_Coming_Events", // Link to your Next.js Coming Events page
    description: `Meetings of the Coastside Amateur Radio Club are generally held in the Emergency Operations Center (EOC) at the Pacifica Police Station, 2075 Coast Highway, Pacifica on the second Wednesday at 7:30 PM.

                  However, special meetings may be held at other locations. For additional detail, please refer to the
                  Meeting/Event Schedule.

                  In conjunction, we will attempt to include participants via Zoom at the address included
                  with the meeting notice. We follow COVID-19 recommendations set forth by the County of San Mateo.`,
  },
  {
    imageSrc: "/images/misc/tow_003.gif",
    imageAlt: "Small tower icon",
    title: "CARC VHF & HF Nets",
    linkHref: "/CARC_About_CARC", // Link to your Next.js About CARC page (where net info is)
  },
  {
    imageSrc: "/images/misc/tow_003.gif",
    imageAlt: "Small tower icon",
    title: "Net Control Roster",
    linkHref: "/CARC_Net_Control_Roster", // Assuming you'll create this page
  },
];

export default function CARCHomePage() {
  return (
    // Main content container, centered with consistent padding and max-width.
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10"> {/* Increased space-y for clear sections */}

      {/* Main Title / Welcome */}
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Welcome to the Coastside Amateur Radio Club!
      </h1>

      {/* Dynamic Quick Links Section */}
      <section className="space-y-6">
        {homePageQuickLinks.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
            {/* Image */}
            <div className="flex-shrink-0">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                width={50} // Adjust based on actual image size or use 'fill'
                height={50} // Adjust based on actual image size
                className="w-12 h-12 object-contain"
              />
            </div>
            
            {/* Link and Content */}
            <div className="flex-grow space-y-2">
              <Link href={item.linkHref} passHref>
                <span className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer block">
                  {item.title}
                </span>
              </Link>
              {item.description && (
                <p className="text-gray-700 leading-relaxed text-base italic whitespace-pre-line">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Membership Section */}
      <section className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-2 mb-4 text-center">
          Join or Renew Your Membership
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg italic">
          To join the club or renew your membership, you have two options:
        </p>

        <div className="space-y-4">
            {/* Option 1: Mail-in Application */}
            <p className="text-gray-700 leading-relaxed text-lg">
                Please download and complete a
                <a
                target="_blank"
                href="/documents/CARC_MembershipForm.pdf" // Path relative to public/
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium ml-1"
                >
                CARC membership application form
                </a>
                and return with a Self-Addressed Stamped Envelope to:
            </p>
            <address className="text-gray-800 text-lg font-semibold ml-8 md:ml-12 leading-relaxed">
                Coastside Amateur Radio Club<br />
                P.O. Box 1106<br />
                Pacifica, CA 94044-6106
            </address>

            {/* Option 2: Online Payment (Link to PayPal Dues page) */}
            <p className="text-gray-700 leading-relaxed text-lg">
                Alternatively, you can renew or join online via our PayPal Dues form:
                <br />
                <Link href="/CARC_Paypal_Dues" passHref>
                    <span className="text-blue-600 hover:underline font-medium cursor-pointer mt-2 block">
                        Pay Dues Online with PayPal
                    </span>
                </Link>
            </p>

            {/* General Email Contact */}
            <p className="text-gray-700 leading-relaxed text-lg">
                For general inquiries, you may also email us at:
                <br />
                <a href="mailto:info@coastsidearc.org" className="text-blue-600 hover:underline font-medium">
                info@coastsidearc.org
                </a>
            </p>
        </div>
      </section>
    </div>
  );
}