export class LedgerState {
    constructor(id, sequence, dataRoot, timestamp = Date.now()) {
        this.id = id; // Hash of the state
        this.sequence = sequence; // Sequential index
        this.dataRoot = dataRoot; // Merkle root or equivalent hash of state data
        this.timestamp = timestamp;
    }
}
