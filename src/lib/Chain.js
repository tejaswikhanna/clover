import { Block } from './Block';

export class Chain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.mempool = []; // Pending operations
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addOperation(operation) {
        this.mempool.push(operation);
    }

    mineMempool() {
        if (this.mempool.length === 0) return null;

        const block = new Block(
            this.chain.length,
            Date.now(),
            [...this.mempool],
            this.getLatestBlock().hash
        );

        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.mempool = [];
        return block;
    }

    findOperationById(id) {
        for (const block of this.chain) {
            const op = block.operations.find(o => o.id === id);
            if (op) return { op, blockIndex: block.index };
        }
        const pendingOp = this.mempool.find(o => o.id === id);
        if (pendingOp) return { op: pendingOp, status: 'pending' };
        return null;
    }
}
