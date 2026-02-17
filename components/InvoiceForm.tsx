
import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceItem } from '../types';
import { generateProfessionalDescription } from '../services/geminiService';

interface InvoiceFormProps {
  invoice: Invoice;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Invoice>(invoice);
  const [loadingAI, setLoadingAI] = useState<string | null>(null);

  // Auto-calculate total price whenever items change
  useEffect(() => {
    const total = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setFormData(prev => ({ ...prev, totalPrice: total }));
  }, [formData.items]);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 1,
      price: 0
    };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  const removeItem = (id: string) => {
    if (formData.items.length <= 1) return;
    setFormData({ ...formData, items: formData.items.filter(i => i.id !== id) });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setFormData({
      ...formData,
      items: formData.items.map(i => i.id === id ? { ...i, [field]: value } : i)
    });
  };

  const handleAISuggestion = async (id: string, name: string) => {
    if (!name) return;
    setLoadingAI(id);
    const desc = await generateProfessionalDescription(name);
    updateItem(id, 'description', desc);
    setLoadingAI(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">New Invoice</h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-white">✕</button>
      </div>

      <section className="bg-slate-900/50 p-4 rounded-xl space-y-4 border border-slate-800">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-widest">Client Details</h3>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Client Name" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.clientPhone}
            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-widest">Line Items</h3>
          <button 
            onClick={addItem}
            className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1.5 rounded-full hover:bg-blue-600/30 transition flex items-center gap-1"
          >
            <span>+</span> Add Item
          </button>
        </div>

        <div className="space-y-4">
          {formData.items.map((item) => (
            <div key={item.id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-3 relative group">
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 text-slate-600 group-hover:text-red-400"
              >✕</button>
              
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Item name (e.g. Photo Album)" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-sm"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  onBlur={() => !item.description && handleAISuggestion(item.id, item.name)}
                />
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="text-[10px] text-slate-500 uppercase ml-1">Price (₹)</label>
                        <input 
                        type="number" 
                        placeholder="Price" 
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-sm"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="w-20">
                        <label className="text-[10px] text-slate-500 uppercase ml-1">Qty</label>
                        <input 
                        type="number" 
                        placeholder="Qty" 
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-sm"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="w-24 text-right flex flex-col justify-end">
                        <span className="text-[10px] text-slate-500 uppercase">Subtotal</span>
                        <span className="text-sm font-bold text-blue-400">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                </div>
              </div>
              <div className="relative">
                <textarea 
                  placeholder="Detailed description..." 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs h-16"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                />
                {loadingAI === item.id && (
                    <div className="absolute right-2 bottom-2">
                         <div className="animate-spin h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-400 uppercase text-xs tracking-widest">Grand Total</span>
          <span className="text-3xl font-bold text-blue-400">₹{formData.totalPrice.toLocaleString()}</span>
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto flex gap-3 z-10">
        <button 
          onClick={() => onSave(formData)}
          className="flex-1 bg-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition shadow-lg shadow-blue-500/20"
        >
          Save & Preview
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
