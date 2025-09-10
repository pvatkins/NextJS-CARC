// frontend/src/components/Header.js
"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white text-center p-4">
      <h1 className="text-3xl font-bold">
        <Link href="/" className="hover:underline">
          Coastside ARC NextJS Web Project
        </Link>
      </h1>
    </header>
  );
};

export default Header;

// This header component displays the project title.
// The title is clickable and links back to the home page.

