import { LuBrainCircuit } from "react-icons/lu";
import { MdOutlineInput } from "react-icons/md";
import { MdOutlineOutput } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";

export const nodeTypesData = {
  customInput: {
    label: "Input",
    type: "customInput",
    icon: MdOutlineInput,
    handles: [{ type: "source", position: "right" }],
    fields: [
      { type: "text", label: "Name", name: "input" },
      {
        type: "select",
        label: "Type",
        name: "type",
        options: ["text", "image"],
      },
    ],
  },
  text: {
    label: "Text",
    type: "text",
    icon: IoDocumentTextOutline,
    handles: [{ type: "source", position: "right" }],
    fields: [{ type: "text", label: "Text", name: "text" }],
    value: "{{test}}",
  },
  llm: {
    label: "LLM",
    type: "llm",
    icon: LuBrainCircuit,
    handles: [
      {
        type: "target",
        position: "left",
        style: { top: `${100 / 3}%` },
        id: "handle-1",
      },
      {
        type: "target",
        position: "left",
        style: { top: `${200 / 3}%` },
        id: "handle-2",
      },
      { type: "source", position: "right", id: "handle-3" },
    ],
    fields: [{ type: "text", label: "LLM", name: "input" }],
  },
  customOutput: {
    label: "Output",
    type: "customOutput",
    icon: MdOutlineOutput,
    handles: [{ type: "target", position: "left" }],
    fields: [
      { type: "text", label: "Name", name: "input" },
      {
        type: "select",
        label: "Type",
        name: "type",
        options: ["text", "image"],
      },
    ],
  },
};
