
import React from 'react';
import { Invoice } from '../types';
import { STUDIO_DETAILS } from '../constants';

interface DashboardProps {
  invoices: Invoice[];
  onCreateNew: () => void;
  onEdit: (invoice: Invoice) => void;
  onPreview: (invoice: Invoice) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ invoices, onCreateNew, onEdit, onPreview }) => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col items-center py-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 p-0.5 mb-2">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
        </div>
        <h1 className="text-3xl font-bold tracking-[0.2em]">{STUDIO_DETAILS.name}</h1>
        <p className="text-xs text-slate-400 tracking-widest mt-1 uppercase">{STUDIO_DETAILS.tagline}</p>
      </header>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <button 
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          <span className="text-xl">+</span> New Invoice
        </button>
      </div>

      <div className="space-y-3">
        {invoices.length === 0 ? (
          <p className="text-center text-slate-500 py-10 italic">No invoices found. Create your first one!</p>
        ) : (
          invoices.map((inv) => (
            <div 
              key={inv.id} 
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex justify-between items-center hover:bg-slate-900 transition cursor-pointer"
              onClick={() => onPreview(inv)}
            >
              <div>
                <p className="font-semibold text-lg">{inv.clientName || 'Unnamed Client'}</p>
                <div className="flex gap-2 text-xs text-slate-400 mt-1 uppercase tracking-tighter">
                  <span>{new Date(inv.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>₹{inv.totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(inv); }}
                  className="p-2 text-slate-400 hover:text-white transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button 
                  className="p-2 text-slate-400 hover:text-white transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
