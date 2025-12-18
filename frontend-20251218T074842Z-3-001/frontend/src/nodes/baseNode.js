// frontend/src/nodes/BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode Component
 * * This is an abstract component that acts as a wrapper for all specific node types 
 * (Input, Output, Text, LLM, etc.). It encapsulates shared logic and styling to 
 * ensure consistency across the application.
 * * @param {string} id - The unique ID of the node (required by React Flow).
 * @param {string} title - The display title of the node (e.g., "LLM", "Text").
 * @param {React.ReactNode} children - The specific content (inputs, dropdowns) for the node.
 * @param {Array} handles - An array of handle configurations.
 * Each handle object should look like:
 * { id: string, type: 'source' | 'target', position: Position.Left | Right, style: object }
 */
export const BaseNode = ({ id, title, children, handles = [] }) => {
  return (
    <div 
      style={{ 
        // PART 2: STYLING (Modern Dark Mode Look)
        background: '#1e1e24',      // Dark grey background
        border: '1px solid #9333ea', // Purple border (VectorShift brand color)
        borderRadius: '8px',        // Rounded corners
        minWidth: '200px',          // Consistent width
        color: 'white',             // White text for contrast
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', // Subtle shadow
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Node Header: Displays the title of the node */}
      <div style={{ 
        padding: '8px 12px', 
        borderBottom: '1px solid #333', // Separator line
        fontWeight: 'bold',
        fontSize: '14px',
        background: 'rgba(255, 255, 255, 0.05)' // Slightly lighter header
      }}>
        {title}
      </div>

      {/* Node Body: Where the specific controls (inputs, dropdowns) go */}
      <div style={{ padding: '12px' }}>
        {children}
      </div>

      {/* Dynamic Handles: Renders connection points based on the 'handles' prop */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}           // 'source' (right) or 'target' (left)
          position={handle.position}   // Position.Right or Position.Left
          id={`${id}-${handle.id}`}    // Unique ID for the handle
          style={{
            ...handle.style,
            background: '#fff',        // White dots for visibility
            width: '8px',
            height: '8px'
          }}
        />
      ))}
    </div>
  );
};