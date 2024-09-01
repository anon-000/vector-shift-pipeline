from fastapi import FastAPI, Form
from typing import Dict, List
import json
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    # Allow all origins. Change this in production to specific origins.
    allow_origins=["*"],
    allow_credentials=True,
    # Allow all methods. You can restrict this to specific methods.
    allow_methods=["*"],
    # Allow all headers. You can restrict this to specific headers.
    allow_headers=["*"],
)


def is_cyclic_util(node: str, visited: Dict[str, bool], recursion_stack: Dict[str, bool], graph: Dict[str, List[str]]) -> bool:
    visited[node] = True
    recursion_stack[node] = True

    for neighbor in graph.get(node, []):
        if not visited.get(neighbor, False):
            if is_cyclic_util(neighbor, visited, recursion_stack, graph):
                return True
        elif recursion_stack.get(neighbor, False):
            return True

    recursion_stack[node] = False
    return False


def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        graph[edge['source']].append(edge['target'])

    visited = {node['id']: False for node in nodes}
    recursion_stack = {node['id']: False for node in nodes}

    for node in nodes:
        if not visited[node['id']]:
            if is_cyclic_util(node['id'], visited, recursion_stack, graph):
                return False
    return True


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    pipeline_data = json.loads(pipeline)

    nodes = pipeline_data['nodes']
    edges = pipeline_data['edges']

    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag_result = is_dag(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
