import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { verifyPayment } from '../api/payment';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [error, setError] = useState('');

    const txRef = searchParams.get('tx_ref');

    useEffect(() => {
        const verify = async () => {
            if (!txRef) {
                setStatus('error');
                setError('No transaction reference found.');
                return;
            }

            try {
                await verifyPayment(txRef);
                setStatus('success');
            } catch (err) {
                console.error('Verification failed', err);
                // Even if verify fails, it might be due to timing (webhook already processed it)
                // We'll give it a second chance or show error
                setStatus('error');
                setError(err.response?.data?.error || 'Failed to verify payment. Please contact support if your balance is not updated.');
            }
        };

        verify();
    }, [txRef]);

    return (
        <div className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh] flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect p-12 rounded-3xl w-full text-center border border-slate-800"
            >
                {status === 'verifying' && (
                    <div className="space-y-6">
                        <Loader2 size={64} className="text-brand-primary animate-spin mx-auto" />
                        <h2 className="text-3xl font-bold">Verifying Payment...</h2>
                        <p className="text-slate-400">Please wait while we confirm your transaction with Chapa.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6">
                        <CheckCircle2 size={64} className="text-green-500 mx-auto" />
                        <h2 className="text-3xl font-bold">Payment Successful!</h2>
                        <p className="text-slate-400">Your ticket has been booked successfully. You can now view it in your dashboard.</p>
                        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/dashboard" className="premium-gradient px-8 py-4 rounded-xl text-white font-bold flex items-center gap-2">
                                Go to Dashboard <ArrowRight size={20} />
                            </Link>
                            <Link to="/" className="bg-slate-800 border border-slate-700 px-8 py-4 rounded-xl text-white font-bold hover:bg-slate-700 transition">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <XCircle size={64} className="text-red-500 mx-auto" />
                        <h2 className="text-3xl font-bold">Verification Issue</h2>
                        <p className="text-red-400">{error}</p>
                        <p className="text-slate-400 text-sm">Transaction Ref: {txRef}</p>
                        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/dashboard" className="premium-gradient px-8 py-4 rounded-xl text-white font-bold">
                                Check My Tickets
                            </Link>
                            <Link to="/contact" className="bg-slate-800 border border-slate-700 px-8 py-4 rounded-xl text-white font-bold hover:bg-slate-700 transition">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;
