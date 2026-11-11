import React from 'react';
import { Book } from '../types/book';
import { Download, BookOpen, Printer, CheckCircle, Sparkles, BookMarked } from 'lucide-react';
import { downloadBookFile, printBookPreview } from '../utils/pdfHelper';

interface MyBooksViewProps {
  myBooks: Book[];
  onOpenReader: (book: Book) => void;
  onNavigateToCatalog: () => void;
  onAddFreeClassics: () => void;
}

export const MyBooksView: React.FC<MyBooksViewProps> = ({
  myBooks,
  onOpenReader,
  onNavigateToCatalog,
  onAddFreeClassics
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B]">
          Shaxsiy elektron kutubxona
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A] mt-1">
          Kitoblarim ({myBooks.length})
        </h1>
        <p className="text-lg text-[#4D5C54] mt-2 max-w-2xl">
          Siz sotib olgan va yuklab olgan barcha elektron kitoblar bu yerda saqlanadi. Istalgan vaqtda PDF yuklab olishingiz yoki onlayn mutolaa qilishingiz mumkin.
        </p>
      </div>

      {myBooks.length === 0 ? (
        <div className="bg-white border border-[#E5DECF] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-20 h-20 bg-[#FAF7F0] text-[#1F5F4A] rounded-full flex items-center justify-center mx-auto mb-4">
            <BookMarked className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1C2924] mb-2">
            Hozircha kitoblar mavjud emas
          </h2>
          <p className="text-base text-[#4D5C54] mb-6">
            Siz hali birorta ham kitob xarid qilmadingiz yoki bepul asarlarni yuklab olmadingiz.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onAddFreeClassics}
              className="min-h-[48px] px-6 py-3 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-5 h-5 text-[#C9A24B]" />
              <span>5 ta bepul klassikani kutubxonamga qo'shish</span>
            </button>
            <button
              onClick={onNavigateToCatalog}
              className="min-h-[48px] px-6 py-3 bg-[#FAF7F0] border border-[#C6BCAB] text-[#1C2924] hover:bg-[#EAE4D5] transition-colors rounded-xl font-semibold text-base"
            >
              Katalogga o'tish
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBooks.map((book) => {
              const isFree = book.price === 0 || book.isFree;
              return (
                <div
                  key={book.id}
                  className="bg-white border border-[#E5DECF] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-[#1F5F4A]/50 transition-colors"
                >
                  <div>
                    {/* Top Tag */}
                    <div className="flex items-center justify-between text-xs font-semibold mb-3">
                      <span className="text-[#1F5F4A] bg-[#1F5F4A]/10 px-2.5 py-1 rounded">
                        {isFree ? "Bepul asar" : "Sotib olingan"}
                      </span>
                      <span className="text-[#6B7C73]">{book.category}</span>
                    </div>

                    {/* Book presentation */}
                    <div className="flex gap-4 mb-4">
                      <div className="w-20 aspect-3/4 rounded-md overflow-hidden bg-[#EAE4D5] shrink-0 border border-[#DCD3C1]">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full bg-linear-to-br ${book.coverColor} p-2 text-white flex flex-col justify-between text-center`}>
                            <span className="text-[9px] font-serif line-clamp-2">{book.title}</span>
                            <span className="text-[8px] opacity-75">{book.author}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-xl text-[#1C2924] line-clamp-2 leading-snug">
                          {book.title}
                        </h3>
                        <p className="text-sm text-[#4D5C54] mt-1 italic">
                          {book.author}
                        </p>
                        <p className="text-xs text-[#6B7C73] mt-2">
                          Hajmi: {book.pagesCount} sahifa ({book.publishedYear}-yil)
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[#3E4D45] line-clamp-2 mb-4 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#EFEAE1] space-y-2">
                    {book.hasPdf ? (
                      <button
                        onClick={() => downloadBookFile(book)}
                        className="w-full min-h-[48px] px-4 py-2.5 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Download className="w-5 h-5 text-[#C9A24B]" />
                        <span>PDF yuklab olish</span>
                      </button>
                    ) : (
                      <div className="text-center py-2 text-xs text-[#8A6D3B] font-medium bg-[#FFFBEB] rounded-lg">
                        Ushbu kitob faqat bosma nusxada (PDF mavjud emas)
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenReader(book)}
                        className="min-h-[44px] px-3 py-2 bg-[#FAF7F0] hover:bg-[#EAE4D5] border border-[#C6BCAB] text-[#1C2924] transition-colors rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-4 h-4 text-[#1F5F4A]" />
                        <span>Mutolaa</span>
                      </button>

                      <button
                        onClick={() => printBookPreview(book)}
                        className="min-h-[44px] px-3 py-2 bg-white hover:bg-[#FAF7F0] border border-[#C6BCAB] text-[#4D5C54] hover:text-[#1C2924] transition-colors rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Chop etish</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Quick notice */}
          <div className="bg-[#FAF7F0] border border-[#E5DECF] rounded-xl p-4 text-sm text-[#4D5C54] flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#1F5F4A] shrink-0" />
            <span>
              Barcha yuklab olingan matnlar xavfsiz formatda va har qanday telefon, planshet yoki kompyuterda ochiladi.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
