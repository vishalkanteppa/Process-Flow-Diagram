import { ReactFlowProvider } from "reactflow";
import ProcessFlowDiagram from "./components/process-flow-diagram";
import sampleData from "./data/sample-data";
import "./index.css";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Heat Network Process Flow Diagram</h1>
        <div className="w-full h-screen border border-gray-200 rounded-lg overflow-hidden">
          <ReactFlowProvider>
            <ProcessFlowDiagram data={sampleData} />
          </ReactFlowProvider>
        </div>
      </div>
    </main>
  );
}

export default App;
