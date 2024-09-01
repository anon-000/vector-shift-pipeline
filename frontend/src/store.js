// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";
// import { nodeTypesData } from "./nodes/nodeTypeData";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    // console.log("getNodeID type: ", type);
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    // console.log("getNodeID returns: ", `${type}-${newIDs[type]}`);
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    // console.log("addNode node: ", node);
    set({
      nodes: [...get().nodes, node],
    });
  },
  editNode: (node) => {
    // console.log("editNode node: ", node);
    set({
      nodes: applyNodeChanges([node], get().nodes),
    });
  },
  onNodesChange: (changes) => {
    // console.log("onNodesChange changes: ", changes);
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    // console.log("onNodesChange changes: ", fieldValue);
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  // nodeTypesData: nodeTypesData,
}));
