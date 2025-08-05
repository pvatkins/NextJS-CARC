ls // frontend/src/app/test-get-full-name/page.js
"use client";

import { useState } from "react";

// Test data (expected results)
const testCases = [
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
  { call: "W1AW", expected: "(default)" },
  { call: "WA6TOW", expected: "(default)" },
];

// Detect backend URL from environment or context
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://coastsidearc.org"); // adjust prod URL if different

export default function TestGetFullName() {
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);

  const runTests = async () => {
    setRunning(true);
    const newResults = [];

    for (const test of testCases) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/getFullName`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ callsign: test.call }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        const retrieved = data?.result?.FullName ?? null;
        const pass =
          retrieved &&
          retrieved.trim().toLowerCase() === test.expected.trim().toLowerCase();

        newResults.push({
          call: test.call,
          expected: test.expected,
          retrieved,
          pass,
        });
      } catch (err) {
        newResults.push({
          call: test.call,
          expected: test.expected,
          retrieved: `Error: ${err.message}`,
          pass: false,
        });
      }
    }

    setResults(newResults);
    setRunning(false);
  };

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Automated Full Name Tests</h1>
      <p className="text-gray-700">
        This page loops through a set of test callsigns, queries{" "}
        <code>/api/getFullName</code>, and checks results against expected names.
      </p>

      <button
        onClick={runTests}
        disabled={running}
        className={`px-4 py-2 rounded text-white ${
          running ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {running ? "Running tests..." : "Run Tests"}
      </button>

      {results.length > 0 && (
        <table className="w-full border-collapse border border-gray-400 mt-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1">Callsign</th>
              <th className="border border-gray-400 px-2 py-1">Expected</th>
              <th className="border border-gray-400 px-2 py-1">Retrieved</th>
              <th className="border border-gray-400 px-2 py-1">Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td className="border border-gray-400 px-2 py-1">{r.call}</td>
                <td className="border border-gray-400 px-2 py-1">{r.expected}</td>
                <td className="border border-gray-400 px-2 py-1">
                  {r.retrieved ?? "(none)"}
                </td>
                <td
                  className={`border border-gray-400 px-2 py-1 font-bold ${
                    r.pass ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {r.pass ? "PASS" : "FAIL"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
