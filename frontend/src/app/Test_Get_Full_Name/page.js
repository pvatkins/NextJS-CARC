// frontend/src/app/Test_Get_Full_Name/page.js

'use client'; // This component needs client-side interactivity to fetch data and manage state

import React, { useState, useEffect } from "react";
import Link from "next/link"; // For internal links

/*
export const metadata = {
  title: "Test Get Full Name",
  description: "Checks the operation of the getFullName API function by verifying member data from the CARC database.",
};
*/

// API Endpoint - Assuming this points to your general backend on port 5000
const FULL_NAME_API_URL = 'http://192.168.1.110:5000/api/getFullName';
const DEFAULT_NAME = "U N D E F I N E D";

// Array of members to test
const memberDictionary = [
  { call: "KN6PIV", expected: "Jillian Aldersen" },
  { call: "KM6HYK", expected: "William J. Anderson" },
  { call: "KM6UYM", expected: "Fernel Andong" },
  { call: "AI6BB", expected: "Paul Atkins" },
  { call: "KN6ORM", expected: "Steve Austin" },
  { call: "W2OKB", expected: "Bharat Bailur" },
  { call: "W6LOG", expected: "Robert Barbitta" },
  { call: "KI6HIG", expected: "Gary Barnes" },
  { call: "KJ6FHQ", expected: "Anna Bernstine" },
  { call: "N6ZEN", expected: "Dan Bernstein" },
  { call: "KK6FOI", expected: "Emily Bernstein" },
  { call: "AA6XL", expected: "Michael G. Bevington" },
  { call: "WB6JKV", expected: "Michael S. Herbert" },
  { call: "N6FG", expected: "Frank Erbacher" },
  { call: "N6SJF", expected: "Jonathan Lancelle" },
  { call: "KJ6OGL", expected: "Tom Oliver" },
  { call: "W1AW", expected: DEFAULT_NAME },
  { call: "WA6TOW", expected: DEFAULT_NAME },
];

// Asynchronous function to fetch a full name for a given callsign
async function getFullNameFromMergedTable(callsign) {
  try {
    const response = await fetch(FULL_NAME_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callsign })
    });
    if (!response.ok) {
      console.log('Response not OK for', callsign, response.status);
      return DEFAULT_NAME;
    }
    const data = await response.json();
    if (data.result === null) {
      return DEFAULT_NAME;
    } else {
      return data.result.FullName;
    }
  } catch (error) {
    console.error("Error fetching full name:", error);
    return DEFAULT_NAME;
  }
}



export default function TestGetFullNamePage() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // This useEffect will run once when the component mounts
  useEffect(() => {
    async function runTests() {
      const results = [];
      for (const member of memberDictionary) {
        const actualName = await getFullNameFromMergedTable(member.call);
        const passed = actualName === member.expected;

        results.push({
          callsign: member.call,
          expected: member.expected,
          actual: actualName,
          passed: passed,
        });
      }
      setTestResults(results);
      setLoading(false);
    }
    runTests();
  }, []); // Empty dependency array ensures this runs only once
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">
        Testing `getFullName` Function
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-4">
        <p className="text-gray-700 leading-relaxed">
          This page verifies that the application can successfully integrate with the 
          CARC database on the Dreamhost server (now on a local server) via the 
          `getFullName` API. It checks whether the actual results from the database 
          match the expected values for a list of call signs. Two errors are expected:
          a mismatch between 'Frank Erbacher' and 'Frank C. Erbacher' and also a mismatch 
          between 'Anna Bernstine' and 'Anna Bernstein'.
        </p>

        {/* Dynamic Table of Test Results */}
        <div className="overflow-x-auto pt-4">
          <table className="min-w-full text-center border-collapse">
            <caption className="caption-top text-lg font-bold mb-4 text-gray-800">
              Test Results
            </caption>
            
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 font-semibold text-sm border-b border-gray-200">Callsign</th>
                <th className="py-3 px-4 font-semibold text-sm border-b border-gray-200">Expected</th>
                <th className="py-3 px-4 font-semibold text-sm border-b border-gray-200">Actual</th>
                <th className="py-3 px-4 font-semibold text-sm border-b border-gray-200">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-gray-600 italic">Running tests...</td>
                </tr>
              ) : (
                testResults.map((result, index) => (
                  <tr key={index} className={`border-b ${result.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                    <td className="py-2 px-4 text-gray-800">{result.callsign}</td>
                    <td className="py-2 px-4 text-gray-800">{result.expected}</td>
                    <td className="py-2 px-4 text-gray-800">{result.actual}</td>
                    <td className={`py-2 px-4 font-bold ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
                      {result.passed ? 'Passed' : 'Failed'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}