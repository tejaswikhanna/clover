import React, { useMemo } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Clock, History, Milestone } from 'lucide-react';

export default function TemporalAnalytics() {
    const {
        virtualYear, setVirtualYear, historicalQuery,
        performUpgrade, performSnapshot, blocks, difficulty
    } = useSimulation();

    // Mock data for the chart based on current blocks and transformations
    const chartData = useMemo(() => {
        const data = [];
        // Calculate current real base metrics from historicalQuery or chain state
        const baseComplexity = historicalQuery ? historicalQuery.verificationSteps : (blocks.length * difficulty);
        const baseLatency = historicalQuery ? historicalQuery.latency : (blocks.length * 10);

        for (let i = 0; i < 11; i++) {
            const age = i * 20; // 0, 20, 40... 200 years

            // Age factor: Latency increases with storage age, complexity increases slightly with maintenance
            const ageLatencyFactor = age * 1.2;
            const ageComplexityFactor = Math.floor(age / 50);

            data.push({
                age: age,
                latency: Math.round(baseLatency + ageLatencyFactor),
                complexity: baseComplexity + ageComplexityFactor,
                availability: Math.max(100 - (age * 0.05), 92)
            });
        }
        return data;
    }, [blocks.length, difficulty, historicalQuery]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* TIME SLIDER CARD */}
            <div className="card" style={{ border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={18} /> Temporal Navigation
                    </h2>
                    <span style={{
                        fontSize: '1.2rem', fontWeight: 800, color: '#3b82f6',
                        padding: '4px 12px', background: '#dbeafe', borderRadius: '20px'
                    }}>
                        YEAR {virtualYear}
                    </span>
                </div>

                <input
                    type="range"
                    min="2026"
                    max="2226"
                    value={virtualYear}
                    onChange={(e) => setVirtualYear(parseInt(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer', height: '8px', borderRadius: '4px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: '#64748b' }}>
                    <span>PRESENT (2026)</span>
                    <span>+100 YEARS</span>
                    <span>CENTURY II (2226)</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <button onClick={performUpgrade} className="btn-primary" style={{ flex: '1 1 150px', fontSize: '0.8rem', background: '#8b5cf6' }}>
                        <Milestone size={14} style={{ marginRight: '4px' }} /> Upgrade Crypto
                    </button>
                    <button onClick={performSnapshot} className="btn-primary" style={{ flex: '1 1 150px', fontSize: '0.8rem', background: '#06b6d4' }}>
                        <History size={14} style={{ marginRight: '4px' }} /> Take Snapshot
                    </button>
                </div>
            </div>

            {/* METRICS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                <div className="card" style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>QUERY LATENCY</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '4px 0', color: '#ef4444' }}>
                        {historicalQuery ? `${Math.round(historicalQuery.latency + (virtualYear - 2026) * 2)}ms` : '--'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Increases with Age of Data</div>
                </div>
                <div className="card" style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>AUTHENTICITY</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '4px 0', color: '#10b981' }}>
                        100%
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Constant via Lineage Proofs</div>
                </div>
            </div>

            {/* CHARTS */}
            <div className="card">
                <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#475569' }}>Query Latency vs Age of Data</h3>
                <div style={{ height: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="age" label={{ value: 'Age (Years)', position: 'insideBottom', offset: -5, fontSize: 10 }} fontSize={10} />
                            <YAxis fontSize={10} />
                            <Tooltip />
                            <Area type="monotone" dataKey="latency" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorLatency)" name="Latency (ms)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card">
                <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#475569' }}>Verification Complexity</h3>
                <div style={{ height: '150px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="age" fontSize={10} hide />
                            <YAxis fontSize={10} />
                            <Tooltip />
                            <Line type="monotone" dataKey="complexity" stroke="#f59e0b" strokeWidth={2} dot={false} name="Steps" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}
