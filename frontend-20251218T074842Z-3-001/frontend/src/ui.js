// frontend/src/ui.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// --- 1. IMPORT ORIGINAL NODES ---
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

// --- 2. IMPORT NEW NODES (From their individual files) ---
import { DateNode } from './nodes/dateNode';
import { FilterNode } from './nodes/filterNode';
import { IntegrationNode } from './nodes/integrationNode';
import { TransformNode } from './nodes/transformNode';
import { NoteNode } from './nodes/noteNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// --- 3. REGISTER ALL NODES HERE ---
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  // New Types
  date: DateNode,
  filter: FilterNode,
  integration: IntegrationNode,
  transform: TransformNode,
  note: NoteNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
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
      onNodesChange,
      onEdgesChange,
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

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        {/* TITAN UPGRADE: Height calculation allows space for the toolbar/header */}
        <div ref={reactFlowWrapper} style={{ width: '100vw', height: 'calc(100vh - 80px)' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                // Allows deleting nodes with Backspace/Delete keys
                deleteKeyCode={["Backspace", "Delete"]} 
            >
                <Background 
                    color="#aaa" 
                    gap={gridSize} 
                    // Transparent background so your CSS gradient shines through
                    style={{ backgroundColor: "rgba(29, 29, 32, 0.6)" }} 
                />
                <Controls />
                <MiniMap style={{ background: '#222', border: '1px solid #555' }} />
            </ReactFlow>
        </div>
        </>
    );
}