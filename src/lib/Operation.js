export class Operation {
    constructor(type, creator, payload, timestamp = Date.now()) {
        this.id = this.generateId();
        this.type = type; // 'Identity Claim', 'Document Sign', 'Vote', 'Data Log'
        this.creator = creator;
        this.payload = payload; // Object containing dynamic fields
        this.timestamp = timestamp;
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}
