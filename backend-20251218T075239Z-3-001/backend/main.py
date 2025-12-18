from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# ---------------------------------------------------------
# 1. CORS SETUP (Crucial for Frontend connection)
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# 2. DATA MODELS
# ---------------------------------------------------------
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

# ---------------------------------------------------------
# 3. HELPER FUNCTION: DAG CHECKER
# ---------------------------------------------------------
def is_dag(nodes, edges):
    """
    Checks if the graph is a Directed Acyclic Graph (DAG).
    Returns True if valid (no loops), False if it contains a cycle.
    """
    # Build Adjacency List
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj_list:
            adj_list[source].append(target)
    
    # Depth First Search to detect cycles
    visited = set()
    recursion_stack = set()
    
    def has_cycle(node_id):
        visited.add(node_id)
        recursion_stack.add(node_id)
        
        for neighbor in adj_list.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in recursion_stack:
                return True # Cycle detected!
        
        recursion_stack.remove(node_id)
        return False
    
    # Check every node
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if has_cycle(node_id):
                return False
                
    return True

# ---------------------------------------------------------
# 4. ENDPOINTS
# ---------------------------------------------------------
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Calculates num_nodes, num_edges, and checks DAG status.
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }