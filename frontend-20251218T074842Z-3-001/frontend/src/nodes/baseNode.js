// frontend/src/nodes/BaseNode.js
import React from 'react';
import { Handle } from 'reactflow';

/**
 * BaseNode Component (Titan Edition)
 * Refactored to use the Titan CSS system for styling.
 * * Note: We removed the outer 'style' block because the 
 * .react-flow__node class in index.css now handles the 
 * glassmorphism, border, and shadows automatically.
 */
export const BaseNode = ({ id, title, children, handles = [] }) => {
  return (
    <div className="titan-base-node">
      {/* 1. THE HEADER 
        Uses .node-header from index.css (Part 3) for the 
        gradient top and uppercase typography.
      */}
      <div className="node-header">
        {/* We can add a subtle icon or just the title */}
        <span>{title}</span>
      </div>

      {/* 2. THE BODY 
        Uses .node-body from index.css for padding and layout.
      */}
      <div className="node-body">
        {children}
      </div>

      {/* 3. DYNAMIC HANDLES 
        We removed the inline styles so the CSS can handle the 
        glowing hover effects (.react-flow__handle-left/right).
      */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          className={`handle-${handle.position}`} // Optional: helps with specific targeting if needed
          // Note: style prop removed to allow CSS animations
        />
      ))}
    </div>
  );
};