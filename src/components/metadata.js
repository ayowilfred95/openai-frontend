import React, { useState } from "react";

function Metadata() {
  const [title, setTitle] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [jsonResult, setJsonResult] = useState({ description: "", tags: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generateMeta = { title };
    const response = await fetch(
      "https://openai-ypri.onrender.com/openai/meta",
      {
        method: "POST",
        body: JSON.stringify(generateMeta),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle(""); // Reset the input field
      setJsonResult(json);
      console.log(json);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-100 rounded-lg shadow-md">
        <div className="bg-white p-8 rounded-lg">
          <form className="mb-4" onSubmit={handleSubmit}>
            <label htmlFor="title" className="text-gray-700 text-sm block mb-2">
              Add Meta Description
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                emptyFields.includes("title")
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            <button className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 mt-4 rounded-lg hover:from-gray-700 hover:to-gray-900 focus:outline-none">
              Generate Meta
            </button>
          </form>

          {jsonResult.description && jsonResult.tags && (
            <div>
              <h2 className="text-lg text-gray-700 font-bold">Description:</h2>
              <p className="text-gray-600">{jsonResult.description.content}</p>

              <h2 className="text-lg text-gray-700 mt-4 font-bold">Tags:</h2>
              <p className="text-gray-600">{jsonResult.tags.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Metadata;
