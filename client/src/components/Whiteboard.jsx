import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Toolbar from './Toolbar'; 
import SyncFlow from "./SyncFlow";

const Whiteboard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mode = params.get('mode');

  const [tool, setTool] = useState('pencil'); 
  const [color, setColor] = useState('#000000');
  const [elements, setElements] = useState([]); 
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1280; 
    canvas.height = 580; 
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    elements.forEach((element) => {
      if (element.type === "pencil") {
        ctx.strokeStyle = element.stroke;
        ctx.beginPath();
        ctx.moveTo(element.path[0][0], element.path[0][1]);
        element.path.forEach((point) => {
          ctx.lineTo(point[0], point[1]);
        });
        ctx.stroke();
      } else if (element.type === "line") {
        ctx.strokeStyle = element.stroke;
        ctx.beginPath();
        ctx.moveTo(element.offsetX, element.offsetY);
        ctx.lineTo(element.width, element.height);
        ctx.stroke();
      } else if (element.type === "rect") {
        ctx.strokeStyle = element.stroke;
        ctx.strokeRect(element.offsetX, element.offsetY, element.width, element.height);
      } else if (element.type === "circle") {
        ctx.strokeStyle = element.stroke;
        ctx.beginPath();
        ctx.arc(element.offsetX, element.offsetY, element.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    isDrawingRef.current = true;

    if (tool === "pencil") {
      setElements((prev) => [
        ...prev,
        { type: "pencil", path: [[offsetX, offsetY]], stroke: color },
      ]);
    } else if (tool === "line") {
      setElements((prev) => [
        ...prev,
        { type: "line", offsetX, offsetY, width: offsetX, height: offsetY, stroke: color },
      ]);
    } else if (tool === "rect") {
      setElements((prev) => [
        ...prev,
        { type: "rect", offsetX, offsetY, width: 0, height: 0, stroke: color },
      ]);
    } else if (tool === "circle") {
      setElements((prev) => [
        ...prev,
        { type: "circle", offsetX, offsetY, radius: 0, stroke: color },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawingRef.current) {
      setElements((prev) => {
        const newElements = [...prev];
        const currentElement = newElements[newElements.length - 1];

        if (tool === "pencil") {
          const newPath = [...currentElement.path, [offsetX, offsetY]];
          currentElement.path = newPath;
        } else if (tool === "line") {
          currentElement.width = offsetX;
          currentElement.height = offsetY;
        } else if (tool === "rect") {
          currentElement.width = offsetX - currentElement.offsetX;
          currentElement.height = offsetY - currentElement.offsetY;
        } else if (tool === "circle") {
          const dx = offsetX - currentElement.offsetX;
          const dy = offsetY - currentElement.offsetY;
          currentElement.radius = Math.sqrt(dx * dx + dy * dy);
        }

        return newElements;
      });
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    setElements([]);
  };

  return (
    <div className="font-fira">
      <SyncFlow />
      <Toolbar setTool={setTool} setColor={setColor} />

      <div className="mt-4">
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid black', display: 'block', margin: '20px auto' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        <button onClick={clearCanvas} className="ml-[880px] mb-4  bg-red-500 text-white px-4 py-2 rounded">
          Clear Canvas
        </button>
        <p className="text-center">Current tool: {tool}</p>
      </div>
    </div>
  );
};

export default Whiteboard;
