"use client";
import { useState } from "react"; // Import useState and useEffect

export default function Home() {
  const [url, setUrl] = useState(""); // State for the URL input
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error handling
  const [profile, setProfile] = useState<any>(null);

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
      setProfile(data.parsedJsonData);
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

      {profile && (
        <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <p className="text-blue-600 font-semibold mb-4">{profile.title}</p>
          <div className="mb-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="text-gray-700">
              <li>Email: {profile.contact?.email || "N/A"}</li>
              <li>Phone: {profile.contact?.phone || "N/A"}</li>
              <li>LinkedIn: {profile.contact?.linkedin || "N/A"}</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Skills</h3>
            <ul className="flex flex-wrap gap-2">
              {profile.skills?.map((skill: string, idx: number) => (
                <li
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Experience</h3>
            <p className="text-gray-700 mb-1">{profile.experience?.details}</p>
            <p className="text-gray-500 text-sm">
              Years: {profile.experience?.years}
            </p>
            <div>
              <span className="font-semibold">Clients:</span>
              <ul className="list-disc ml-6">
                {profile.experience?.clients?.map(
                  (client: string, idx: number) => (
                    <li key={idx}>{client}</li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Testimonials</h3>
            <ul>
              {profile.testimonials?.map((t: any, idx: number) => (
                <li key={idx} className="mb-3">
                  <blockquote className="italic text-gray-800">
                    "{t.text}"
                  </blockquote>
                  <span className="block text-sm text-gray-600 mt-1">
                    - {t.author}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Additional Info</h3>
            <ul className="list-disc ml-6">
              {profile.additional_info?.map((info: string, idx: number) => (
                <li key={idx}>{info}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
