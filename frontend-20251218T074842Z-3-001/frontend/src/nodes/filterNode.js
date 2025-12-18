// frontend/src/nodes/filterNode.js
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      type="Filter"
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '10px', color: '#aaa' }}>Condition:</label>
        <input 
          type="text" 
  placeholder="e.g. status == 'active'"
          style={{
            width: '100%', 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid #555', 
            color: '#fff', 
            padding: '3px',
            borderRadius: '4px'
          }} 
        />
      </div>
    </BaseNode>
  );
};