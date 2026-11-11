import React from 'react';
import { Book } from '../types/book';
import { formatPrice } from '../data/initialBooks';
import { BookOpen, Star, ShoppingBag, Download, Eye } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onQuickRead?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelect,
  onAddToCart,
  onQuickRead
}) => {
  const isFree = book.price === 0 || book.isFree;

  return (
    <div className="group relative flex flex-col bg-white border border-[#E5DECF] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200">
      
      {/* Cover Image Slot with aspect ratio 3:4 */}
      <div 
        onClick={() => onSelect(book)}
        className="relative aspect-3/4 w-full bg-[#EAE4D5] overflow-hidden cursor-pointer flex items-center justify-center"
      >
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          />
        ) : (
          /* Elegant leather-like bookish placeholder with gold decorative embossing */
          <div className={`w-full h-full bg-linear-to-br ${book.coverColor || 'from-[#1F5F4A] to-[#123629]'} p-6 flex flex-col justify-between text-[#FAF7F0] border-r-4 border-black/20 shadow-inner`}>
            <div className="border border-[#C9A24B]/40 p-4 h-full flex flex-col justify-between rounded-sm">
              <div className="text-center">
                <span className="text-[11px] uppercase tracking-widest text-[#C9A24B] font-medium block mb-1">
                  {book.category}
                </span>
                <div className="w-8 h-0.5 bg-[#C9A24B] mx-auto my-2" />
              </div>

              <div className="text-center my-auto px-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl leading-snug line-clamp-3 text-white drop-shadow-xs">
                  {book.title}
                </h3>
                <p className="mt-2 text-sm text-[#E5DECF] font-medium line-clamp-1 italic">
                  {book.author}
                </p>
              </div>

              <div className="text-center text-[11px] text-[#C9A24B]/80 font-serif">
                ZIYO NASHRIYOTI
              </div>
            </div>
          </div>
        )}

        {/* Free / Bestseller indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {isFree && (
            <span className="bg-[#1F5F4A] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded shadow-xs tracking-wide">
              BEPUL ASAR
            </span>
          )}
          {book.isBestseller && !isFree && (
            <span className="bg-[#C9A24B] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded shadow-xs tracking-wide">
              ENG XARIDORGIR
            </span>
          )}
          {book.isNew && (
            <span className="bg-[#2C5F4D] text-[#FAF7F0] text-xs font-semibold px-2.5 py-0.5 rounded shadow-xs">
              Yangi nashr
            </span>
          )}
        </div>

        {/* Quick Read sample overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickRead) onQuickRead(book);
            else onSelect(book);
          }}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-black/90 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs"
          title="Namunani o'qish"
        >
          <Eye className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Namuna</span>
        </button>
      </div>

      {/* Book Metadata & Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#4D5C54] mb-2 font-medium">
            <span>{book.category}</span>
            <div className="flex items-center text-[#C9A24B]">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="font-semibold text-[#1C2924]">{book.rating.toFixed(1)}</span>
              <span className="text-xs text-[#6B7C73] ml-1">({book.reviewsCount})</span>
            </div>
          </div>

          {/* Book Title */}
          <h3 
            onClick={() => onSelect(book)}
            className="font-serif font-bold text-xl sm:text-2xl text-[#1C2924] hover:text-[#1F5F4A] cursor-pointer line-clamp-2 transition-colors mb-1 leading-snug"
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-base text-[#4D5C54] mb-3 font-normal">
            {book.author}
          </p>

          {/* Excerpt preview */}
          <p className="text-sm text-[#5C6E64] line-clamp-2 mb-4 leading-relaxed font-sans">
            {book.description}
          </p>
        </div>

        {/* Price and Action Buttons */}
        <div className="pt-3 border-t border-[#EFEAE1] flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#5C6E64] uppercase font-semibold tracking-wider">
              {isFree ? "Kirish" : "Narxi"}
            </span>
            <span className={`text-xl sm:text-2xl font-bold font-serif ${isFree ? 'text-[#1F5F4A]' : 'text-[#1C2924]'}`}>
              {formatPrice(book.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => onSelect(book)}
              className="min-h-[48px] px-3 py-2 text-sm font-semibold rounded-lg border border-[#C6BCAB] text-[#1C2924] hover:bg-[#F3EFE6] transition-colors flex items-center justify-center text-center"
            >
              Batafsil
            </button>

            <button
              onClick={() => onAddToCart(book)}
              className={`min-h-[48px] px-3 py-2 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs ${
                isFree
                  ? 'bg-[#1F5F4A] text-white hover:bg-[#174838]'
                  : 'bg-[#1F5F4A] text-white hover:bg-[#174838]'
              }`}
            >
              {isFree ? (
                <>
                  <Download className="w-4 h-4 text-[#C9A24B]" />
                  <span>Yuklab olish</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#C9A24B]" />
                  <span>Savatga</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
