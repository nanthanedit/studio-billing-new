
import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceItem } from './types';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'create' | 'preview'>('dashboard');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

  // Load sample data on first run
  useEffect(() => {
    const saved = localStorage.getItem('vennila_invoices');
    if (saved) {
      setInvoices(JSON.parse(saved));
    } else {
      const sample: Invoice = {
        id: '1',
        clientName: 'Sample Client',
        clientPhone: '+91 9876543210',
        date: new Date().toISOString(),
        totalPrice: 35000,
        status: 'draft',
        items: [
          { id: '1', name: 'Synthetic Photo Album', description: 'Size: 12" x 36" (Open view)', quantity: 1, price: 15000 },
          { id: '2', name: '4K Video Deliverable', description: 'Included on a 32GB Pen Drive', quantity: 1, price: 12000 },
          { id: '3', name: 'Photo Frame with Print', description: 'Size: 12" x 18"', quantity: 1, price: 3000 },
          { id: '4', name: 'Photo Calendar', description: '', quantity: 2, price: 1500 },
          { id: '5', name: 'Coffee Mug', description: '', quantity: 2, price: 500 },
          { id: '6', name: 'Pen Drive Presentation Box', description: '', quantity: 1, price: 1000 },
        ]
      };
      setInvoices([sample]);
      localStorage.setItem('vennila_invoices', JSON.stringify([sample]));
    }
  }, []);

  const saveInvoice = (invoice: Invoice) => {
    const updated = [...invoices.filter(i => i.id !== invoice.id), invoice];
    setInvoices(updated);
    localStorage.setItem('vennila_invoices', JSON.stringify(updated));
    setView('dashboard');
  };

  const handleCreateNew = () => {
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      clientName: '',
      clientPhone: '',
      date: new Date().toISOString(),
      totalPrice: 0,
      status: 'draft',
      items: [{ id: '1', name: '', description: '', quantity: 1, price: 0 }]
    };
    setCurrentInvoice(newInvoice);
    setView('create');
  };

  const handleEdit = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setView('create');
  };

  const handlePreview = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setView('preview');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        {view === 'dashboard' && (
          <Dashboard 
            invoices={invoices} 
            onCreateNew={handleCreateNew} 
            onEdit={handleEdit}
            onPreview={handlePreview}
          />
        )}
        
        {view === 'create' && currentInvoice && (
          <InvoiceForm 
            invoice={currentInvoice} 
            onSave={saveInvoice} 
            onCancel={() => setView('dashboard')} 
          />
        )}

        {view === 'preview' && currentInvoice && (
          <div className="flex flex-col gap-4">
             <button 
              onClick={() => setView('dashboard')}
              className="px-4 py-2 bg-slate-800 rounded-lg text-sm self-start flex items-center gap-2 hover:bg-slate-700 transition"
            >
              ← Back to Dashboard
            </button>
            <InvoicePreview invoice={currentInvoice} />
            <button 
              onClick={() => window.print()}
              className="mt-4 w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20"
            >
              Download / Print PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
