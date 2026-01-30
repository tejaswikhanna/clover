import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Chain } from '../lib/Chain';
import { Operation } from '../lib/Operation';

const SimulationContext = createContext();

export function SimulationProvider({ children }) {
    const chainRef = useRef(new Chain());
    const [blocks, setBlocks] = useState(chainRef.current.chain);
    const [mempool, setMempool] = useState([]);
    const [difficulty, setDifficulty] = useState(2);
    const [logs, setLogs] = useState([]);
    const [isMining, setIsMining] = useState(false);

    // Research Settings
    const [miningReward, setMiningReward] = useState(100);
    const [mempoolLimit, setMempoolLimit] = useState(10);
    const [isAutoMining, setIsAutoMining] = useState(false);
    const [latency, setLatency] = useState(0); // in ms
    const [tps, setTps] = useState(0);

    // Track TPS
    const opCountRef = useRef(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTps(opCountRef.current);
            opCountRef.current = 0;
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addLog = (message, agentId = 'SYSTEM') => {
        setLogs(prev => [{
            id: Date.now() + Math.random(),
            agentId,
            message,
            timestamp: new Date().toLocaleTimeString()
        }, ...prev].slice(0, 50));
    };

    const submitOperation = (type, creator, payload) => {
        const op = new Operation(type, creator, payload);
        chainRef.current.addOperation(op);
        opCountRef.current += 1; // Increment TPS counter
        setMempool([...chainRef.current.mempool]);
        addLog(`Broadcast: ${type} [ID: ${op.id}] by ${creator}`, 'NETWORK');

        // Auto-mining check
        if (isAutoMining && chainRef.current.mempool.length >= mempoolLimit) {
            mineManual();
        }

        return op;
    };

    const mineManual = async () => {
        if (chainRef.current.mempool.length === 0) return;
        if (isMining) return;

        setIsMining(true);
        addLog(`Consensus search started (Latency: ${latency}ms)...`, "MINER");

        // Reduced artificial delay to simulate PoW without making it feel sluggish
        await new Promise(resolve => setTimeout(resolve, (250 * difficulty) + latency));

        chainRef.current.difficulty = difficulty;
        const newBlock = chainRef.current.mineMempool();

        if (newBlock) {
            setBlocks([...chainRef.current.chain]);
            setMempool([]);
            addLog(`💎 Block #${newBlock.index} indexed [ID: ${newBlock.blockId}]. Reward: ${miningReward}`, "MINER");
        }

        setIsMining(false);
    };

    const trigger51Attack = async () => {
        addLog("🔴 CRITICAL: 51% Attack Simulation started!", "ATTACKER");
        setIsMining(true);
        // Simulate high-speed mining that ignores difficulty
        await new Promise(resolve => setTimeout(resolve, 500));
        const maliciousOps = [new Operation('DATA_WIPE', 'ATTACKER', { target: 'all' })];
        const shadowBlock = new Block(blocks.length, Date.now(), maliciousOps, blocks[blocks.length - 1].hash);

        chainRef.current.chain.push(shadowBlock);
        setBlocks([...chainRef.current.chain]);
        addLog("💀 Shadow chain has overtaken the main branch!", "ATTACKER");
        setIsMining(false);
    };

    const resetChain = () => {
        chainRef.current = new Chain();
        setBlocks(chainRef.current.chain);
        setMempool([]);
        addLog("⚠️ Blockchain reset to Genesis Block.", "SYSTEM");
    };

    const getOperationDetails = (id) => {
        return chainRef.current.findOperationById(id);
    };

    return (
        <SimulationContext.Provider value={{
            blocks, mempool, logs, difficulty, setDifficulty,
            submitOperation, mineManual, isMining, getOperationDetails,
            miningReward, setMiningReward, mempoolLimit, setMempoolLimit,
            isAutoMining, setIsAutoMining, resetChain,
            latency, setLatency, tps, trigger51Attack
        }}>
            {children}
        </SimulationContext.Provider>
    );
}

export function useSimulation() {
    return useContext(SimulationContext);
}
