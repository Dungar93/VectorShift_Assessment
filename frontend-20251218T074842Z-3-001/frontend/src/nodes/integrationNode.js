// frontend/src/nodes/integrationNode.js
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const IntegrationNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Integration"
      type="Integration"
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger' },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '10px', color: '#aaa' }}>Service:</label>
        <select 
          style={{
            width: '100%', 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid #555', 
            color: '#fff',
            borderRadius: '4px' 
          }}
        >
          <option>Slack</option>
          <option>Discord</option>
          <option>Notion</option>
        </select>
      </div>
    </BaseNode>
  );
};