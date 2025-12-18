// frontend/src/nodes/outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode'; // Matches your file name

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <BaseNode 
      title="Output" 
      id={id} 
      handles={[
        { type: 'target', position: Position.Left, id: 'value' }
      ]}
    >
      <label style={{fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '2px'}}>
        Name:
      </label>
      <input 
        type="text" 
        value={currName} 
        onChange={handleNameChange} 
        style={{
          width: '100%', 
          padding: '4px', 
          marginBottom: '8px', 
          borderRadius: '4px', 
          border: '1px solid #444', 
          background: '#333', 
          color: '#fff'
        }}
      />
      
      <label style={{fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '2px'}}>
        Type:
      </label>
      <select 
        value={outputType} 
        onChange={handleTypeChange}
        style={{
          width: '100%', 
          padding: '4px', 
          borderRadius: '4px', 
          border: '1px solid #444', 
          background: '#333', 
          color: '#fff'
        }}
      >
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </BaseNode>
  );
};