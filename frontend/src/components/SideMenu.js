// frontend/src/components/SideMenu.js
"use client"; // This component needs client-side interactivity
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideMenu = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'CARC Home Page', path: '/CARC_Home_Page' },
        { name: 'CARC About CARC', path: '/CARC_About_CARC' },
        { name: 'CARC PayPal Dues', path: '/CARC_Paypal_Dues' },
        { name: 'CARC Privacy Policy', path: '/CARC_Privacy_Policy' },
        { name: 'CARC Coming Events', path: '/CARC_Coming_Events' },
        { name: 'CARC Newsletters', path: '/CARC_Newsletter' },
        { name: "CARC Presentations", path: "/CARC_Presentations" },
        { name: 'CARC Field Day', path: '/CARC_Field_Day' },
        { name: 'CARC Photo Gallery', path: '/CARC_Photo_Gallery' },
        { name: 'CARC Club News', path: '/CARC_Club_News' },
        { name: 'CARC Exams', path: '/CARC_Exams' },
        { name: 'CARC Net Control Roster', path: '/CARC_Net_Control_Roster' },
        { name: 'CARC Links', path: '/CARC_Links' },
        { name: 'CARC North Peak Repeater Site', path: '/CARC_North_Peak' },
        { name: 'CARC Officers & Staff', path: '/CARC_Officer-Staff' },
        { name: 'CARC Repeater Calendar', path: '/CARC_Repeater_Calendar' },
        { name: 'CARC Repeater Usage', path: '/CARC_Repeater_Usage' },
        { name: 'CARC Wants and Swaps', path: '/CARC_Wants_Swaps' },
        { type: 'separator', id: 'carc_separator_1'},
        { name: 'Test Get Full Name', path: '/Test_Get_Full_Name' },
        { type: 'separator', id: 'carc_separator_2'},
        // Some Documents (shown in Blue text)
        { name: 'CARC Net Checkin Script', type: 'pdf', 
            url: '/documents/CARC_NET_CHECK-IN_SCRIPT.pdf' },
        { name: 'CARC NET CONTROL Operator Guide', type: 'pdf', 
            url: '/documents/CARC_Net_Control_Operator_Guide-DR_MODIFIED.pdf' },
        { name: 'CARC Repeater User Guide', type: 'pdf', 
            url: '/documents/CARC_Repeater_User_Guide-DR-1_MODIFIED.pdf' },
        { name: 'CARC Membership Form', type: 'pdf', 
            url: '/documents/CARC_MembershipForm.pdf' },
        { name: 'CARC CONSTITUTION & BYLAWS (PDF)', type: 'pdf', 
            url: '/documents/CARC Constitution and Bylaws -- adopted June 11_2014.pdf'},
        // The original menu items created at the start of the project
        { type: 'separator', id: 'carc_separator_3'},
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Services', path: '/services' },
        { name: 'How It Works', path: '/how-it-works' },
    ];

    return (
        <nav className="w-64 bg-gray-100 p-4 shadow-lg h-full">
            <ul className="space-y-0">
                {menuItems.map((item, index) => { // 'index' is available here
                    // Use a unique key for each item. For the separator, use its 'id' or a unique string.
                    // For regular items, 'item.name' is unique.
                    const key = item.type === 'separator' ? item.id : item.name;

                    if (item.type === 'separator') {
                        return (
                            <li key={key} className="my-2"> {/* Key goes on the <li> */}
                                <hr className="border-t border-gray-500" />
                            </li>
                        );
                    } else {
                        return (
                            <li key={key}> {/* Key goes on the <li> */}
                                <Link href={item.path} className={`block p-2 rounded ${
                                    pathname === item.path ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                }`}>
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
