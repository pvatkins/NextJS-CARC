// frontend/src/app/how-it-works/page.js
import React from 'react';

export const metadata = {
    title: 'How It Works - Demo Project',
    description: 'A detailed explanation of the project architecture and functionality.',
};

export default function HowItWorksPage() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">How This Website Functions</h2>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">1. Overall Architecture: Monolithic vs. Distributed</h3>
                <p className="text-gray-700">
                    This demonstration project utilizes a **distributed architecture**, separating the frontend and backend into distinct applications. This approach offers several advantages:
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                    <li>**Scalability:** Frontend and backend can be scaled independently.</li>
                    <li>**Maintainability:** Clear separation of concerns makes development and debugging easier.</li>
                    <li>**Technology Flexibility:** Different technologies can be used for each part (e.g., Python for backend, JavaScript for frontend).</li>
                    <li>**Team Collaboration:** Separate teams can work on frontend and backend simultaneously with minimal conflicts.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">2. Frontend: Next.js and React</h3>
                <p className="text-gray-700">
                    The user interface (UI) of this website is built using **Next.js** and **React**.
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                    <li>
                        **React:** A JavaScript library for building user interfaces. It allows for creating reusable UI components and efficiently updates and renders components when data changes.
                    </li>
                    <li>
                        **Next.js:** A React framework that enables powerful features like:
                        <ul className="list-circle list-inside ml-8 mt-1">
                            <li>**Server-Side Rendering (SSR):** Pages are rendered on the server before being sent to the client, improving initial load performance and SEO.</li>
                            <li>**Static Site Generation (SSG):** Pages can be pre-rendered at build time, leading to extremely fast page loads for static content.</li>
                            <li>**File-system based Routing:** Pages are automatically routed based on their file names in the `src/app` directory (App Router).</li>
                            <li>**API Routes:** Next.js allows you to create API endpoints directly within your Next.js project. For this demo, we use a separate Express backend for clarity.</li>
                        </ul>
                    </li>
                    <li>
                        **Components:** The frontend is composed of various React components (e.g., Header, Footer, SideMenu, and individual page components) that encapsulate UI logic and render specific parts of the page.
                    </li>
                    <li>
                        **Navigation:** The left-side menu uses Next.js's `Link` component for client-side navigation, which preloads pages for a smooth user experience without full page reloads.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">3. Backend: Node.js and Express.js</h3>
                <p className="text-gray-700">
                    The server-side logic and API for this website are handled by **Node.js** and **Express.js**.
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                    <li>
                        **Node.js:** A JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. It's ideal for building fast and scalable network applications.
                    </li>
                    <li>
                        **Express.js:** A fast, unopinionated, minimalist web framework for Node.js. It simplifies the process of building robust APIs and web applications by providing:
                        <ul className="list-circle list-inside ml-8 mt-1">
                            <li>**Routing:** Handles different HTTP requests (GET, POST, etc.) to specific URL paths.</li>
                            <li>**Middleware:** Functions that have access to the request and response objects, and the next middleware function in the application's request-response cycle.</li>
                            <li>**API Endpoints:** Exposes data or functionality to the frontend through RESTful APIs (e.g., `/api/hello`, `/api/data`).</li>
                        </ul>
                    </li>
                    <li>
                        **CORS (Cross-Origin Resource Sharing):** Configured in the Express backend to allow the Next.js frontend (running on a different port) to make requests to the backend API securely.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">4. Data Flow (Frontend-Backend Interaction)</h3>
                <p className="text-gray-700">
                    When the frontend needs data (e.g., a list of items), it makes an HTTP request (using `fetch` or a library like Axios) to a specific API endpoint exposed by the Express.js backend.
                </p>
                <ol className="list-decimal list-inside ml-4 text-gray-700">
                    <li>The user interacts with the Next.js frontend.</li>
                    <li>The frontend (a React component) initiates a `fetch` request to an Express.js API endpoint (e.g., `http://localhost:5000/api/data`).</li>
                    <li>The Express.js backend receives the request, processes it (e.g., retrieves data from a database - though not implemented in this simple demo, it's the next logical step), and sends a JSON response back to the frontend.</li>
                    <li>The Next.js frontend receives the JSON data and updates its React components to display the information to the user.</li>
                </ol>
                <p className="text-gray-700 mt-2">
                    This clear separation allows for independent development and deployment of both parts of the application.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">5. Deployment Considerations (Brief)</h3>
                <p className="text-gray-700">
                    For deployment, the Next.js application can be statically exported or deployed to a platform that supports Node.js (like Vercel, Netlify for frontend). The Express.js backend can be deployed to a Node.js hosting service (like Heroku, AWS EC2, DigitalOcean). Both would need to communicate via their respective public URLs.
                </p>
            </section>
        </div>
    );
}
