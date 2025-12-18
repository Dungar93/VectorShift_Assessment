// frontend/src/submit.js
import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow'; // Ensure shallow is imported if used

export const SubmitButton = () => {
    // 1. Get nodes and edges from the store
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);

    // 2. Local state for the Toast Notification
    const [toast, setToast] = useState({ 
        show: false, 
        message: '', 
        type: '',
        title: ''
    });

    const handleSubmit = async () => {
        try {
            // ----------------------------------------------------------------
            // REAL BACKEND CONNECTION (Replaces Simulated Logic)
            // ----------------------------------------------------------------
            
            // 1. Send the POST request to your FastAPI backend
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            // 2. Parse the JSON response
            const data = await response.json();

            // 3. Extract the real results calculated by Python
            const { num_nodes, num_edges, is_dag } = data;

            // ----------------------------------------------------------------
            // TITAN TOAST NOTIFICATION LOGIC
            // ----------------------------------------------------------------
            
            // Determine success (DAG) or failure (Cycle)
            const notificationType = is_dag ? 'toast-success' : 'toast-error';
            const title = is_dag ? 'PIPELINE STABLE' : 'CRITICAL FAILURE';
            
            // Show the toast with the REAL data from the backend
            setToast({
                show: true,
                type: notificationType,
                title: title,
                message: `Nodes: ${num_nodes} | Edges: ${num_edges} | DAG: ${is_dag}`
            });

        } catch (error) {
            console.error(error);
            // Handle connection errors (e.g., Backend not running)
            setToast({
                show: true,
                type: 'toast-error',
                title: 'CONNECTION ERROR',
                message: 'Could not reach backend. Is uvicorn running?'
            });
        }

        // 4. Auto-dismiss after 3 seconds
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    return (
        <>
            {/* THE LAUNCH BUTTON */}
            <div className="submit-container">
                <button type="submit" className="submit-btn" onClick={handleSubmit}>
                    {/* SVG Icon for the Play Button */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                    Run Pipeline
                </button>
            </div>

            {/* THE TITAN TOAST NOTIFICATION */}
            <div className={`toast ${toast.show ? 'show' : ''} ${toast.type}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '32px', height: '32px' }}>
                    {toast.type === 'toast-success' ? (
                        <span style={{ color: '#4ade80', fontSize: '16px' }}>✓</span> 
                    ) : (
                        <span style={{ color: '#ef4444', fontSize: '16px' }}>✕</span>
                    )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '700', textTransform: 'uppercase', fontSize: '12px', color: '#fff', letterSpacing: '1px' }}>
                        {toast.title}
                    </span>
                    <span style={{ color: '#a3a3a3', fontSize: '13px' }}>
                        {toast.message}
                    </span>
                </div>
            </div>
        </>
    );
};