import React from "react";
import Metadata from "./components/metadata";
import Image from "./components/image";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl text-gray-800 mt-2 mb-2">
        OpenAI Image and Tutorial Data Generator
      </h1>
      <div className="flex space-x-10">
        <Metadata />
        <Image />
      </div>
    </div>
  );
}

export default App;
