// frontend/src/ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Import Original Nodes
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

// Import New Nodes
import { DateNode, NoteNode, IntegrationNode, FilterNode, TransformNode } from './nodes/exampleNodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all nodes here so React Flow can render them
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  date: DateNode,
  note: NoteNode,
  integration: IntegrationNode,
  filter: FilterNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange, // <--- We use the Store's function directly
  onEdgesChange: state.onEdgesChange, // <--- We use the Store's function directly
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange, // <--- Get from store
      onEdgesChange, // <--- Get from store
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

   // frontend/src/ui.js

// ... (keep all your imports and the PipelineUI component logic exactly the same)

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        {/* TITAN UPGRADE: 
            Changed height from '70vh' to 'calc(100vh - 100px)' 
            This ensures the grid fills the screen but leaves space for the toolbar.
        */}
        <div ref={reactFlowWrapper} style={{width: '100vw', height: 'calc(100vh - 100px)'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange} 
                onEdgesChange={onEdgesChange} 
                onConnect={onConnect}
                deleteKeyCode={["Backspace", "Delete"]}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                {/* TITAN UPGRADE:
                   Changed color to "rgba(29, 29, 32, 0.6)" 
                   This allows your CSS gradient background to shine through the grid lines!
                */}
                <Background 
                    color="#aaa" 
                    gap={20} 
                    variant="dots" // Or "lines" if you prefer
                    style={{ backgroundColor: "rgba(29, 29, 32, 0.6)" }} 
                    size={1} 
                />
                
                <Controls />
                <MiniMap style={{ height: 100, width: 150 }} zoomable pannable />
            </ReactFlow>
        </div>
        </>
    )
};