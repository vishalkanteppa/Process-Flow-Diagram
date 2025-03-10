import { Handle, Position } from "reactflow"
import { UnicodeArrow } from "./arrows"

interface NodeProps {
  data: {
    name?: string
    temperature_in?: number
    temperature_out?: number
    flow_in?: number
    flow_out?: number
    power?: number
    process_stream?: {
      color: "red" | "blue";
      temperature_in: number;
      temperature_out: number;
    }
  }
}

export default function GraphNode(comp: NodeProps) {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Right} />
      <div className="flex flex-col items-center">
        <div className="w-45 h-30 relative border-2 border-blue-600 bg-blue-50 rounded-md flex items-center justify-center">
          <div className="text-center">
            <div className="font-semibold text-sm">{comp.data.name}</div>
            {comp.data.power && <div className="text-xs mt-1 font-medium">{comp.data.power} kW</div>}
          </div>

          {/* temp out placed on the left outside the box */}
          {comp.data.temperature_out !== undefined && (
            <div className="absolute top-3/5 left-[-40px] text-xs font-medium text-gray-700">
              {comp.data.temperature_out}°C
            </div>
          )}

          {/* temp in placed on the right outside the box */}
          {comp.data.temperature_in !== undefined && (
            <div className="absolute top-3/5 right-[-40px] text-xs font-medium text-gray-700">
              {comp.data.temperature_in}°C
            </div>
          )}

          {comp.data.flow_in !== undefined && (
            <div className="absolute top-1/3 right-[-60px] text-xs font-medium text-gray-600">
              {comp.data.flow_in} kg/s
            </div>
          )}

          {comp.data.flow_out !== undefined && (
            <div className="absolute top-1/3 left-[-60px] text-xs font-medium text-gray-600">
              {comp.data.flow_out} kg/s
            </div>
          )}
        </div>

        {comp.data.process_stream !== undefined && (
          <>
            <div
              className="absolute left-[-50px] top-1/10 transform -translate-y-1/2 text-2xl"
              style={{ color: comp.data.process_stream.color }}
            >
              <div className="absolute left-[-20px] top-1/3 text-xs font-medium text-gray-600" style={{ color: "black" }}>
                {comp.data.process_stream.temperature_in}°C
              </div>
              <UnicodeArrow color={comp.data.process_stream.color} direction="right" />
            </div>
            <div
              className="absolute right-[-50px] top-1/10 transform -translate-y-1/2 text-2xl"
              style={{ color: comp.data.process_stream.color }}
            >
              <div className="absolute right-[-20px] top-1/3 text-xs font-medium text-gray-600" style={{ color: "black" }}>
                {comp.data.process_stream.temperature_out}°C
              </div>
              <UnicodeArrow color={comp.data.process_stream.color} direction="right" />
            </div>
          </>
        )}

      </div>
      <Handle type="source" position={Position.Left} />
    </div>
  )
}
