import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Settings as SettingsIcon, AlertTriangle, RefreshCw, Zap } from 'lucide-react';

export default function Settings() {
    const {
        miningReward, setMiningReward,
        mempoolLimit, setMempoolLimit,
        isAutoMining, setIsAutoMining,
        resetChain,
        latency, setLatency
    } = useSimulation();

    return (
        <div style={{ padding: '2rem', maxWidth: '800px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <SettingsIcon size={28} /> Simulation Settings
                </h1>
                <p style={{ color: '#64748b' }}>Configure high-level parameters for your blockchain research environment.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* NETWORK PARAMS */}
                <section className="card">
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Network Parameters</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>Validator Reward (Reputation)</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Points assigned to the entity that mines a new block.</div>
                            </div>
                            <input
                                type="number"
                                value={miningReward}
                                onChange={(e) => setMiningReward(parseInt(e.target.value))}
                                style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>Mempool Threshold</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Number of pending operations required for auto-mining.</div>
                            </div>
                            <input
                                type="number"
                                value={mempoolLimit}
                                onChange={(e) => setMempoolLimit(parseInt(e.target.value))}
                                style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>Network Latency (ms)</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Simulated delay in block propagation.</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="range" min="0" max="2000" step="100"
                                    value={latency}
                                    onChange={(e) => setLatency(parseInt(e.target.value))}
                                />
                                <span style={{ fontWeight: 'bold', width: '60px' }}>{latency}ms</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AUTOMATION */}
                <section className="card">
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={18} color="#f59e0b" /> Automation
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Auto-Mining Mode</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Automatically trigger a mining process when threshold is reached.</div>
                        </div>
                        <button
                            onClick={() => setIsAutoMining(!isAutoMining)}
                            style={{
                                width: '60px', height: '30px', borderRadius: '15px',
                                backgroundColor: isAutoMining ? '#10b981' : '#cbd5e1',
                                border: 'none', position: 'relative', cursor: 'pointer', transition: '0.3s'
                            }}
                        >
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
                                position: 'absolute', top: '3px', left: isAutoMining ? '33px' : '3px',
                                transition: '0.3s'
                            }} />
                        </button>
                    </div>
                </section>

                {/* DANGER ZONE */}
                <section className="card" style={{ border: '1px solid #fee2e2' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={18} /> Danger Zone
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Reset Simulation</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Delete all blocks except Genesis and clear the mempool.</div>
                        </div>
                        <button
                            onClick={() => { if (confirm("Are you sure? This will wipe the research data.")) resetChain(); }}
                            className="btn-primary"
                            style={{ background: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <RefreshCw size={16} /> Reset Blockchain
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}
