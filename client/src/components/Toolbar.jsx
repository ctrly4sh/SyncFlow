import React from "react";

const Toolbar = ({ setTool, setColor }) => {
  return (
    <div className="toolbar flex justify-center   p-2 rounded-3xl items-center space-x-4 max-w-[1280px] mx-auto">
      <button
        className="tool-button px-4 py-2 mx-2 bg-white border border-gray-400 rounded"
        onClick={() => setTool("pencil")}
      >
        ✏️ Pencil
      </button>

      <button
        className="tool-button px-4 py-2 mx-2 bg-white border border-gray-400 rounded"
        onClick={() => setTool("line")}
      >
        📏 Line
      </button>

      <button
        className="tool-button px-4 py-2 mx-2 bg-white border border-gray-400 rounded"
        onClick={() => setTool("rect")}
      >
        🟦 Square
      </button> 

      <button
        className="tool-button px-4 py-2 mx-2 bg-white border border-gray-400 rounded"
        onClick={() => setTool("circle")}
      >
        ⚪ Circle
      </button>
{/* 
      <button
        className="tool-button px-4 py-2 mx-2 bg-white border border-gray-400 rounded"
        onClick={() => setTool("triangle")}
      >
        Clear
      </button>
       */}
    </div>
  );
};

export default Toolbar;
