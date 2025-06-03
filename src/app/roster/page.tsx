"use client";
import Image from "next/image";
import { useState } from "react"; // Import useState and useEffect

export default function Home() {
  const [url, setUrl] = useState(""); // State for the URL input
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error handling

  const apiEndPoint = "http://localhost:3001/users/process-portfolio";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loader

    try {
      // Call your API endpoint
      // https://sonuchoudhary.my.canva.site/portfolio
      const response = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Set error message if API call fails
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <label htmlFor="website" className="text-lg font-semibold mb-2">
          Enter your website/portfolio link
        </label>
        <input
          id="website"
          type="url"
          placeholder="https://yourwebsite.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)} // Update URL state
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className={`rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Submit"} {/* Show loading text */}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
        {/* Show error message */}
      </form>
    </div>
  );
}
