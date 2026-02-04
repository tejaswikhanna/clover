export const TransformationType = {
    BLOCK_ADDITION: 'BLOCK_ADDITION',
    FORK: 'FORK',
    UPGRADE: 'UPGRADE',
    SNAPSHOT: 'SNAPSHOT'
};

export class Transformation {
    constructor(type, fromState, toState, proof, complexity) {
        this.type = type;
        this.fromState = fromState; // LedgerState ID
        this.toState = toState; // LedgerState ID
        this.proof = proof; // Hash or verification proof
        this.complexity = complexity; // Relative cost of verification
    }
}
