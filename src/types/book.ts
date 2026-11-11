export type BookCategory = 
  | 'Bolalar tarbiyasi'
  | 'Liderlik'
  | 'Badiiy adabiyot'
  | 'Biznes'
  | 'Psixologiya'
  | 'Diniy-ma\'rifiy'
  | 'Jahon klassikasi';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  coverColor: string; // Gradient color palette for placeholder / leather look
  category: BookCategory;
  price: number; // in so'm, 0 means Bepul
  isFree?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  description: string;
  intro: string; // Muqaddima (introduction / sample excerpt)
  hasPdf: boolean;
  pdfFileName?: string;
  pdfContent?: string;
  pagesCount: number;
  publishedYear: number;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: 'Click' | 'Payme' | 'Uzum' | 'Naqd pul';
  items: CartItem[];
  totalAmount: number;
  status: 'Tasdiqlandi' | 'Yetkazilmoqda' | 'Yetkazib berildi';
}

export interface Review {
  id: string;
  author: string;
  role: string;
  comment: string;
  rating: number;
  bookTitle: string;
  date: string;
}
