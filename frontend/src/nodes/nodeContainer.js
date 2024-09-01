// outputNode.js

import { createElement, useEffect, useState } from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";

export const NodeContainer = ({ data }) => {
  const [datum, setDatum] = useState(null);
  const { updateNodeField } = useStore();

  useEffect(() => {
    if (data) {
      setDatum(data.nodeData || {});
    } else {
      console.log("No data received in BaseNode");
    }
  }, []);

  const handleFieldChange = (value, fieldIndex) => {
    try {
      const updatedFields = datum.fields.map((f, index) =>
        index === fieldIndex ? { ...f, value } : f
      );

      let temp = {
        ...data,
        nodeData: {
          ...datum,
          fields: updatedFields,
        },
      };
      updateNodeField(temp.id, "nodeData", {
        ...datum,
        fields: updatedFields,
      });
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };

  const handleHandles = (value) => {
    //// check for variables
    const regex = /{{\s*(\w+)\s*}}/g;
    const matches = Array.from(value.matchAll(regex)).map((match) => match[1]);

    const newHandles = matches.map((match, index) => ({
      type: "target",
      position: "left",
      id: match,
      style: { top: `${(100 / (matches.length + 1)) * (index + 1)}%` },
    }));

    // console.log("IN TEXT---");
    // console.log(datum);
    // console.log(newHandles);
    setDatum({ ...datum, handles: [...datum.handles, ...newHandles] });
  };

  const adjustNodeSize = (target) => {
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div
      className={`flex flex-col max-w-[350px] min-w-[200px] p-3 rounded-md border-[2px] hover:border-purple-300 bg-white group`}
    >
      {/* -------------- Handles -------------- */}
      {datum?.handles?.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id || undefined}
          style={{
            ...handle.style,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#570987",
          }}
        />
      ))}
      {/* -------------- Title -------------- */}
      <div className="w-full flex justify-start items-center gap-1 mb-2">
        {datum?.icon &&
          createElement(datum?.icon, {
            className: "text-xs group-hover:text-purple-400",
          })}
        <p className="text-xs group-hover:text-purple-400">
          {datum?.label || "Node"}
        </p>
      </div>
      {/* -------------- Fields -------------- */}
      <div className="flex items-start flex-col gap-1">
        {datum?.fields &&
          datum.fields.map((field, index) => {
            if (field.label === "Text" && field.type === "text") {
              return (
                <div key={index} className="flex flex-col w-full">
                  <label
                    htmlFor={field.name}
                    className="text-[10px] text-black/70 mb-1"
                  >
                    {field.label}
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    className="w-full outline-none text-[10px] border-[1px] border-gray-300 rounded-md p-1 resize-none overflow-hidden"
                    style={{ minHeight: "20px" }}
                    onChange={(e) => {
                      handleFieldChange(e.target.value, index);
                      adjustNodeSize(e.target);
                      handleHandles(e.target.value);
                    }}
                  />
                </div>
              );
            }
            switch (field.type) {
              case "text":
                return (
                  <div key={index} className="flex flex-col w-full">
                    <label
                      htmlFor={field.name}
                      className="text-[10px] text-black/70 mb-1"
                    >
                      {field.label}
                    </label>
                    {datum.label == "LLM" ? (
                      <div className="text-[10px]">
                        This is an AI generated Response using LLM
                      </div>
                    ) : (
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        className="w-full outline-none text-[10px] border-[1px] border-gray-300 rounded-md py-2 px-2"
                        onChange={(e) => {}}
                      />
                    )}
                  </div>
                );
              case "select":
                return (
                  <div key={index} className="flex flex-col w-full">
                    <label
                      htmlFor={field.name}
                      className="text-[10px] text-black/70 mb-1"
                    >
                      {field.label}
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      className="w-full outline-none text-[10px] border-[1px] border-gray-300 rounded-md py-2 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      value={field.value || ""}
                      onChange={(e) => {}}
                    >
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
};
