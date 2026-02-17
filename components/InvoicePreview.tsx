
import React from 'react';
import { Invoice } from '../types';
import { STUDIO_DETAILS } from '../constants';

interface InvoicePreviewProps {
  invoice: Invoice;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice }) => {
  return (
    <div className="invoice-container bg-[#f2f4f7] text-[#2c3e50] p-4 sm:p-8 rounded-sm shadow-2xl overflow-hidden relative" style={{ backgroundImage: 'linear-gradient(to bottom, #d6dbe0 0%, #ffffff 100%)' }}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-400 opacity-5 blur-3xl -z-10"></div>
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 relative">
        {/* Studio Logo / Aperture */}
        <div className="w-24 h-24 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a40] to-[#4a6080] rounded-full shadow-lg"></div>
            <div className="absolute inset-2 border-2 border-slate-300 rounded-full opacity-30"></div>
            <div className="absolute inset-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-slate-100 opacity-90" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                    <circle cx="12" cy="12" r="2"/>
                </svg>
            </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-[0.3em] text-[#1e293b] leading-tight mb-1">{STUDIO_DETAILS.name}</h1>
        <p className="text-[10px] sm:text-xs text-[#64748b] tracking-[0.4em] font-medium uppercase mb-8">{STUDIO_DETAILS.tagline}</p>
        
        <h2 className="text-3xl font-bold tracking-widest text-[#1e293b] border-y border-[#cbd5e1] py-2 w-full text-center">INVOICE</h2>
      </div>

      <div className="flex justify-between mb-6 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#475569]">
        <div>
            <p>Bill To:</p>
            <p className="text-[#1e293b] text-base mt-1 font-bold">{invoice.clientName || 'N/A'}</p>
            <p>{invoice.clientPhone}</p>
        </div>
        <div className="text-right">
            <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
            <p>Invoice #: {invoice.id.slice(-6).toUpperCase()}</p>
        </div>
      </div>

      {/* Order Summary Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-sm border border-[#cbd5e1] overflow-hidden shadow-inner">
        <div className="bg-[#e2e8f0] py-3 text-center border-b border-[#cbd5e1]">
          <h3 className="text-sm sm:text-base font-bold text-[#1e293b] tracking-wider uppercase">Order Summary / Package Quotation</h3>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
                <tr className="bg-[#1e293b] text-white text-[10px] sm:text-xs uppercase tracking-widest">
                <th className="py-3 px-4 text-center border-r border-white/20 w-12">#</th>
                <th className="py-3 px-4 border-r border-white/20">Item & Description</th>
                <th className="py-3 px-4 text-center border-r border-white/20 w-20">Qty</th>
                <th className="py-3 px-4 text-right border-r border-white/20 w-24">Price</th>
                <th className="py-3 px-4 text-right w-28">Amount</th>
                </tr>
            </thead>
            <tbody className="text-[11px] sm:text-sm text-[#334155]">
                {invoice.items.map((item, idx) => (
                <tr key={item.id} className={`${idx % 2 === 0 ? 'bg-white/40' : 'bg-slate-100/40'} border-b border-[#cbd5e1]`}>
                    <td className="py-4 px-2 text-center font-bold border-r border-[#cbd5e1]">{idx + 1}</td>
                    <td className="py-4 px-4 border-r border-[#cbd5e1]">
                    <p className="font-bold text-[#1e293b]">{item.name}</p>
                    {item.description && <p className="text-[10px] text-[#64748b] mt-0.5 leading-relaxed">{item.description}</p>}
                    </td>
                    <td className="py-4 px-2 text-center border-r border-[#cbd5e1]">{item.quantity}</td>
                    <td className="py-4 px-4 text-right border-r border-[#cbd5e1]">₹{item.price.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right font-bold text-[#1e293b]">₹{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Total Price Section */}
        <div className="bg-[#1e293b] text-white p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm font-bold tracking-widest uppercase opacity-80 border-b sm:border-b-0 sm:border-r border-white/20 pb-2 sm:pb-0 sm:pr-6">
                Total Package Price
            </div>
            <div className="flex flex-col items-center sm:items-end">
                <span className="text-3xl font-bold">₹ {invoice.totalPrice.toLocaleString()} /-</span>
                <span className="text-[10px] italic opacity-80 uppercase tracking-tighter mt-1">Net Payable Amount (All inclusive)</span>
            </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-[#1e293b]">
        <div className="flex justify-center gap-8 mb-4 opacity-50">
            <div className="w-12 h-1px bg-[#1e293b] self-center"></div>
            <div className="text-xs font-bold tracking-[0.3em]">THANK YOU</div>
            <div className="w-12 h-1px bg-[#1e293b] self-center"></div>
        </div>
        <h4 className="text-lg font-bold tracking-[0.2em] uppercase">{STUDIO_DETAILS.name} STUDIO</h4>
        <p className="text-sm font-semibold tracking-wider mt-1">{STUDIO_DETAILS.phone}</p>
      </div>

      <div className="mt-16 flex justify-center border-t border-[#cbd5e1] pt-8 opacity-40 grayscale">
         <div className="text-center">
            <h5 className="text-[10px] font-bold tracking-[0.2em]">{STUDIO_DETAILS.name} STUDIO</h5>
            <p className="text-[8px] tracking-widest">ESTABLISHED QUALITY • {STUDIO_DETAILS.phone}</p>
         </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
