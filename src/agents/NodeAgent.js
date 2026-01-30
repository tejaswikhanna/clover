export class NodeAgent {
    constructor(id, type, simulationContext) {
        this.id = id;
        this.type = type;
        this.context = simulationContext;
        this.logs = [];
        this.active = false;
    }

    log(message) {
        const entry = { id: Date.now() + Math.random(), agentId: this.id, message, timestamp: new Date().toLocaleTimeString() };
        this.context.addLog(entry);
    }

    start() {
        this.active = true;
        this.log('Node started.');
        this.loop();
    }

    stop() {
        this.active = false;
        this.log('Node stopped.');
    }

    loop() { }
}
