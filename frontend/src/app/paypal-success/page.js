// frontend/src/app/paypal-success/page.js

export const metadata = {
  title: "PayPal Payment Successful", // More descriptive title for user
  description: "This page is displayed after a successful PayPal payment.",
};

export default function PayPalSuccessPage() { // Renamed for clarity (Page suffix)
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-6">
      <div className="bg-white shadow-lg rounded-xl p-8 md:p-10 border-l-8 border-green-500">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          Your payment was successfully accepted by PayPal. Thank you for your support!
        </p>
        <p className="text-md text-gray-600 mt-4">
          You can return to the <a href="/" className="text-blue-600 hover:underline">homepage</a>.
        </p>
      </div>
    </div>
  );
}