import ReactFlow, {
  Background,
  Edge,
  MarkerType,
  Node,
  NodeTypes,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import GraphNode from "./nodes/node";
import GraphNodeInverted from "./nodes/node-inverted";

interface Position {
  x: number;
  y: number;
}

interface ProcessStream {
  color: "red" | "blue";
  temperature_in: number;
  temperature_out: number;
}

interface Component {
  id: string;
  type: string;
  name: string;
  position: Position;
  temperature_in?: number;
  temperature_out?: number;
  flow_in?: number;
  flow_out?: number;
  power?: number;
  process_stream?: ProcessStream;
}

interface Connection {
  source: string;
  target: string;
}

// basically an array of components and array of connections
interface ProcessFlowData {
  components: Component[];
  connections: Connection[];
}


interface ProcessFlowDiagramProps {
  data: ProcessFlowData;
}

// 2 custom node types
const nodeTypes: NodeTypes = {
  node: GraphNode,
  node_inv: GraphNodeInverted
};

export default function ProcessFlowDiagram({ data }: ProcessFlowDiagramProps) {
  // converting components to nodes
  const initialNodes: Node[] = data.components.map((component) => ({
    id: component.id,
    type: component.type,
    position: component.position,
    data: {
      name: component.name,
      temperature_in: component.temperature_in,
      temperature_out: component.temperature_out,
      flow_in: component.flow_in,
      flow_out: component.flow_out,
      power: component.power,
      process_stream: component.process_stream,
    },
  }));
  
  // converting connections to edges
  const initialEdges: Edge[] = data.connections.map((connection, index) => ({
    id: `e${index}`,
    source: connection.source,
    target: connection.target,
    type: "smoothstep",
    animated: true,
    style: { stroke: "#2563eb", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#2563eb",
    },
  }));
  

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // for connections between nodes
  const onConnect = (params) => {
    setEdges((prevEdges) => addEdge(params, prevEdges));
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}
