// toolbar.js

import { DraggableNode } from "./draggableNode";
import { nodeTypesData } from "./nodes/nodeTypeData";
// import { useStore } from "./store";

export const PipelineToolbar = () => {
  // const { nodeTypesData } = useStore();

  return (
    <div style={{ padding: "10px" }}>
      <div className="flex flex-wrap gap-4 mt-4 ml-4">
        {nodeTypesData &&
          Object.values(nodeTypesData)?.map((each, index) => (
            <DraggableNode key={`${index}`} data={each} />
          ))}
      </div>
    </div>
  );
};
