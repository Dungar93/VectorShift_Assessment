// frontend/src/nodes/noteNode.js
import { BaseNode } from './baseNode';

export const NoteNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Note"
      type="Note"
      // Notes usually don't have handles, or you can add them if you want
      handles={[]} 
    >
      <textarea 
        placeholder="Type a note..."
        style={{
            width: '100%', 
            minHeight: '60px',
            background: 'rgba(255,255,200,0.1)', 
            border: 'none', 
            color: '#fff', 
            padding: '5px',
            borderRadius: '4px',
            fontSize: '11px'
        }}
      />
    </BaseNode>
  );
};