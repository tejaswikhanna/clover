export class Block {
    constructor(index, timestamp, operations, previousHash = '') {
        this.index = index;
        this.blockId = this.generateBlockId();
        this.timestamp = timestamp;
        this.operations = operations;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
        this.sizeMB = (0.05 * operations.length).toFixed(3); // Mock size calculation
    }

    generateBlockId() {
        return 'BLK-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    calculateHash() {
        return String(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.operations) +
            this.nonce
        ).split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0).toString(16);
    }

    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        // Ensure we don't block the UI forever in a mock simulation
        let iterations = 0;
        while (this.hash.substring(0, difficulty) !== target && iterations < 50000) {
            this.nonce++;
            this.hash = this.calculateHash();
            iterations++;
        }
    }
}
