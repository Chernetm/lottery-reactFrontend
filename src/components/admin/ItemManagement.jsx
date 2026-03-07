import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const ItemManagement = ({ 
    items, 
    itemForm, 
    setItemForm, 
    handleAddItem, 
    handleDeleteItem 
}) => {
    return (
        <motion.div
            key="items"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
            {/* Add Item Form */}
            <div className="lg:col-span-1">
                <div className="glass-effect p-8 rounded-3xl sticky top-28">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Plus className="text-brand-primary" /> Register New Item
                    </h3>
                    <form onSubmit={handleAddItem} className="space-y-4">
                        <input
                            placeholder="Item Name"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                            value={itemForm.name}
                            onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition h-32"
                            value={itemForm.description}
                            onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                        />
                        <input
                            placeholder="Retail Price ($)"
                            type="number"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                            value={itemForm.retailPrice}
                            onChange={(e) => setItemForm({ ...itemForm, retailPrice: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Image URL"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition"
                            value={itemForm.imageUrl}
                            onChange={(e) => setItemForm({ ...itemForm, imageUrl: e.target.value })}
                        />
                        <button type="submit" className="w-full premium-gradient py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                            Add Item <Plus size={18} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="glass-effect p-4 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 group">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden shrink-0">
                            <img src={item.imageUrl || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                            <h4 className="font-bold text-base md:text-lg truncate">{item.name}</h4>
                            <p className="text-slate-500 text-xs md:text-sm line-clamp-1">{item.description}</p>
                            <p className="text-brand-primary font-bold mt-1 text-sm md:text-base">${item.retailPrice}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 p-2 bg-red-500/10 rounded-lg hover:bg-red-500 hover:text-white transition md:opacity-0 md:group-hover:opacity-100 shrink-0"
                        >
                            <Trash2 size={18} className="md:w-5 md:h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ItemManagement;
