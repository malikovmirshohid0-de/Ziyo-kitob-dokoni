import React, { useState, useMemo } from 'react';
import { Book, BookCategory } from '../types/book';
import { BookCard } from './BookCard';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';

interface CatalogViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onQuickRead: (book: Book) => void;
  initialCategory?: string;
  initialSearch?: string;
}

const CATEGORIES: (BookCategory | 'Barchasi' | 'Bepul kitoblar')[] = [
  'Barchasi',
  'Bolalar tarbiyasi',
  'Liderlik',
  'Badiiy adabiyot',
  'Biznes',
  'Psixologiya',
  'Diniy-ma\'rifiy',
  'Jahon klassikasi',
  'Bepul kitoblar'
];

export const CatalogView: React.FC<CatalogViewProps> = ({
  books,
  onSelectBook,
  onAddToCart,
  onQuickRead,
  initialCategory,
  initialSearch
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('default');
  const [maxPrice, setMaxPrice] = useState<number>(150000);

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Category filter
        if (selectedCategory === 'Bepul kitoblar') {
          if (book.price !== 0 && !book.isFree) return false;
        } else if (selectedCategory !== 'Barchasi' && book.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchDesc = book.description.toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchDesc) return false;
        }

        // Price filter
        if (selectedCategory !== 'Bepul kitoblar' && book.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.publishedYear - a.publishedYear;
        return 0;
      });
  }, [books, selectedCategory, searchQuery, sortBy, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title & Search bar */}
      <div className="mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B]">
          Kitoblar to'plami
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F5F4A] mt-1 mb-4">
          Kitoblar Katalogi
        </h1>
        <p className="text-lg sm:text-xl text-[#4D5C54] max-w-2xl mb-6">
          Katta yoshdagilar va oilalar uchun eng ibratli, foydali hamda ma'naviyatni boyituvchi saralangan adabiyotlar.
        </p>

        {/* Big Search Input */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitob nomi yoki muallif bo'yicha qidirish..."
            className="w-full min-h-[56px] pl-14 pr-12 rounded-2xl border-2 border-[#C6BCAB] text-lg bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1F5F4A] focus:border-[#1F5F4A]"
          />
          <Search className="w-6 h-6 text-[#1F5F4A] absolute left-4 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-[#5C6E64] hover:text-[#1C2924]"
              aria-label="Tozalash"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Buttons Bar (Interactive segmented filter) */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7C73] mb-3">
          Kategoriyalar bo'yicha saralash:
        </label>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[46px] px-4 py-2 rounded-xl text-base font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-xs ${
                  isSelected
                    ? 'bg-[#1F5F4A] text-white shadow-sm'
                    : 'bg-white border border-[#C6BCAB] text-[#1C2924] hover:bg-[#FAF7F0] hover:border-[#1F5F4A]'
                }`}
              >
                {cat === 'Bepul kitoblar' && <Sparkles className="w-4 h-4 text-[#C9A24B]" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Sort & Filter Summary */}
      <div className="bg-white border border-[#E5DECF] rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2 text-base text-[#4D5C54]">
          <SlidersHorizontal className="w-5 h-5 text-[#1F5F4A]" />
          <span>Topilgan kitoblar: <strong className="text-[#1C2924] font-bold">{filteredBooks.length} ta</strong></span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#5C6E64] whitespace-nowrap">Saralash:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="min-h-[44px] px-3 py-1.5 rounded-xl border border-[#C6BCAB] bg-[#FAF7F0] text-sm font-semibold text-[#1C2924] focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
            >
              <option value="default">Odatiy tartibda</option>
              <option value="price-asc">Narx: arzonroqdan</option>
              <option value="price-desc">Narx: qimmatroqdan</option>
              <option value="rating">Yuqori baholanganlar</option>
              <option value="newest">Eng yangi nashrlar</option>
            </select>
          </div>

          {/* Max Price Slider if not free filter */}
          {selectedCategory !== 'Bepul kitoblar' && (
            <div className="flex items-center gap-2 text-sm text-[#4D5C54]">
              <span className="whitespace-nowrap font-medium">Maks. narx:</span>
              <input
                type="range"
                min={20000}
                max={150000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#1F5F4A] w-28 cursor-pointer"
              />
              <span className="font-bold font-serif text-[#1F5F4A] whitespace-nowrap">
                {maxPrice.toLocaleString('uz-UZ')} so'm
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white border border-[#E5DECF] rounded-2xl p-12 text-center max-w-lg mx-auto">
          <p className="font-serif text-2xl font-bold text-[#1C2924] mb-2">
            Hech qanday kitob topilmadi
          </p>
          <p className="text-base text-[#4D5C54] mb-6">
            Qidiruv so'zini o'zgartirib ko'ring yoki boshqa kategoriyani tanlang.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Barchasi');
              setSearchQuery('');
              setMaxPrice(150000);
            }}
            className="min-h-[46px] px-6 py-2.5 bg-[#1F5F4A] text-white hover:bg-[#174838] font-bold rounded-xl text-base"
          >
            Barcha filtrlarni bekor qilish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              onAddToCart={onAddToCart}
              onQuickRead={onQuickRead}
            />
          ))}
        </div>
      )}

    </div>
  );
};
