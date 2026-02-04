import { TransformationType } from './Transformation.js';

export class LineageGraph {
    constructor() {
        this.nodes = new Map(); // id -> LedgerState
        this.edges = []; // Array of Transformation
        this.adjacencyList = new Map(); // fromId -> [Transformations]
    }

    addState(state) {
        if (!this.nodes.has(state.id)) {
            this.nodes.set(state.id, state);
            this.adjacencyList.set(state.id, []);
        }
    }

    addTransformation(transformation) {
        this.edges.push(transformation);
        if (!this.adjacencyList.has(transformation.fromState)) {
            this.adjacencyList.set(transformation.fromState, []);
        }
        this.adjacencyList.get(transformation.fromState).push(transformation);

        // Ensure toState node exists in adjacency list too
        if (!this.adjacencyList.has(transformation.toState)) {
            this.adjacencyList.set(transformation.toState, []);
        }
    }

    /**
     * Verifies historical truth by traversing transformations.
     * Returns verification metrics.
     */
    verifyPath(startStateId, endStateId) {
        // Simple BFS to find path in this simulation
        let queue = [[startStateId, []]];
        let visited = new Set();
        visited.add(startStateId);

        while (queue.length > 0) {
            let [currentId, path] = queue.shift();

            if (currentId === endStateId) {
                return this.computeMetrics(path);
            }

            const currentEdges = this.adjacencyList.get(currentId) || [];
            for (const edge of currentEdges) {
                if (!visited.has(edge.toState)) {
                    visited.add(edge.toState);
                    queue.push([edge.toState, [...path, edge]]);
                }
            }
        }

        return null; // Path not found
    }

    computeMetrics(path) {
        const transformations = path.length;
        const totalComplexity = path.reduce((sum, edge) => sum + edge.complexity, 0);
        const trustHops = path.filter(edge => edge.type !== TransformationType.BLOCK_ADDITION).length;

        // relative metric: latency increases with age/transformations
        const latency = (transformations * 10) + (totalComplexity * 5) + (trustHops * 50);

        return {
            transformations,
            verificationSteps: totalComplexity,
            trustHops,
            latency,
            pathVerified: true
        };
    }
}
