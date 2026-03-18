import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const DrawAnimation = ({ lottery, ticket, onFinish }) => {
    const [phase, setPhase] = useState('countdown'); // countdown, spinning, result
    const [count, setCount] = useState(3);
    const [rotation, setRotation] = useState(0);

    // Determine if THIS SPECIFIC TICKET won
    // Use status as primary truth, fallback to wonPrizeId presence
    const didWin = ticket?.status === 'WON' || !!ticket?.wonPrizeId;
    const winningPrize = didWin
        ? (lottery.prizes?.find(p => p.id === ticket.wonPrizeId) ||
            (lottery.prizes && lottery.prizes[0]) ||
            { id: 'main', item: lottery.item, rank: 1 })
        : null;

    // Define wheel segments: Prizes (or main item) + "Lose" segments
    const getSegments = () => {
        let prizeSegments = [];

        if (lottery.prizes && lottery.prizes.length > 0) {
            prizeSegments = lottery.prizes.map(p => ({
                id: `prize-${p.id}`,
                name: p.item?.name || `Prize #${p.rank}`,
                rank: p.rank,
                color: p.rank === 1 ? '#F43F5E' : p.rank === 2 ? '#8B5CF6' : p.rank === 3 ? '#10B981' : '#F59E0B',
                isWin: true,
                prizeId: p.id
            }));
        } else if (lottery.item) {
            prizeSegments = [{
                id: 'main',
                name: lottery.item.name || 'Grand Prize',
                rank: 1,
                color: '#F43F5E',
                isWin: true
            }];
        }

        // Always add at least one lost segment.
        // If segments count is low, add more lost segments to make the wheel look better
        const lostSegments = [];
        const targetLostCount = Math.max(1, 4 - prizeSegments.length);

        for (let i = 0; i < targetLostCount; i++) {
            lostSegments.push({
                id: `lost-${i}`,
                name: 'Better luck next time',
                color: i % 2 === 0 ? '#1E293B' : '#0F172A',
                isWin: false
            });
        }

        return [...prizeSegments, ...lostSegments];
    };

    const segments = getSegments();

    const segmentAngle = 360 / segments.length;

    // Calculate target rotation
    const getTargetRotation = () => {
        let targetIndex;
        if (didWin) {
            targetIndex = segments.findIndex(s => s.prizeId === winningPrize?.id);
            if (targetIndex === -1) targetIndex = segments.findIndex(s => s.id === 'main');
            if (targetIndex === -1) targetIndex = segments.findIndex(s => s.isWin);
        } else {
            // Pick a random "lost" segment if multiple exist
            const lostIndices = segments.map((s, idx) => s.isWin ? -1 : idx).filter(idx => idx !== -1);
            targetIndex = lostIndices[Math.floor(Math.random() * lostIndices.length)];
        }

        const centerAngle = (targetIndex * segmentAngle) + (segmentAngle / 2);
        const extraSpins = 360 * 5; // 5 full rotations
        return extraSpins + (360 - centerAngle);
    };

    useEffect(() => {
        if (phase === 'countdown') {
            const timer = setInterval(() => {
                setCount(c => {
                    if (c === 1) {
                        clearInterval(timer);
                        setTimeout(() => {
                            setPhase('spinning');
                            setRotation(getTargetRotation());
                        }, 500);
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }

        if (phase === 'spinning') {
            const spinDuration = 5000;
            const timer = setTimeout(() => {
                setPhase('result');
                setTimeout(onFinish, 4000);
            }, spinDuration);
            return () => clearTimeout(timer);
        }
    }, [phase, onFinish, rotation]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl"
        >
            <div className="max-w-xl w-full flex flex-col items-center">
                {phase === 'countdown' && (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-8">
                        <Trophy size={80} className="text-brand-primary mx-auto animate-bounce" />
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Preparing Draw...</h2>
                        <motion.div
                            key={count}
                            initial={{ scale: 2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-9xl font-black text-brand-primary"
                        >
                            {count}
                        </motion.div>
                    </motion.div>
                )}

                {(phase === 'spinning' || phase === 'result') && (
                    <div className="space-y-12 w-full flex flex-col items-center">
                        <div className="relative">
                            <h2 className="text-3xl font-black mb-8 uppercase tracking-widest text-slate-400">
                                {phase === 'spinning' ? 'Spinning Wheel...' : didWin ? 'YOU WON!' : 'DRAW COMPLETED'}
                            </h2>

                            {/* Circular Wheel Container */}
                            <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                                {/* Pointer */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30">
                                    <div className="w-8 h-10 bg-white clip-path-triangle shadow-xl"></div>
                                    <div className="w-12 h-12 bg-white rounded-full -mt-8 flex items-center justify-center border-4 border-slate-900 shadow-xl">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* The Wheel */}
                                <motion.div
                                    animate={{ rotate: rotation }}
                                    transition={{ duration: 5, ease: [0.15, 0, 0.15, 1] }}
                                    className="w-full h-full rounded-full border-8 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
                                    style={{ background: '#0F172A' }}
                                >
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        {segments.map((s, i) => {
                                            const startAngle = i * segmentAngle;
                                            const endAngle = (i + 1) * segmentAngle;

                                            const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                                            const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                                            const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                                            const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

                                            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                                            return (
                                                <g key={i}>
                                                    <path
                                                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                                        fill={s.color}
                                                        stroke="#0F172A"
                                                        strokeWidth="0.5"
                                                    />
                                                    <text
                                                        x="50"
                                                        y="20"
                                                        transform={`rotate(${startAngle + segmentAngle / 2}, 50, 50)`}
                                                        fill="white"
                                                        fontSize="4"
                                                        fontWeight="900"
                                                        textAnchor="middle"
                                                        className="uppercase tracking-tighter"
                                                        style={{ paintOrder: 'stroke', stroke: 'black', strokeWidth: '0.5px' }}
                                                    >
                                                        {s.name.length > 15 ? s.name.substring(0, 12) + '...' : s.name}
                                                    </text>
                                                </g>
                                            );
                                        })}
                                        <circle cx="50" cy="50" r="5" fill="white" stroke="#0F172A" strokeWidth="2" />
                                        <circle cx="50" cy="50" r="2" fill="#F472B6" />
                                    </svg>
                                </motion.div>

                                <div className="absolute inset-[-20px] rounded-full border border-white/5 pointer-events-none">
                                    {[...Array(12)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_#FACC15]"
                                            style={{
                                                top: '50%',
                                                left: '50%',
                                                transform: `rotate(${i * 30}deg) translateY(-190px) translateX(-50%)`,
                                                transformOrigin: 'top left'
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-3xl rounded-full -z-10 transition-colors duration-1000 ${didWin && phase === 'result' ? 'bg-green-500/20' : 'bg-brand-primary/20'}`}></div>
                        </div>

                        {phase === 'result' && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="space-y-6"
                            >
                                {didWin ? (
                                    <div className="glass-effect p-8 rounded-3xl border-2 border-yellow-400/50 bg-yellow-400/5 animate-bounce">
                                        <Trophy size={48} className="text-yellow-400 mx-auto mb-4" />
                                        <h3 className="text-3xl font-black mb-1">CONGRATULATIONS!</h3>
                                        <p className="text-slate-400 mb-4">You won the {winningPrize.item?.name}</p>
                                        <div className="text-brand-primary font-mono text-xl font-bold uppercase tracking-widest">
                                            {winningPrize.rank === 1 ? '🥇 1st Prize' : winningPrize.rank === 2 ? '🥈 2nd Prize' : '🥉 3rd Prize'}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="glass-effect p-8 rounded-3xl border border-slate-700 bg-slate-800/30">
                                        <h3 className="text-2xl font-bold mb-2 text-slate-300">Better luck next time!</h3>
                                        <p className="text-slate-500">You didn't win this time, but there's always a next chance!</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default DrawAnimation;
