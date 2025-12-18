// frontend/src/nodes/exampleNodes.js
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

// 1. Date Node (Shows today's date)
export const DateNode = ({ id }) => {
  const date = new Date().toLocaleDateString();
  return (
    <BaseNode title="Date" id={id} handles={[{ type: 'source', position: Position.Right, id: 'date' }]}>
      <div style={{ padding: '5px', color: '#aaa', fontSize: '12px' }}>
        Today: <span style={{ color: 'white' }}>{date}</span>
      </div>
    </BaseNode>
  );
};

// 2. Note Node (A sticky note)
export const NoteNode = ({ id }) => {
  return (
    <BaseNode title="Note" id={id}>
      <textarea 
        placeholder="Type a note..." 
        style={{width: '100%', height: '60px', background: '#ffeb3b', color: 'black', border: 'none', padding: '5px', borderRadius: '4px'}} 
      />
    </BaseNode>
  );
};

// 3. Integration Node (Select Slack/Discord)
export const IntegrationNode = ({ id }) => {
  return (
    <BaseNode 
      title="Integration" 
      id={id} 
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger' },
        { type: 'source', position: Position.Right, id: 'result' }
      ]}
    >
      <label style={{color: '#aaa', fontSize: '11px'}}>Service:</label>
      <select style={{width: '100%', padding: '4px', marginTop: '2px', background: '#333', color: 'white', border: '1px solid #555'}}>
        <option>Slack</option>
        <option>Discord</option>
      </select>
    </BaseNode>
  );
};

// 4. Filter Node (A logic gate)
export const FilterNode = ({ id }) => {
  return (
    <BaseNode 
      title="Filter" 
      id={id} 
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'pass' },
        { type: 'source', position: Position.Right, id: 'fail', style: { top: '70%' } }
      ]}
    >
      <div style={{fontSize: '11px', color: '#aaa'}}>Condition:</div>
      <input type="text" placeholder="contains..." style={{width: '100%', marginTop: '5px', padding: '2px', background: '#333', color: 'white', border: '1px solid #555'}} />
    </BaseNode>
  );
};

// 5. Transform Node (Data format converter)
export const TransformNode = ({ id }) => {
  return (
    <BaseNode 
      title="Transform" 
      id={id} 
      handles={[
        { type: 'target', position: Position.Left, id: 'data' },
        { type: 'source', position: Position.Right, id: 'converted' }
      ]}
    >
      <div style={{fontSize: '11px', color: '#aaa'}}>Format:</div>
      <select style={{width: '100%', marginTop: '2px', padding: '2px', background: '#333', color: 'white', border: '1px solid #555'}}>
        <option>JSON</option>
        <option>XML</option>
      </select>
    </BaseNode>
  );
};