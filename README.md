# GraphFlow Pro: A Dynamic Pipeline Architect

![Project Header](https://capsule-render.vercel.app/render?type=waving&color=auto&height=300&section=header&text=GraphFlow%20Pro&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Full-Stack%20Visual%20Workflow%20Orchestrator&descAlignY=51&descAlign=50)

[![React](https://img.shields.io/badge/Frontend-React%20Flow-blue?style=for-the-badge&logo=react)](https://reactflow.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Language-Python%203.10-yellow?style=for-the-badge&logo=python)](https://www.python.org/)
[![IIT Jodhpur](https://img.shields.io/badge/Institution-IIT%20Jodhpur-orange?style=for-the-badge)](https://iitj.ac.in/)

> **GraphFlow Pro** is an advanced, full-stack workflow automation platform. It allows users to visually design complex data pipelines while ensuring logical integrity through real-time backend validation of Directed Acyclic Graphs (DAGs).

---

## 📖 Table of Contents
1. [Introduction](#-introduction)
2. [Key Features](#-key-features)
3. [System Architecture](#-system-architecture)
4. [The Tech Stack](#-the-tech-stack)
5. [Directory Structure](#-directory-structure)
6. [Frontend Deep Dive](#-frontend-deep-dive)
    - [Modular Node Abstraction](#modular-node-abstraction)
    - [Dynamic Handle Generation](#dynamic-handle-generation)
7. [Backend Deep Dive](#-backend-deep-dive)
    - [FastAPI Framework](#fastapi-framework)
    - [DFS Cycle Detection Logic](#dfs-cycle-detection-logic)
8. [Setup & Installation](#-setup--installation)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
9. [Usage Guide](#-usage-guide)
10. [API Documentation](#-api-documentation)
11. [Design Philosophy](#-design-philosophy)
12. [Future Roadmap](#-future-roadmap)
13. [Contributing](#-contributing)
14. [Contact & Socials](#-contact--socials)

---

## 🌟 Introduction

**GraphFlow Pro** was developed by **Dungar Soni**, a Computer Science student at **IIT Jodhpur**, as a technical solution for modern pipeline orchestration. 

Visualizing logic is easy, but validating it at scale is hard. Many workflow tools allow users to create "infinite loops" that crash execution engines. GraphFlow Pro solves this by combining a reactive **React Flow** interface with a high-performance **FastAPI** backend that runs graph theory algorithms to detect cycles before they become problems.



---

## 🚀 Key Features

### 💻 **Frontend Excellence**
- **Custom Node Suite**: 5+ specialized nodes including Inputs, Outputs, Date Providers, and Logic Transformers.
- **Glassmorphic UI**: A "Deep Space" theme built with Tailwind CSS for a modern, professional feel.
- **Regex-Powered Variables**: The Text Node dynamically parses `{{variable_name}}` and creates connection handles instantly.
- **Modular Architecture**: Uses a HOC (Higher-Order Component) pattern for all nodes to ensure DRY (Don't Repeat Yourself) principles.

### ⚙️ **Backend Intelligence**
- **Asynchronous Processing**: Built on FastAPI for rapid JSON parsing.
- **Cycle Detection**: Implements a recursion-based DFS algorithm to identify back-edges in the graph.
- **Metadata Analytics**: Returns node count, edge count, and DAG status in a single consolidated response.
- **Pydantic Validation**: Ensures data arriving from the UI is strictly formatted and secure.

---

## 🏛 System Architecture

The system is built on a **Decoupled Architecture** where the view layer and the logic layer communicate via a RESTful API.

### **The Data Flow**
1. **User Action**: User drags nodes onto the React Flow canvas.
2. **State Sync**: The frontend maintains a local state of `nodes` and `edges`.
3. **Trigger**: User clicks "Run Pipeline."
4. **API Call**: A JSON payload containing the graph structure is sent to the `/pipelines/parse` endpoint.
5. **Logic Layer**: FastAPI parses the JSON, builds an adjacency list, and runs the DFS algorithm.
6. **Feedback**: A Toast notification displays the result (DAG Status, Node/Edge Count).

---

## 💻 The Tech Stack

### **Frontend**
- **React.js**: Library for building the user interface.
- **React Flow**: Core engine for node-based graph editing.
- **Tailwind CSS**: Modern styling for responsive and sleek design.
- **Lucide Icons**: Scalable vector icons for node categorization.
- **Axios**: Handling asynchronous API communication.

### **Backend**
- **Python**: The language of choice for algorithmic complexity.
- **FastAPI**: A modern, fast (high-performance), web framework for building APIs.
- **Uvicorn**: An ASGI server for production-ready deployments.
- **Pydantic**: Data validation and settings management.

---

## 📂 Directory Structure

```text
GraphFlow-Pro/
│
├── backend/                # FastAPI Logic Layer
│   ├── main.py             # Entry point: API Routes & DAG Algorithm
│   ├── requirements.txt    # Python dependencies
│   └── __pycache__/        # Compiled files (ignored)
│
├── frontend/               # React UI Layer
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── nodes/          # Custom Node Components
│   │   │   ├── baseNode.js  # Abstract wrapper for all nodes
│   │   │   ├── textNode.js  # Logic for {{variable}} parsing
│   │   │   ├── dateNode.js  # Date provider logic
│   │   │   └── ...          # Integration, Note, Filter nodes
│   │   ├── components/     # UI widgets (Submit button, Toolbars)
│   │   ├── styles/         # Global Tailwind & Custom CSS
│   │   ├── pipeline.js     # Main canvas & state management
│   │   └── App.js          # Root Application
│   ├── package.json        # Node dependencies
│   └── tailwind.config.js  # UI theme configuration
└── README.md               # Project documentation
🎨 Frontend Deep Dive
Modular Node Abstraction
To ensure the project is scalable, I created the BaseNode. Every custom node (Date, Filter, Transform) is wrapped in this component.

The Wrapper: Handles the header, the "X" delete button, and the overall container styling.

The Content: Each specific node only defines its unique input fields.

The Result: 60% less code duplication.

Dynamic Handle Generation
The Text Node is the "brain" of the UI. I implemented a useEffect hook that watches the input field.

Regex: const regex = /{{(.*?)}}/g;

Logic: It captures the text between curly brackets.

UI Update: For every match, it maps a new Handle component to the left side of the node.

⚙️ Backend Deep Dive
FastAPI Framework
I chose FastAPI because of its automatic Swagger UI generation and high speed. It allows the system to handle large graph payloads without blocking the main execution thread.

DFS Cycle Detection Logic
The core algorithmic challenge was checking for cycles.

Python

# Adjacency List Construction
adj = {node.id: [] for node in pipeline.nodes}
for edge in pipeline.edges:
    adj[edge.source].append(edge.target)

# DFS State Sets
visited = set()
rec_stack = set()

def has_cycle(v):
    visited.add(v)
    rec_stack.add(v)
    for neighbor in adj.get(v, []):
        if neighbor not in visited:
            if has_cycle(neighbor):
                return True
        elif neighbor in rec_stack:
            return True
    rec_stack.remove(v)
    return False
This algorithm ensures that we detect Back-Edges, which are the technical indicators of a loop in a directed graph.

🛠 Setup & Installation
Follow these steps to replicate the environment on your local machine.

Prerequisites
Node.js (v16.x or higher)

Python (v3.9 or higher)

npm or yarn

Backend Setup
Enter the backend folder:

Bash

cd backend
Create a virtual environment:

Bash

python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
Install dependencies:

Bash

pip install fastapi uvicorn pydantic
Start the server:

Bash

uvicorn main:app --reload
Frontend Setup
Enter the frontend folder:

Bash

cd frontend
Install dependencies:

Bash

npm install
Start the application:

Bash

npm start
📖 Usage Guide
Launch: Open http://localhost:3000 in your browser.

Design: Drag nodes like "Date" or "Text" from the top toolbar onto the canvas.

Logic: In a Text Node, type Hello {{name}}. A new dot will appear on the left.

Connect: Link the output of one node to the newly created {{name}} input.

Verify: Click the blue "Run Pipeline" button at the bottom.

Analyze: Check the toast notification for node/edge counts and DAG status.

📡 API Documentation
Endpoint: /pipelines/parse
Method: POST

Description: Validates the graph structure.

Request Body (JSON):

JSON

{
  "nodes": [...],
  "edges": [...]
}
Successful Response (200 OK):

JSON

{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
🧠 Design Philosophy
Simplicity: Users shouldn't need a manual to build a workflow.

Safety: The system should proactively prevent logical errors.

Performance: Validations must occur in milliseconds to maintain a "live" feel.

Scalability: New node types should be addable with minimal effort.

🔮 Future Roadmap
[ ] Database Integration: Save pipelines to a MongoDB/PostgreSQL instance.

[ ] Live Execution: Actually run the data through the nodes (e.g., fetching actual dates).

[ ] Collaborative Editing: Multiple users editing the same graph via WebSockets.

[ ] Export to YAML: Export the visual graph into a CI/CD compatible YAML file.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

👨‍💻 Contact & Socials
Dungar Soni Computer Science & Engineering Indian Institute of Technology (IIT), Jodhpur

I am a passionate Full-Stack Developer and Open Source enthusiast. I enjoy solving complex algorithmic problems and building beautiful user experiences.

GitHub: @DungarSoni

LinkedIn: Dungar Soni

Email: soni.dungar@iitj.ac.in

Developed for the VectorShift Technical Assessment. © 2024 Dungar Soni.


---

### **Why this README works:**
- **Recruiters love documentation**: It shows you aren't just a "coder," but an "engineer" who understands the full lifecycle.
- **It explains the "Why"**: Mentioning **DFS**, **Recursion Stacks**, and **Modular Abstraction** proves your Computer Science knowledge from IIT Jodhpur.
- **It's scannable**: It uses tables, icons, and code blocks to make it easy to read quickly.

**Would you like me to help you create the `requirements.txt` or any other file to go with this?**
