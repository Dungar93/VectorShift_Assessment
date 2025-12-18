// frontend/src/nodes/transformNode.js
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      type="Transform"
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div style={{ padding: '5px', fontSize: '11px', color: '#eee' }}>
        <span>JSON ➝ XML</span>
      </div>
    </BaseNode>
  );
};