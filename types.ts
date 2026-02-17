
export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  items: InvoiceItem[];
  totalPrice: number;
  status: 'draft' | 'sent' | 'paid';
}

export interface StudioInfo {
  name: string;
  tagline: string;
  phone: string;
  logo: string;
}
