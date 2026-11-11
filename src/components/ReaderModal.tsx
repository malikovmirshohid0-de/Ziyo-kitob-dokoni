import React, { useState } from 'react';
import { Book } from '../types/book';
import { X, Printer, ZoomIn, ZoomOut, BookOpen, Download } from 'lucide-react';
import { downloadBookFile, printBookPreview } from '../utils/pdfHelper';

interface ReaderModalProps {
  book: Book | null;
  onClose: () => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({ book, onClose }) => {
  const [readerTheme, setReaderTheme] = useState<'cream' | 'white' | 'dark'>('cream');
  const [readerFontSize, setReaderFontSize] = useState<number>(20);

  if (!book) return null;

  const themeStyles = {
    cream: 'bg-[#FAF7F0] text-[#1C2924] border-[#E5DECF]',
    white: 'bg-white text-[#111827] border-gray-200',
    dark: 'bg-[#18231E] text-[#EDE7D9] border-[#2A3C34]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm">
      <div className={`relative w-full max-w-4xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${themeStyles[readerTheme]}`}>
        
        {/* Reader Top Controls */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-black/10 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#1F5F4A]" />
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl line-clamp-1">
                {book.title}
              </h2>
              <span className="text-xs opacity-75">{book.author} — Namuna mutolaasi</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme switcher */}
            <div className="flex items-center gap-1 bg-black/5 p-1 rounded-lg">
              <button
                onClick={() => setReaderTheme('cream')}
                className={`w-7 h-7 rounded bg-[#FAF7F0] border border-[#C9A24B] ${readerTheme === 'cream' ? 'ring-2 ring-[#1F5F4A]' : ''}`}
                title="Krem fon"
              />
              <button
                onClick={() => setReaderTheme('white')}
                className={`w-7 h-7 rounded bg-white border border-gray-300 ${readerTheme === 'white' ? 'ring-2 ring-[#1F5F4A]' : ''}`}
                title="Oq fon"
              />
              <button
                onClick={() => setReaderTheme('dark')}
                className={`w-7 h-7 rounded bg-[#18231E] border border-gray-700 ${readerTheme === 'dark' ? 'ring-2 ring-[#C9A24B]' : ''}`}
                title="Qorong'i fon"
              />
            </div>

            {/* Font size control */}
            <div className="flex items-center gap-1 bg-black/5 px-2 py-1 rounded-lg text-sm font-bold">
              <button
                onClick={() => setReaderFontSize(Math.max(16, readerFontSize - 2))}
                className="p-1 hover:opacity-75"
                title="Kichraytirish"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs px-1">{readerFontSize}px</span>
              <button
                onClick={() => setReaderFontSize(Math.min(30, readerFontSize + 2))}
                className="p-1 hover:opacity-75"
                title="Kattalashtirish"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={() => printBookPreview(book)}
              className="p-2 hover:bg-black/10 rounded-lg transition-colors"
              title="Chop etish"
            >
              <Printer className="w-5 h-5" />
            </button>

            {/* Download button */}
            {book.hasPdf && (
              <button
                onClick={() => downloadBookFile(book)}
                className="p-2 hover:bg-black/10 rounded-lg transition-colors"
                title="Yuklab olish"
              >
                <Download className="w-5 h-5" />
              </button>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/10 rounded-lg transition-colors ml-2"
              aria-label="Yopish"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Reader Book Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 sm:py-12 max-w-3xl mx-auto w-full">
          <div className="text-center mb-10 pb-6 border-b border-black/10">
            <span className="text-sm uppercase tracking-widest text-[#C9A24B] font-semibold block mb-2">
              {book.category}
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl mb-3">
              {book.title}
            </h1>
            <p className="text-xl italic opacity-85">
              Muallif: {book.author}
            </p>
          </div>

          {/* Muqaddima */}
          <div className="mb-10">
            <h3 className="font-serif font-bold text-2xl mb-4 text-[#1F5F4A]">
              Muqaddima
            </h3>
            <p 
              className="font-serif leading-relaxed italic border-l-4 border-[#C9A24B] pl-6 py-2"
              style={{ fontSize: `${readerFontSize}px`, lineHeight: 1.8 }}
            >
              {book.intro}
            </p>
          </div>

          {/* Sample Chapter Excerpt */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-2xl text-[#1F5F4A] pt-4 border-t border-black/10">
              Birinchi bobdan namuna
            </h3>
            <p 
              className="leading-relaxed"
              style={{ fontSize: `${readerFontSize}px`, lineHeight: 1.8 }}
            >
              Kitob inson ma'naviyatini yuksaltiruvchi va qalbiga yorug'lik bag'ishlovchi bebaho xazinadir. Mazkur asar o'quvchiga hayotiy saboqlar, chuqur tafakkur va o'zligini anglash imkonini beradi. Har bir so'z zamirida ko'p yillik mushohada va hayot tajribasi mujassam.
            </p>
            <p 
              className="leading-relaxed"
              style={{ fontSize: `${readerFontSize}px`, lineHeight: 1.8 }}
            >
              {book.description}
            </p>
            <p 
              className="leading-relaxed"
              style={{ fontSize: `${readerFontSize}px`, lineHeight: 1.8 }}
            >
              Inson qaysi yoshda bo'lishidan qat'i nazar, kitob orqali yangi olamlarni zabt etishi, o'z oilasi va yaqinlariga mehr-muhabbat ulashishi mumkin. Ushbu kitob to'liq holatda sizning ma'naviy hamrohingizga aylanadi.
            </p>
          </div>

          {/* Call to action at bottom of sample */}
          <div className="mt-12 p-6 bg-black/5 rounded-xl text-center border border-black/10">
            <p className="text-base font-medium mb-3">
              Namunani o'qib bo'ldingizmi? To'liq kitobni mutolaa qilish uchun uni savatga qo'shing yoki yuklab oling.
            </p>
            <button
              onClick={onClose}
              className="min-h-[48px] px-8 py-2.5 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-lg font-bold"
            >
              Kitob sahifasiga qaytish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
