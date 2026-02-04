import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Server, Layers, Activity, Search, PlusCircle, Database, Cpu, History } from 'lucide-react';
import TemporalAnalytics from '../components/Blockchain/TemporalAnalytics';

export default function Lab() {
    const {
        blocks, mempool, logs, difficulty, setDifficulty,
        submitOperation, mineManual, isMining, getOperationDetails,
        latency, tps, trigger51Attack, verifyHistoricalTx, historicalQuery
    } = useSimulation();

    const [opType, setOpType] = useState('Identity Claim');
    const [creator, setCreator] = useState('Authority_Alpha');
    const [formData, setFormData] = useState({});
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [showTemporal, setShowTemporal] = useState(false);

    const operationTypes = ['Identity Claim', 'Document Sign', 'Vote', 'Data Log'];

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitOperation(opType, creator, formData);
        setFormData({}); // Reset
    };

    const renderPayloadInputs = () => {
        switch (opType) {
            case 'Identity Claim':
                return (
                    <>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Entity Name</label>
                            <input
                                placeholder="e.g. John Doe / Global Org"
                                value={formData.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '4px' }}
                            />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Attribute Type</label>
                            <input
                                placeholder="e.g. Biometric / License"
                                value={formData.attribute || ''}
                                onChange={(e) => handleInputChange('attribute', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '4px' }}
                            />
                        </div>
                    </>
                );
            case 'Document Sign':
                return (
                    <>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Document ID / Title</label>
                            <input
                                placeholder="e.g. Legal_Draft_v1"
                                value={formData.docId || ''}
                                onChange={(e) => handleInputChange('docId', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '4px' }}
                            />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Signature Integrity Hash</label>
                            <input
                                placeholder="e.g. 0xabc...123"
                                value={formData.hash || ''}
                                onChange={(e) => handleInputChange('hash', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '4px' }}
                            />
                        </div>
                    </>
                );
            case 'Vote':
                return (
                    <>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Ballot Reference</label>
                            <input
                                placeholder="e.g. Election_2024_A"
                                value={formData.ballot || ''}
                                onChange={(e) => handleInputChange('ballot', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '4px' }}
                            />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Selection</label>
                            <select
                                value={formData.choice || ''}
                                onChange={(e) => handleInputChange('choice', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '4px' }}
                            >
                                <option value="">Select Choice</option>
                                <option value="YES">YES / FOR</option>
                                <option value="NO">NO / AGAINST</option>
                                <option value="ABSTAIN">ABSTAIN</option>
                            </select>
                        </div>
                    </>
                );
            default:
                return (
                    <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Log Entry / Observation</label>
                        <textarea
                            placeholder="Record your observation data here..."
                            value={formData.observation || ''}
                            onChange={(e) => handleInputChange('observation', e.target.value)}
                            style={{ width: '100%', height: '60px', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '4px' }}
                        />
                    </div>
                );
        }
    };

    const handleSearch = (id) => {
        const searchIdToUse = id || searchId;
        const result = getOperationDetails(searchIdToUse.trim().toUpperCase());
        setSearchResult(result);
    };

    return (
        <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>

            {/* HEADER WITH HEARTBEAT & METRICS */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Clover Research Lab</h1>
                    <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Agent-Based Blockchain Simulation Environment</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <button
                        onClick={() => setShowTemporal(!showTemporal)}
                        className="btn-primary"
                        style={{ background: showTemporal ? '#64748b' : '#3b82f6', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <History size={18} /> {showTemporal ? 'Mining Lab' : 'Temporal Analytics'}
                    </button>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>NETWORK METRICS</div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.85rem' }}>
                            <span title="Transactions Per Second">📊 {tps} TPS</span>
                            <span title="Network Latency">📡 {latency}ms</span>
                        </div>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: showTemporal ? '1fr 400px' : '1fr 1fr 350px', gap: '1.5rem' }}>

                {showTemporal ? (
                    <TemporalAnalytics />
                ) : (
                    <>
                        {/* LEFT: OPERATION BUILDER & CONTROLS */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            <div className="card">
                                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <PlusCircle size={18} /> Operation Builder
                                </h2>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Operation Category</label>
                                        <select
                                            value={opType}
                                            onChange={(e) => { setOpType(e.target.value); setFormData({}); }}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                                        >
                                            {operationTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Originating Entity</label>
                                        <input
                                            value={creator}
                                            onChange={(e) => setCreator(e.target.value)}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                                        />
                                    </div>

                                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Payload Details</div>
                                        {renderPayloadInputs()}
                                    </div>

                                    <button disabled={isMining} type="submit" className="btn-primary" style={{ marginTop: '4px' }}>
                                        Broadcast to Network
                                    </button>
                                </form>
                            </div>

                            <div className="card">
                                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Cpu size={18} /> Consensus Control
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span>Mining Difficulty</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="range" min="1" max="4" value={difficulty} onChange={(e) => setDifficulty(parseInt(e.target.value))} />
                                        <span style={{ fontWeight: 'bold', width: '20px' }}>{difficulty}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={mineManual}
                                    disabled={isMining || mempool.length === 0}
                                    className="btn-primary"
                                    style={{ width: '100%', background: isMining ? '#94a3b8' : '#3b82f6', height: '48px', position: 'relative' }}
                                >
                                    {isMining ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                            MINING...
                                        </div>
                                    ) : `MINE BLOCK (Pending: ${mempool.length})`}
                                </button>
                            </div>

                            <div className="card" style={{ border: '1px solid #fee2e2' }}>
                                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626' }}>
                                    <Database size={18} /> Attack Lab
                                </h2>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>Simulate network threats to test blockchain resilience.</p>
                                <button
                                    onClick={trigger51Attack}
                                    className="btn-primary"
                                    style={{ width: '100%', background: '#dc2626' }}
                                >
                                    Simulate 51% Attack
                                </button>
                            </div>

                        </section>

                        {/* CENTER: CHAIN VIEW & INSPECTOR */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            <div className="card" style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Layers size={18} /> Blockchain State
                                </h2>
                                <div style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '10px' }}>
                                    {blocks.slice().reverse().map(block => (
                                        <div key={block.hash} style={{
                                            background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: 'bold' }}>BLOCK #{block.index}</span>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(block.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                                                <span>Size: {block.sizeMB} MB</span>
                                                <span>Ops: {block.operations.length}</span>
                                            </div>
                                            <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#94a3b8', marginBottom: '8px', wordBreak: 'break-all' }}>
                                                HASH: {block.hash}
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {block.operations.map(op => (
                                                    <span
                                                        key={op.id}
                                                        onClick={() => { setSearchId(op.id); handleSearch(op.id); }}
                                                        style={{
                                                            fontSize: '0.7rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px',
                                                            cursor: 'pointer'
                                                        }}
                                                        title="Click to Inspect"
                                                    >
                                                        {op.id}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card">
                                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Search size={18} /> Operation Inspector
                                </h2>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: searchResult ? '1rem' : '0' }}>
                                    <input
                                        placeholder="Enter Operation ID"
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                                    />
                                    <button onClick={() => handleSearch()} className="btn-primary" style={{ padding: '8px 16px' }}><Search size={18} /></button>
                                </div>

                                {searchResult && (
                                    <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                        <div style={{ marginBottom: '4px' }}><strong>ID:</strong> {searchResult.op.id}</div>
                                        <div style={{ marginBottom: '4px' }}><strong>Type:</strong> {searchResult.op.type}</div>
                                        <div style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span><strong>Creator:</strong> {searchResult.op.creator}</span>
                                            <button
                                                onClick={() => verifyHistoricalTx(searchResult.op.id)}
                                                style={{ fontSize: '0.7rem', background: '#10b981', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                Verify Lineage
                                            </button>
                                        </div>
                                        {searchResult.status && <div style={{ color: '#f59e0b' }}><strong>Status:</strong> {searchResult.status}</div>}
                                        {searchResult.blockIndex !== undefined && <div style={{ marginBottom: '4px' }}><strong>In Block:</strong> #{searchResult.blockIndex}</div>}

                                        {historicalQuery && historicalQuery.txId === searchResult.op.id && (
                                            <div style={{ marginTop: '12px', padding: '10px', background: '#dcfce7', borderRadius: '6px', border: '1px solid #86efac' }}>
                                                <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Lineage Verification Result</div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem' }}>
                                                    <div>🏃 <strong>Steps:</strong> {historicalQuery.verificationSteps}</div>
                                                    <div>🛡️ <strong>Hops:</strong> {historicalQuery.trustHops}</div>
                                                    <div>⏱️ <strong>Latency:</strong> {historicalQuery.latency}ms</div>
                                                    <div>✅ <strong>Status:</strong> Verified</div>
                                                </div>
                                            </div>
                                        )}

                                        <div style={{ marginTop: '8px' }}>
                                            <strong>Payload:</strong>
                                            <pre style={{ margin: '4px 0 0 0', padding: '8px', background: '#fff', borderRadius: '4px', overflowX: 'auto' }}>
                                                {JSON.stringify(searchResult.op.payload, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </section>
                    </>
                )}

                {/* RIGHT: SYSTEM LOGS */}
                <section className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={18} /> Network Log
                    </h2>
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {logs.map(log => (
                            <div key={log.id} style={{ fontSize: '0.75rem', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                                    <span>{log.agentId}</span>
                                    <span>{log.timestamp}</span>
                                </div>
                                <div style={{ marginTop: '2px', wordBreak: 'break-word' }}>{log.message}</div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        .heartbeat {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
        </div>
    );
}
