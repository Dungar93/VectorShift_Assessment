// frontend/src/nodes/baseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, title, type, handles = [], children, style }) => {
  return (
    // 1. DYNAMIC CLASS: We add `node-${type}` so your CSS can color them (e.g., .node-date)
    <div className={`titan-base-node node-${type?.toLowerCase() || 'default'}`} style={{...style}}>
      
      {/* 2. THE HEADER */}
      <div className="node-header">
        {/* Optional: Add an icon here if you want */}
        <span style={{ fontWeight: 'bold' }}>{title}</span>
      </div>

      {/* 3. THE BODY */}
      <div className="node-body">
        {children}
      </div>

      {/* 4. DYNAMIC HANDLES */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          // CRITICAL FIX: We must pass 'handle.style' so the Text Node handles are spaced out!
          style={handle.style || {}} 
          className={`handle-${handle.type}`}
        />
      ))}
    </div>
  );
};