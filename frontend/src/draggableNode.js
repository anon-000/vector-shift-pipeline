// draggableNode.js

import React, { createElement } from "react";

export const DraggableNode = ({ data }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, data?.type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      className="flex flex-col justify-center items-center gap-2 border p-4 rounded-lg min-w-20 h-20 select-none cursor-pointer text-sm"
      draggable
    >
      {createElement(data?.icon)}
      <span style={{}}>{data?.label}</span>
    </div>
  );
};
