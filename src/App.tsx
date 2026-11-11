import React, { useState, useEffect } from 'react';
import { Book, CartItem, Order, Review } from './types/book';
import { INITIAL_BOOKS, INITIAL_REVIEWS } from './data/initialBooks';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { CartCheckoutView } from './components/CartCheckoutView';
import { MyBooksView } from './components/MyBooksView';
import { ContactView } from './components/ContactView';
import { BookDetailModal } from './components/BookDetailModal';
import { ReaderModal } from './components/ReaderModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';
import { Check, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // Persistence for books (allows Admin CRUD to persist)
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('ziyo_books');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_BOOKS;
  });

  // Persistence for Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ziyo_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Persistence for My Books (Owned / Claimed books)
  const [myBooks, setMyBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('ziyo_my_books');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Start with 1 free sample classic already in library for immediate pleasure
    const defaultClassic = INITIAL_BOOKS.find((b) => b.id === 'book-free-1');
    return defaultClassic ? [defaultClassic] : [];
  });

  // Persistence for Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ziyo_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Persistence for Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('ziyo_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  // Views and Modals
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'cart' | 'my-books' | 'contact'>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Filters passed to catalog
  const [catalogCategory, setCatalogCategory] = useState<string | undefined>(undefined);
  const [catalogSearch, setCatalogSearch] = useState<string | undefined>(undefined);

  // Font size accessibility toggle
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'xlarge'>('standard');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ziyo_books', JSON.stringify(books));
    } catch (e) {
      console.error(e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('ziyo_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ziyo_my_books', JSON.stringify(myBooks));
    } catch (e) {
      console.error(e);
    }
  }, [myBooks]);

  useEffect(() => {
    try {
      localStorage.setItem('ziyo_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ziyo_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart operations
  const handleAddToCart = (book: Book) => {
    // If book is free, directly add to "Kitoblarim" and inform the user
    if (book.price === 0 || book.isFree) {
      if (!myBooks.some((b) => b.id === book.id)) {
        setMyBooks((prev) => [book, ...prev]);
        showToast(`"${book.title}" kitobingiz "Kitoblarim" kutubxonasiga qo'shildi!`);
      } else {
        showToast(`"${book.title}" allaqachon kutubxonangizda mavjud.`);
      }
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });

    showToast(`"${book.title}" savatga qo'shildi.`);
  };

  const handleBuyNow = (book: Book) => {
    setSelectedBook(null);
    if (book.price === 0 || book.isFree) {
      handleAddToCart(book);
      setCurrentView('my-books');
      return;
    }

    // Add to cart if not already, then open cart/checkout
    setCart((prev) => {
      const exists = prev.find((item) => item.book.id === book.id);
      if (!exists) {
        return [...prev, { book, quantity: 1 }];
      }
      return prev;
    });
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCartQuantity = (bookId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCompleteOrder = (order: Order) => {
    // Save order
    setOrders((prev) => [order, ...prev]);

    // Automatically add all purchased books to "Kitoblarim" for instant PDF reading/download
    const purchasedBooks = order.items.map((i) => i.book);
    setMyBooks((prev) => {
      const existingIds = new Set(prev.map((b) => b.id));
      const newlyAdded = purchasedBooks.filter((b) => !existingIds.has(b.id));
      return [...newlyAdded, ...prev];
    });

    // Clear cart
    setCart([]);
    showToast("Buyurtmangiz qabul qilindi! Rahmat.");
  };

  // Add all 5 free classics to "Kitoblarim"
  const handleAddFreeClassics = () => {
    const freeBooks = books.filter((b) => b.price === 0 || b.isFree);
    setMyBooks((prev) => {
      const existingIds = new Set(prev.map((b) => b.id));
      const toAdd = freeBooks.filter((b) => !existingIds.has(b.id));
      return [...toAdd, ...prev];
    });
    showToast("5 ta bepul klassik asar kutubxonangizga muvaffaqiyatli qo'shildi!");
  };

  // Admin Book CRUD operations
  const handleAddBookAdmin = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
    showToast(`"${newBook.title}" kitobi katalogga qo'shildi.`);
  };

  const handleUpdateBookAdmin = (updatedBook: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    showToast(`"${updatedBook.title}" ma'lumotlari yangilandi.`);
  };

  const handleDeleteBookAdmin = (bookId: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
    showToast("Kitob muvaffaqiyatli o'chirildi.");
  };

  const handleResetDefaultsAdmin = () => {
    setBooks(INITIAL_BOOKS);
    showToast("Kitoblar boshlang'ich ro'yxatiga qaytarildi.");
  };

  const handleAddReview = (newRev: Review) => {
    setReviews((prev) => [newRev, ...prev]);
    showToast("Fikringiz uchun tashakkur!");
  };

  const navigateToCatalog = (category?: string, search?: string) => {
    setCatalogCategory(category);
    setCatalogSearch(search);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Font scale class
  const fontSizeClasses = {
    standard: '',
    large: 'text-[1.12rem] [&_h1]:text-[1.2em] [&_h2]:text-[1.2em] [&_h3]:text-[1.2em] [&_p]:text-[1.12em] [&_button]:text-[1.08em]',
    xlarge: 'text-[1.25rem] [&_h1]:text-[1.35em] [&_h2]:text-[1.35em] [&_h3]:text-[1.35em] [&_p]:text-[1.25em] [&_button]:text-[1.18em]'
  }[fontSize];

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF7F0] text-[#1C2924] ${fontSizeClasses}`}>
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'catalog') {
            setCatalogCategory(undefined);
            setCatalogSearch(undefined);
          }
          setCurrentView(view);
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        myBooksCount={myBooks.length}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            books={books}
            reviews={reviews}
            onSelectBook={(book) => setSelectedBook(book)}
            onAddToCart={handleAddToCart}
            onQuickRead={(book) => setReadingBook(book)}
            onNavigateToCatalog={navigateToCatalog}
            onAddReview={handleAddReview}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogView
            books={books}
            onSelectBook={(book) => setSelectedBook(book)}
            onAddToCart={handleAddToCart}
            onQuickRead={(book) => setReadingBook(book)}
            initialCategory={catalogCategory}
            initialSearch={catalogSearch}
          />
        )}

        {currentView === 'cart' && (
          <CartCheckoutView
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onCompleteOrder={handleCompleteOrder}
            onNavigateToCatalog={() => setCurrentView('catalog')}
            onNavigateToMyBooks={() => setCurrentView('my-books')}
          />
        )}

        {currentView === 'my-books' && (
          <MyBooksView
            myBooks={myBooks}
            onOpenReader={(book) => setReadingBook(book)}
            onNavigateToCatalog={() => setCurrentView('catalog')}
            onAddFreeClassics={handleAddFreeClassics}
          />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          if (view === 'catalog') {
            setCatalogCategory(undefined);
            setCatalogSearch(undefined);
          }
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onReadSample={(book) => {
          setSelectedBook(null);
          setReadingBook(book);
        }}
        isAlreadyOwned={selectedBook ? myBooks.some((b) => b.id === selectedBook.id) : false}
      />

      {/* Reader Modal (for Sample Reading & My Books) */}
      <ReaderModal
        book={readingBook}
        onClose={() => setReadingBook(null)}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        books={books}
        orders={orders}
        onAddBook={handleAddBookAdmin}
        onUpdateBook={handleUpdateBookAdmin}
        onDeleteBook={handleDeleteBookAdmin}
        onResetDefaults={handleResetDefaultsAdmin}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F5F4A] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C9A24B]/40 animate-fade-in text-base font-semibold">
          <div className="w-6 h-6 rounded-full bg-[#C9A24B] text-[#143B2E] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/10 rounded ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
