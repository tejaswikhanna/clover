import { Block } from './Block.js';
import { LineageGraph } from './LineageGraph.js';
import { LedgerState } from './LedgerState.js';
import { Transformation, TransformationType } from './Transformation.js';

export class Chain {
    constructor() {
        this.lineageGraph = new LineageGraph();
        const genesisBlock = this.createGenesisBlock();
        this.chain = [genesisBlock];

        // Record Genesis State
        const genesisState = new LedgerState(genesisBlock.hash, 0, JSON.stringify(genesisBlock.operations));
        this.lineageGraph.addState(genesisState);
        this.currentLedgerStateId = genesisState.id;

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

        const previousBlock = this.getLatestBlock();
        const block = new Block(
            this.chain.length,
            Date.now(),
            [...this.mempool],
            previousBlock.hash
        );

        block.mineBlock(this.difficulty);

        // Update Lineage
        const newState = new LedgerState(block.hash, this.chain.length, JSON.stringify(block.operations));
        this.lineageGraph.addState(newState);

        const transition = new Transformation(
            TransformationType.BLOCK_ADDITION,
            this.currentLedgerStateId,
            newState.id,
            block.hash,
            this.difficulty // Complexity based on difficulty
        );
        this.lineageGraph.addTransformation(transition);
        this.currentLedgerStateId = newState.id;

        this.chain.push(block);
        this.mempool = [];
        return block;
    }

    // New transformations for research simulation
    upgradeCrypto() {
        const latestBlock = this.getLatestBlock();
        const upgradedStateId = 'UPGRADE-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const upgradedState = new LedgerState(upgradedStateId, this.chain.length, "CRYPTO_V2_ROOT");

        this.lineageGraph.addState(upgradedState);
        const transition = new Transformation(
            TransformationType.UPGRADE,
            this.currentLedgerStateId,
            upgradedState.id,
            "SIG-ED25519-UPGRADE",
            10 // Fixed high complexity for upgrade verification
        );
        this.lineageGraph.addTransformation(transition);
        this.currentLedgerStateId = upgradedState.id;
        return transition;
    }

    createSnapshot() {
        const snapshotId = 'SNAP-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const snapshotState = new LedgerState(snapshotId, this.chain.length, "SNAPSHOT_ROOT");

        this.lineageGraph.addState(snapshotState);
        const transition = new Transformation(
            TransformationType.SNAPSHOT,
            this.currentLedgerStateId,
            snapshotState.id,
            "MERKLE-PROOF-SNAPSHOT",
            5 // Medium complexity
        );
        this.lineageGraph.addTransformation(transition);
        this.currentLedgerStateId = snapshotState.id;
        return transition;
    }

    findOperationById(id) {
        for (const block of this.chain) {
            const op = block.operations.find(o => o.id === id);
            if (op) return { op, blockIndex: block.index, blockHash: block.hash };
        }
        const pendingOp = this.mempool.find(o => o.id === id);
        if (pendingOp) return { op: pendingOp, status: 'pending' };
        return null;
    }
}
