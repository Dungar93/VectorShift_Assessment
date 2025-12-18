// frontend/src/nodes/llmNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode 
      title="LLM" 
      id={id} 
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <div style={{fontSize: '14px', color: '#ccc'}}>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};