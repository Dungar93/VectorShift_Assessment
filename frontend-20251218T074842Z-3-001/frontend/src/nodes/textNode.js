// frontend/src/nodes/textNode.js
import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode'; // Import our new Master Node

/**
 * TextNode Component
 * * A smart node that allows users to input text. 
 * It parses the text for variables in {{ curlyBrackets }} and creates handles for them.
 */
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  /**
   * Effect: Auto-Resize Logic
   * Checks the 'scrollHeight' of the textarea and expands the height to fit the text.
   */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to shrink if needed
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand
    }
  }, [currText]);

  /**
   * Effect: Variable Detection Logic
   * Uses Regex to find strings wrapped in {{ }}.
   * Creates a "Target" handle on the left for each variable found.
   */
  useEffect(() => {
    const variableRegex = /{{(.*?)}}/g; // Regex pattern for {{ variable }}
    const matches = [...currText.matchAll(variableRegex)];
    
    // Map matches to Handle objects
    const newHandles = matches.map((match, index) => ({
      type: 'target',
      position: Position.Left,
      id: match[1].trim(), // Use the variable name (e.g., "customer") as the ID
      style: { top: `${(index + 1) * 30 + 50}px` } // Space them out nicely
    }));

    // Always keep the Output handle on the right
    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });

    setHandles(newHandles);
  }, [currText]);

  return (
    <BaseNode title="Text" id={id} handles={handles}>
       <label style={{ fontSize: '11px', color: '#aaa' }}>Input Text:</label>
       <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        style={{
          width: '100%',
          minHeight: '40px',
          background: '#2a2a30',
          color: '#fff',
          border: '1px solid #444',
          borderRadius: '4px',
          padding: '8px',
          resize: 'none', // Disable manual drag-to-resize
          overflow: 'hidden',
          fontFamily: 'monospace'
        }}
      />
    </BaseNode>
  );
};