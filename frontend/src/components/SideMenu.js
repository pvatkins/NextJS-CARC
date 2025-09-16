// frontend/src/components/SideMenu.js
"use client"; // This component needs client-side interactivity
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideMenu = () => {
  const pathname = usePathname();

  // Helper for separators
  const sep = (id) => ({ type: "separator", id });

  const menuItems = [
    { name: "CARC Home Page", path: "/home-page" },
    { name: "CARC About CARC", path: "/about-carc" },
    { name: "CARC PayPal Dues", path: "/paypal-dues" },
    { name: "CARC Privacy Policy", path: "/privacy-policy" },
    { name: "CARC Coming Events", path: "/coming-events" },
    { name: "CARC Newsletters", path: "/newsletter" },
    { name: "CARC Presentations", path: "/presentations" },
    { name: "CARC Field Day", path: "/field-day" },
    { name: "CARC Photo Gallery", path: "/photo-gallery" },
    { name: "CARC Club News", path: "/club-news" },
    { name: "CARC Exams", path: "/exams" },
    { name: "CARC Net Control Roster", path: "/net-control-roster" },
    { name: "CARC Links", path: "/links" },
    { name: "CARC North Peak Repeater Site", path: "/north-peak" },
    { name: "CARC Officers & Staff", path: "/officers-staff" },
    { name: "CARC Repeater Calendar", path: "/repeater-calendar" },
    { name: "CARC Repeater Usage", path: "/repeater-usage" },
    { name: "CARC Wants and Swaps", path: "/wants-swaps" },
    sep("carc_separator_1"),
    { name: "Test Get Full Name", path: "/test-get-full-name" },
    sep("carc_separator_2"),
    // Some Documents (shown in Blue text)
    {
      name: "CARC Net Checkin Script",
      type: "pdf",
      url: "/documents/CARC_NET_CHECK-IN_SCRIPT.pdf",
    },
    {
      name: "CARC NET CONTROL Operator Guide",
      type: "pdf",
      url: "/documents/CARC_Net_Control_Operator_Guide-DR_MODIFIED.pdf",
    },
    {
      name: "CARC Repeater User Guide",
      type: "pdf",
      url: "/documents/CARC_Repeater_User_Guide-DR-1_MODIFIED.pdf",
    },
    {
      name: "CARC Membership Form",
      type: "pdf",
      url: "/documents/CARC_MembershipForm.pdf",
    },
    {
      name: "CARC CONSTITUTION & BYLAWS (PDF)",
      type: "pdf",
      url: "/documents/CARC Constitution and Bylaws -- adopted June 11_2014.pdf",
    },
    sep("carc_separator_3"),
    // The original menu items created at the start of the project
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  return (
    <nav className="w-64 bg-gray-100 p-4 shadow-lg h-full">
      <ul className="space-y-0">
        {menuItems.map((item) => {
          const key = item.type === "separator" ? item.id : item.name;

          if (item.type === "separator") {
            return (
              <li key={key} className="my-4">
                <hr className="border-t border-gray-400" />
              </li>
            );
          } else if (item.type === "pdf") {
            return (
              <li key={key}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 rounded text-blue-600 hover:bg-gray-200 transition"
                >
                  {item.name}
                </a>
              </li>
            );
          } else {
            return (
              <li key={key}>
                <Link
                  href={item.path}
                  className={`block p-2 rounded transition ${
                    pathname === item.path
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default SideMenu;
