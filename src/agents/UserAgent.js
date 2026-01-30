import { NodeAgent } from './NodeAgent';

export class UserAgent extends NodeAgent {
    constructor(id, context) {
        super(id, 'USER', context);
        this.operationTypes = ['Identity Claim', 'Document Sign', 'Vote', 'Data Log'];
    }

    loop() {
        if (!this.active) return;
        const delay = Math.random() * 10000 + 5000; // 5-15 seconds

        setTimeout(() => {
            if (!this.active) return;

            const type = this.operationTypes[Math.floor(Math.random() * this.operationTypes.length)];
            this.context.submitOperation(
                type,
                this.id,
                { note: `Auto-generated ${type}`, val: Math.floor(Math.random() * 1000) }
            );

            this.loop();
        }, delay);
    }
}
