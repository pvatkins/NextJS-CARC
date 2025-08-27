// frontend/src/app/CARC_Coming_Events/page.js

// import React from "react"; (Not needed if not using React features directly)

// Link is not explicitly used in this rewritten version,
// but keep it if you plan to add internal links later.
// import Link from "next/link";

export const metadata = {
  title: "CARC Coming Events",
  description:
    "The calendar of events of the Coastside Amateur Radio Club (CARC) for the current year.",
};

const Events = [
  { Date: "Jan 8th", Event: "Firehouse Meeting ~ 2025 Event Planning" },
  { Date: "Jan 25th-26th", Event: "ARRL Winter Field Day" },
  { Date: "Feb 12th", Event: "CARC Meeting ~ 2025 Agenda Final" },
  { Date: "Mar 9th", Event: "Daylight Savings Time Begins" },
  { Date: "Mar 12th", Event: "CARC Meeting" },
  { Date: "Apr 9th", Event: "Pizza Meeting, Round Table Linda Mar" },
  { Date: "Apr 27th", Event: "HMBARC Dream Machines, HMB Airport" },
  {
    Date: "May 14th",
    Event: "CARC Meeting ~ Guest Speaker and Field Day Planning",
  },
  {
    Date: "Jun 11th",
    Event: "CARC Meeting ~ Guest Speaker Wayne of Elecraft ~ Final FD Planning",
  },
  { Date: "Jun 14th", Event: "Flag Day" },
  { Date: "Jun 28th-29th", Event: "ARRL Field Day" },
  { Date: "Jul 9th", Event: "CARC Meeting" },
  { Date: "Aug 13th", Event: "CARC Meeting" },
  { Date: "Sep 10th", Event: "CARC Meeting ~ Fog Fest Planning" },
  {
    Date: "Sep 27th-29th",
    Event: "Pacific Coast Fog Fest ~ Palmetto Ave., Pacifica ~ 10am - 6pm",
  },
  { Date: "Oct 8th", Event: "CARC Meeting ~ 2025 Event Planning" },
  { Date: "Oct 8th", Event: "CARC Meeting, 2026 Nomination of Officers" },
  { Date: "Nov 2nd", Event: "Daylight Savings Time Ends" },
  {
    Date: "Nov ??",
    Event:
      "CARC Dinner Meeting ~ Election of 2026 Officers ~ Location, Date & Time TBD",
  },
  { Date: "Dec 10th", Event: "CARC Meeting ~ Holiday Potluck" },
];

export default function CARCComingEvents() {
  // Get the current year to display dynamically in the heading
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">
        CARC Coming Events {currentYear}
      </h1>

      {/* Introductory Paragraph */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          Join the QCWA/Pioneer Radio Club luncheon every third Wednesday of
          each month at Harry's Hoffbrau, 1909 El Camino Real, Redwood City CA
          94063. Social hour begins at <b>11:00 AM</b>, followed by lunch at{" "}
          <b>11:30 AM</b>.
        </p>
      </div>


        {/* Dynamic Events Table */}
        <div className="overflow-x-auto"> {/* Ensures table is scrollable on small screens */}
          <table className="min-w-full text-left border-collapse bg-white shadow-md rounded-lg">
            <thead>
               <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-center font-semibold text-lg border-b border-gray-200">Date</th>
                <th className="py-3 px-4 text-left font-semibold text-lg border-b border-gray-200">Event</th>
              </tr>
            </thead>

<<<<<<< HEAD
<<<<<<< HEAD
            <tbody className="text-gray-700">
=======
>>>>>>> 99ec977 (Updates thru 2025-07-18:17:06)
=======
            <tbody className="text-gray-700">
>>>>>>> 5841ee7 (Development Through 2025-07-25)
                 {Events.map((event, index) => (
                <tr key={index} className="border-b border-gray-400 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="py-2 px-4 text-center text-gray-800 font-medium whitespace-nowrap">{event.Date}</td>
                  <td className="py-2 px-4 text-left text-gray-700">{event.Event}</td>
                </tr>
              ))}
<<<<<<< HEAD
<<<<<<< HEAD
            </tbody>
          </table>
=======

            </table>
>>>>>>> 99ec977 (Updates thru 2025-07-18:17:06)
=======
            </tbody>
          </table>
>>>>>>> 5841ee7 (Development Through 2025-07-25)
        </div>

      {/* Important Note about Meetings */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 mt-6">
        <p className="text-gray-700 leading-relaxed text-sm italic">
          <strong>*Note:</strong>
          All club meetings are currently held at <b>7:30 PM</b>a the Pacifica
          Police Station, 2075 Coast Highway, Pacifica, in the Multi-Media Room,
          unless otherwise posted. Where possible, all meetings will also have a
          Google Meet link available for those who cannot attend in person.
          Please check the website regularly for updates.
        </p>
      </div>
    </div>
  );
}
