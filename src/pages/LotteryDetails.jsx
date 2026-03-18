import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllLotteries } from '../api/lottery';
import { getMyTickets, purchaseTicket } from '../api/ticket';
import { useAuth } from '../context/AuthContext';
import {
    ShieldCheck,
    Ticket,
    Wallet,
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    Info,
    Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DrawAnimation from '../components/DrawAnimation';

const LotteryDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [lottery, setLottery] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [buying, setBuying] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showDrawAnimation, setShowDrawAnimation] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    // To handle the animation for "first seen" drawn lottery
    const [couponCode, setCouponCode] = useState('');
    const [revealTicketData, setRevealTicketData] = useState(null);

    useEffect(() => {
        const fetchLottery = async () => {
            try {
                // Fetch all to include DRAWN/ACTIVE
                const data = await getAllLotteries();
                const found = data.find(l => l.id === parseInt(id));
                setLottery(found);

                if (found && found.status === 'DRAWN') {
                    const seenKey = `draw_seen_${found.id}`;
                    if (!localStorage.getItem(seenKey)) {
                        // Find any ticket of the user for this lottery to show the result
                        // This is for the "Landing on page" auto-draw
                        const myTickets = await getMyTickets();
                        const myTicketForThisLottery = myTickets.find(t => t.lotteryId === found.id);
                        if (myTicketForThisLottery) {
                            setRevealTicketData(myTicketForThisLottery);
                            setShowDrawAnimation(true);
                        } else {
                            // If user has no tickets, just show the result without animation or with a default "lost" animation
                            setShowDrawAnimation(true);
                        }
                    } else {
                        setAnimationComplete(true);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch lottery', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLottery();
    }, [id]);

    const handleAnimationFinish = () => {
        setShowDrawAnimation(false);
        setAnimationComplete(true);
        if (lottery) {
            localStorage.setItem(`draw_seen_${lottery.id}`, 'true');
        }
    };

    const handlePurchase = async () => {
        if (!user) {
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        setBuying(true);
        setError('');
        try {
            const response = await purchaseTicket({
                lotteryId: parseInt(id),
                quantity: quantity,
                couponCode: couponCode
            });

            if (response.checkoutUrl) {
                window.location.href = response.checkoutUrl;
            } else {
                setSuccess(true);
                setTimeout(() => navigate('/dashboard'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Purchase failed');
        } finally {
            setBuying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!lottery) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Lottery not found or already closed.</h2>
                <Link to="/" className="text-brand-primary hover:underline">Back to Home</Link>
            </div>
        );
    }

    const totalPrice = (lottery.ticketPrice * quantity).toFixed(2);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <AnimatePresence>
                    {showDrawAnimation && (
                        <DrawAnimation
                            lottery={lottery}
                            ticket={revealTicketData}
                            onFinish={handleAnimationFinish}
                        />
                    )}
                </AnimatePresence>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition font-medium"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Image and Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="rounded-3xl overflow-hidden bg-white shadow-sm p-2 mb-8 relative border border-slate-200">
                            <img
                                src={lottery.item.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'}
                                className="w-full h-[500px] object-cover rounded-2xl"
                                alt={lottery.item.name}
                            />
                            {lottery.status === 'DRAWN' && (
                                <div className="absolute top-6 right-6 px-6 py-2 bg-brand-primary rounded-full font-bold shadow-2xl flex items-center gap-2 animate-pulse text-white">
                                    <Trophy size={20} /> DRAW COMPLETE
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-4xl font-extrabold text-slate-900">{lottery.item.name}</h1>
                                <div className={`p-4 rounded-2xl bg-white border border-slate-200 shadow-sm ${lottery.status === 'DRAWN' ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                                    <p className="text-slate-500 text-[10px] uppercase mb-1 font-bold">Status</p>
                                    <p className="text-sm font-bold flex items-center gap-2">
                                        {lottery.status === 'DRAWN' ? <Trophy size={16} /> : <ShieldCheck size={16} />}
                                        {lottery.status}
                                    </p>
                                </div>
                            </div>

                            <p className="text-slate-600 text-lg leading-relaxed">{lottery.item.description}</p>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                                    <Trophy className="text-brand-primary" size={20} /> Prize Pool
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {lottery.prizes?.map((prize, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-200 shadow-sm">
                                            <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center font-bold text-lg">
                                                {prize.rank}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-bold text-slate-900">{prize.item?.name}</p>
                                                <p className="text-xs text-slate-500">Retail Value: ${prize.item?.retailPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {(!lottery.prizes || lottery.prizes.length === 0) && (
                                        <div className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-200 shadow-sm">
                                            <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center font-bold text-lg">1</div>
                                            <p className="font-bold text-slate-900">{lottery.item.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Purchase Card or Winner Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:pt-4"
                    >
                        <div className="bg-white p-8 md:p-10 rounded-3xl sticky top-28 border border-slate-200 shadow-xl">
                            {lottery.status === 'DRAWN' ? (
                                <div className="space-y-8 text-center py-4">
                                    <div className="p-6 bg-brand-primary/10 rounded-3xl mb-4 inline-block">
                                        <Trophy size={64} className="text-brand-primary mx-auto" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black mb-2 text-slate-900">We Have A Winner!</h3>
                                        <p className="text-slate-500">The provably fair draw has been completed</p>
                                    </div>

                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {lottery.prizes?.map((prize, idx) => (
                                            <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 relative overflow-hidden group text-left transition-hover hover:border-brand-primary/30">
                                                <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded">
                                                        Rank {prize.rank}
                                                    </span>
                                                    {prize.winnerId === user?.id && (
                                                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                                                            YOU WON!
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 mb-1">{prize.item?.name}</p>
                                                <p className="text-xl font-mono font-black text-brand-primary truncate">
                                                    {prize.winner?.fullName || 'User ' + prize.winnerId?.substring(0, 8)}
                                                </p>
                                                {prize.winnerTicketNumber && (
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                                                        Ticket #{prize.winnerTicketNumber}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                        {(!lottery.prizes || lottery.prizes.length === 0) && (
                                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative overflow-hidden group">
                                                <p className="text-slate-500 text-xs uppercase mb-3 tracking-widest font-bold">Winning User ID</p>
                                                <p className="text-2xl font-mono font-black text-brand-primary truncate">{lottery.winnerId}</p>
                                            </div>
                                        )}
                                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 font-bold">
                                            <ShieldCheck size={16} /> Verified Provably Fair
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-6">
                                        <p className="text-slate-500 text-sm">Better luck next time if you didn't win! Check out other active lotteries.</p>
                                        <Link to="/" className="block w-full premium-gradient py-5 rounded-2xl font-bold text-lg text-white transition-all shadow-xl shadow-brand-primary/20 hover:scale-[1.02] text-center">
                                            View All Lotteries
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-2xl">
                                                <Ticket size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900">Buy Tickets</h3>
                                                <p className="text-slate-500 text-sm">Provably fair chance to win</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-500 text-xs uppercase mb-1">Ticket Price</p>
                                            <p className="text-3xl font-black text-brand-primary">${lottery.ticketPrice}</p>
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {success ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-green-500/10 border border-green-500/50 p-8 rounded-2xl text-center space-y-4"
                                            >
                                                <CheckCircle2 size={48} className="text-green-600 mx-auto" />
                                                <h4 className="text-xl font-bold text-green-600">Tickets Purchased!</h4>
                                                <p className="text-slate-500 text-sm">Your order was successful. Redirecting to your dashboard...</p>
                                            </motion.div>
                                        ) : (
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">Select Quantity</label>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                            className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-primary flex items-center justify-center text-2xl font-bold transition text-slate-900"
                                                        >
                                                            -
                                                        </button>
                                                        <div className="flex-grow bg-slate-50 border border-slate-200 rounded-xl h-14 flex items-center justify-center text-xl font-bold font-mono text-slate-900">
                                                            {quantity}
                                                        </div>
                                                        <button
                                                            onClick={() => setQuantity(quantity + 1)}
                                                            className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-primary flex items-center justify-center text-2xl font-bold transition text-slate-900"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1.5 ml-1">
                                                        <Info size={14} /> Maximum tickets per purchase: 50
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">Have a coupon?</label>
                                                    <div className="relative">
                                                        <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-45" size={18} />
                                                        <input
                                                            type="text"
                                                            value={couponCode}
                                                            onChange={(e) => setCouponCode(e.target.value)}
                                                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl py-4 pl-12 pr-4 outline-none transition text-slate-900 placeholder:text-slate-400"
                                                            placeholder="Enter FREE coupon code"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-slate-100">
                                                    <div className="flex justify-between items-center mb-8">
                                                        <p className="text-lg font-medium text-slate-500">Total Price</p>
                                                        <p className="text-3xl font-black text-slate-900">${totalPrice}</p>
                                                    </div>

                                                    {error && (
                                                        <div className="bg-red-500/10 border border-red-500/50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-2 text-sm">
                                                            <AlertCircle className="shrink-0" size={18} />
                                                            {error}
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={handlePurchase}
                                                        disabled={buying}
                                                        className="w-full premium-gradient py-5 rounded-2xl font-bold text-lg text-white shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                    >
                                                        {buying ? (
                                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        ) : (
                                                            <>
                                                                <Wallet size={20} /> Checkout Securely
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </>
                            )}

                            {!user && (
                                <p className="mt-6 text-center text-slate-500 text-sm">
                                    Already have an account? <Link to="/login" className="text-brand-primary hover:underline">Login</Link>
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LotteryDetails;
