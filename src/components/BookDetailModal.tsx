import React from 'react';
import { Book } from '../types/book';
import { formatPrice } from '../data/initialBooks';
import { X, ShoppingBag, BookOpen, Star, Download, Zap, FileText, Calendar, CheckCircle } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  onBuyNow: (book: Book) => void;
  onReadSample: (book: Book) => void;
  isAlreadyOwned?: boolean;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAddToCart,
  onBuyNow,
  onReadSample,
  isAlreadyOwned = false
}) => {
  if (!book) return null;

  const isFree = book.price === 0 || book.isFree;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F0] border border-[#E5DECF] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5DECF] shrink-0">
          <div className="flex items-center gap-2 text-sm text-[#4D5C54]">
            <span className="font-semibold text-[#1F5F4A]">{book.category}</span>
            <span>·</span>
            <span>Nashr: {book.publishedYear}-yil</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#4D5C54] hover:text-[#1C2924] hover:bg-[#FAF7F0] rounded-full transition-colors"
            aria-label="Yopish"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Book Cover Display */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[280px] aspect-3/4 rounded-xl shadow-lg overflow-hidden border border-[#DCD3C1] relative">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-linear-to-br ${book.coverColor || 'from-[#1F5F4A] to-[#123629]'} p-6 flex flex-col justify-between text-[#FAF7F0]`}>
                    <div className="border border-[#C9A24B]/40 p-4 h-full flex flex-col justify-between rounded-sm">
                      <span className="text-center text-xs uppercase tracking-widest text-[#C9A24B] font-medium">
                        {book.category}
                      </span>
                      <div className="text-center my-auto">
                        <h3 className="font-serif font-bold text-2xl leading-snug text-white">
                          {book.title}
                        </h3>
                        <p className="mt-2 text-base text-[#E5DECF] italic">
                          {book.author}
                        </p>
                      </div>
                      <div className="text-center text-xs text-[#C9A24B]/80 font-serif">
                        ZIYO NASHRIYOTI
                      </div>
                    </div>
                  </div>
                )}

                {isFree && (
                  <div className="absolute top-3 left-3 bg-[#1F5F4A] text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                    BEPUL ASAR
                  </div>
                )}
              </div>

              {/* Book quick specs */}
              <div className="w-full max-w-[280px] mt-4 grid grid-cols-2 gap-2 text-center text-xs text-[#4D5C54]">
                <div className="bg-white p-2.5 rounded-lg border border-[#E5DECF]">
                  <FileText className="w-4 h-4 mx-auto mb-1 text-[#1F5F4A]" />
                  <span className="font-bold text-[#1C2924] block">{book.pagesCount} sahifa</span>
                  <span>Hajmi</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-[#E5DECF]">
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-[#C9A24B]" />
                  <span className="font-bold text-[#1C2924] block">{book.publishedYear}-yil</span>
                  <span>Nashr yili</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Author, Description, Actions */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-[#C9A24B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#1C2924]">{book.rating.toFixed(1)}</span>
                  <span className="text-sm text-[#5C6E64]">({book.reviewsCount} ta ijobiy sharh)</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A] leading-tight mb-2">
                  {book.title}
                </h1>
                
                <p className="text-xl text-[#3E4D45] font-medium mb-4">
                  Muallif: <span className="text-[#1C2924] font-semibold">{book.author}</span>
                </p>

                {/* Price Display */}
                <div className="bg-white p-4 rounded-xl border border-[#E5DECF] mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#6B7C73] block mb-1">
                      {isFree ? "Kirish huquqi" : "Kitob narxi"}
                    </span>
                    <span className="text-3xl font-bold font-serif text-[#1F5F4A]">
                      {formatPrice(book.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-xs font-semibold text-[#1F5F4A] bg-[#1F5F4A]/10 px-2.5 py-1 rounded">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Mavjud (Omborda)
                    </span>
                    {book.hasPdf ? (
                      <span className="block text-xs text-[#5C6E64] mt-1">
                        Qog'oz + PDF nusxasi birga
                      </span>
                    ) : (
                      <span className="block text-xs text-[#8A6D3B] mt-1">
                        Faqat qog'oz formatda
                      </span>
                    )}
                  </div>
                </div>

                {/* Tavsif (Description) */}
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-bold text-[#1C2924] mb-2">
                    Kitob haqida qisqacha tavsif
                  </h3>
                  <p className="text-lg text-[#2E3C34] leading-relaxed font-sans">
                    {book.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Savatga qo'shish, Hozir sotib olish, Namuna o'qish */}
              <div className="space-y-3 pt-4 border-t border-[#E5DECF]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isFree ? (
                    <button
                      onClick={() => onAddToCart(book)}
                      className="min-h-[52px] px-6 py-3 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Download className="w-5 h-5 text-[#C9A24B]" />
                      <span>{isAlreadyOwned ? "Qayta yuklab olish" : "Bepul olish (Kitoblarimga)"}</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onAddToCart(book)}
                        className="min-h-[52px] px-6 py-3 bg-white border-2 border-[#1F5F4A] text-[#1F5F4A] hover:bg-[#1F5F4A]/5 transition-colors rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Savatga qo'shish</span>
                      </button>

                      <button
                        onClick={() => onBuyNow(book)}
                        className="min-h-[52px] px-6 py-3 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Zap className="w-5 h-5 text-[#C9A24B]" />
                        <span>Hozir sotib olish</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Namuna o'qish button */}
                <button
                  onClick={() => onReadSample(book)}
                  className="w-full min-h-[48px] px-4 py-2.5 bg-[#EAE4D5] hover:bg-[#DFD8C6] text-[#1C2924] transition-colors rounded-xl font-semibold text-base flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-[#1F5F4A]" />
                  <span>Namuna o'qish (Muqaddima bilan tanishish)</span>
                </button>
              </div>

            </div>
          </div>

          {/* Muqaddima (Introduction) Section */}
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DECF] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-8 bg-[#C9A24B] rounded-full" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F5F4A]">
                Muqaddima
              </h2>
            </div>
            <div className="prose max-w-none text-[#2E3C34] text-lg sm:text-xl font-serif leading-relaxed italic border-l-2 border-[#C9A24B]/30 pl-5 py-2">
              "{book.intro}"
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
