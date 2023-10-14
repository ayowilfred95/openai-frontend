/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";

function Image() {
  const [prompt, setPrompt] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [imageUrl, setImageUrl] = useState([]); // State to store the image URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generateImage = { prompt };
    const response = await fetch("https://openai-ypri.onrender.com/openai/image", {
      method: "POST",
      body: JSON.stringify(generateImage),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      setEmptyFields([]);
      setPrompt(""); // Reset the input field
      setImageUrl(json.url); // Store the image URL
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <form className="mb-4" onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-gray-700 text-sm block mb-2">
            Add Image Description
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              emptyFields.includes("title")
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          <button className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 mt-4 rounded-lg hover:from-blue-500 hover:to-blue-600 focus:outline-none">
            Generate Image
          </button>
        </form>

        {imageUrl.length > 0 && ( // Display the images if imageUrl array is not empty
          <div>
            <h2 className="text-lg text-gray-700 mb-2 font-bold">Image:</h2>
            {imageUrl.map((image, index) => (
              <div key={index} className="mb-4">
                <img
                  src={image.url}
                  alt={`Generated Image ${index}`}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Image;
