// Типы для заказов и платежей

export enum OrderStatusEnum {
  AWAITING_CONFIRMATION = 'awaiting_confirmation',
  AWAITING_PAYMENT = 'awaiting_payment',
  PAYMENT_CONFIRMED = 'payment_confirmed',
  TOUR_CONDUCTED = 'tour_conducted',
  CANCELLED = 'cancelled',
}

export enum PaymentStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  PARTIALLY_PAID = 'partially_paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentTypeEnum {
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
}

export interface IOrderTourDetailData {
  tour_id: number;
  tour_name: string;
  tour_start: string;
  tour_end: string;
  count: number;
  price_id: number;
  price: number;
  total_price: number;
}

export interface IOrderCard {
  id: number;
  order_name: string;
  status: OrderStatusEnum;
  form_name: string;
  tour_detail: IOrderTourDetailData;
  tourist_name: string;
  created_at: string;
  updated_at: string;
}

export interface INote {
  formData: {
    form_name: string;
    form_data: unknown;
  };
}

export interface IInvoiceData {
  invoice_number: string;
  total: number;
  deposit: number;
  paid: number;
  balance: number;
  payment_status: PaymentStatusEnum | string;
  payment_method: PaymentTypeEnum | string | null;
  payment_date: string | null;
  currency: string;
}

export interface IInvoice {
  id: number;
  invoice_data: IInvoiceData;
  created_at: string;
  updated_at: string;
}

export interface IOrder {
  id: number;
  order_name: string;
  status: OrderStatusEnum;
  notes?: INote;
  chat_id?: number;
  created_at: Date;
  updated_at: Date;
  tour_detail: IOrderTourDetailData;
  tourist: import('./auth').ITourist;
  manager: import('@/components/Auth/_types').IManager;
  invoice?: IInvoiceData;
  form_name?: string;
}

export interface IBookingFormData {
  tour_name?: string;
  tour_start?: string;
  tour_end?: string;
  travellers_count?: number;
  tour_price?: number;
  total_price?: number;
  deposit?: number;
  deposit_amount?: number;
  currency?: string;
  payment_type?: string;
  payment_status?: string;
  passengers?: Array<{
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }>;
}

export interface IBookingForm {
  id: number;
  user_id: number | null;
  form_name: string;
  form_data: IBookingFormData;
  created_at: string;
  updated_at: string;
}
