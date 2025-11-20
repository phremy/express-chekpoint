export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: 'code' | 'chart' | 'shield';
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export enum PageState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}