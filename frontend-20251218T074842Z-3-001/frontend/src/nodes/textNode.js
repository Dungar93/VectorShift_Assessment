// frontend/src/nodes/textNode.js
import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // 1. Auto-Resize Logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [currText]);

  // 2. Variable Detection Logic (WITH DEDUPLICATION FIX)
  useEffect(() => {
    const variableRegex = /{{(.*?)}}/g;
    const matches = [...currText.matchAll(variableRegex)];
    
    // Extract variable names and use a Set to remove duplicates
    const variableNames = matches.map(match => match[1].trim());
    const uniqueVariables = [...new Set(variableNames)];

    // Map unique variables to Handle objects
    const newHandles = uniqueVariables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable, // ID is now unique
      // Improved spacing so they don't bunch up if you have many
      style: { top: `${index * 20 + 50}px`, background: '#555' } 
    }));

    // Always add the Output handle
    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });

    setHandles(newHandles);
  }, [currText]);

  return (
    <BaseNode title="Text" id={id} handles={handles}>
       <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '5px' }}>
          Text Field:
       </label>
       <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        style={{
          width: '100%',
          minHeight: '40px',
          background: 'rgba(0, 0, 0, 0.3)', // Slight transparency for the "Glass" look
          color: '#eee',
          border: '1px solid #444',
          borderRadius: '4px',
          padding: '8px',
          resize: 'none', 
          overflow: 'hidden',
          fontFamily: 'monospace',
          fontSize: '12px',
          lineHeight: '1.4'
        }}
      />
    </BaseNode>
  );
};