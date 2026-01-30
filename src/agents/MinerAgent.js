import { NodeAgent } from './NodeAgent';

export class MinerAgent extends NodeAgent {
    constructor(id, context) {
        super(id, 'MINER', context);
    }

    // In this research version, we might not need an autonomous loop 
    // if mining is manual, but we can have it notify about mempool size.
    loop() {
        if (!this.active) return;

        // Periodically check mempool
        setTimeout(() => {
            if (!this.active) return;
            // Miner just logs status in this mode
            this.loop();
        }, 5000);
    }
}
