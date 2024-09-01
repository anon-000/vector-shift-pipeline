// submit.js

import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState({});

  const handleSubmit = async () => {
    // console.log("Submit ==== >>");
    // console.log("#Nodes : ", nodes);
    // console.log("#Edges : ", edges);

    const pipelineData = {
      nodes: nodes, 
      edges: edges,
    };

    try {
      const formData = new FormData();
      formData.append("pipeline", JSON.stringify(pipelineData));

      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log("API Response:", data);

      setResponse(data);
      setIsOpen(true);

      if (data.is_dag) {
        console.log("The pipeline is a DAG!");
      } else {
        console.log("The pipeline is not a DAG.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-12 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={response}
      />
    </div>
  );
};

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">API Response</h2>
          <p>{`The Pipeline Contains ${content?.num_nodes} number of Nodes.`}</p>
          <p>{`The Pipeline Contains ${content?.num_edges} number of Edges.`}</p>
          <p>
            {content?.is_dag
              ? "The Pipeline is a DAG"
              : "The PipeLine is not a DAG"}
          </p>
        </div>
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
