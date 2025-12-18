// frontend/src/nodes/inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <BaseNode 
      title="Input" 
      id={id} 
      handles={[
        { type: 'source', position: Position.Right, id: 'value' }
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
        value={inputType} 
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
        <option value="File">File</option>
      </select>
    </BaseNode>
  );
};