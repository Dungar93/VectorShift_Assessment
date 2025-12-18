// frontend/src/nodes/dateNode.js
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const DateNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Date Trigger"
      type="Date"
      handles={[
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div style={{ padding: '5px', fontSize: '11px', color: '#ccc' }}>
        <span>Runs every 24h</span>
      </div>
    </BaseNode>
  );
};