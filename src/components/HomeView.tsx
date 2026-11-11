import React, { useState } from 'react';
import { Book, Review } from '../types/book';
import { BookCard } from './BookCard';
import { ReviewsSection } from './ReviewsSection';
import { Search, Sparkles, BookOpen, ShieldCheck, HeartHandshake, Eye, ArrowRight, Truck } from 'lucide-react';

interface HomeViewProps {
  books: Book[];
  reviews: Review[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onQuickRead: (book: Book) => void;
  onNavigateToCatalog: (category?: string, search?: string) => void;
  onAddReview: (review: Review) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  books,
  reviews,
  onSelectBook,
  onAddToCart,
  onQuickRead,
  onNavigateToCatalog,
  onAddReview
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onNavigateToCatalog(undefined, searchInput.trim());
    }
  };

  // Section collections
  const bestsellerBooks = books.filter((b) => b.isBestseller && b.price > 0).slice(0, 4);
  const newBooks = books.filter((b) => b.isNew && b.price > 0).slice(0, 4);
  const freeBooks = books.filter((b) => b.price === 0 || b.isFree).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Large Hero Banner: "Yaxshi kitob, yaxshi hayot" */}
      <section className="relative overflow-hidden bg-[#FAF7F0] border-b border-[#E5DECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F5F4A] bg-[#1F5F4A]/10 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-[#C9A24B]" />
                <span>Katta yoshdagilar va oilalar uchun qulay do'kon</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1F5F4A] leading-[1.15] text-balance">
                Yaxshi kitob, <br />
                <span className="text-[#C9A24B] italic">yaxshi hayot</span>.
              </h1>

              <p className="text-xl sm:text-2xl text-[#3E4D45] leading-relaxed max-w-xl font-serif">
                Ko'zga yoqimli katta shriftlar, sokin qalbiy asarlar va oilangiz uchun eng ibratli milliy va jahon durdonalari.
              </p>

              {/* Large Search Box in Hero */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl pt-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Kitob yoki muallif nomini yozing..."
                  className="w-full min-h-[58px] pl-14 pr-32 rounded-2xl border-2 border-[#C6BCAB] text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F4A] focus:border-[#1F5F4A]"
                />
                <Search className="w-6 h-6 text-[#1F5F4A] absolute left-4 top-1/2 -translate-y-1/2 pt-1" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 mt-1 min-h-[46px] px-5 bg-[#1F5F4A] hover:bg-[#174838] text-white font-bold rounded-xl text-base transition-colors"
                >
                  Qidirish
                </button>
              </form>

              {/* Key Highlights for Senior Readers */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-[#3E4D45]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1F5F4A]/10 flex items-center justify-center text-[#1F5F4A] shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">Katta va aniq shriftlar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1F5F4A]/10 flex items-center justify-center text-[#1F5F4A] shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">Tezkor yetkazib berish</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1F5F4A]/10 flex items-center justify-center text-[#1F5F4A] shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                  </div>
                  <span className="text-sm font-semibold">Qulay va oson to'lov</span>
                </div>
              </div>

            </div>

            {/* Right Media (lg:col-span-5): Generated warm editorial photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E5DECF]">
                <img
                  src="/src/assets/images/hero_library_reading_1794395303946.jpg"
                  alt="Ziyo Kitoblar Do'koni — sokin kutubxona"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white font-serif text-lg sm:text-xl italic drop-shadow-md">
                    "Kitob — qalb chirog'i, aql quvvati va hayot yo'ldoshidir."
                  </p>
                </div>
              </div>

              {/* Decorative gold badge */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl border border-[#E5DECF] shadow-lg hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A24B] text-white flex items-center justify-center font-bold font-serif text-lg">
                  Z
                </div>
                <div>
                  <span className="text-xs text-[#5C6E64] block font-medium">O'zbek tilida</span>
                  <span className="text-sm font-bold text-[#1C2924]">Saralangan adabiyotlar</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Eng ko'p sotilganlar (Bestsellers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B]">
              Kitobxonlar tanlovi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A] mt-1">
              Eng ko'p sotilgan kitoblar
            </h2>
            <p className="text-lg text-[#4D5C54] mt-1">
              O'quvchilarimiz tomonidan eng yuqori baholangan va tavsiya etilgan asarlar.
            </p>
          </div>

          <button
            onClick={() => onNavigateToCatalog()}
            className="min-h-[48px] px-5 py-2.5 bg-white border border-[#C6BCAB] text-[#1F5F4A] hover:bg-[#FAF7F0] font-bold rounded-xl text-base transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs"
          >
            <span>Barcha kitoblar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellerBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              onAddToCart={onAddToCart}
              onQuickRead={onQuickRead}
            />
          ))}
        </div>
      </section>

      {/* 3. Yangi kitoblar (New Releases) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B]">
              Yangi nashrlar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A] mt-1">
              Yangi kitoblar
            </h2>
            <p className="text-lg text-[#4D5C54] mt-1">
              Yaqinda chop etilgan va do'konimiz peshtaxtasiga kelgan qimmatli qo'llanmalar.
            </p>
          </div>

          <button
            onClick={() => onNavigateToCatalog()}
            className="min-h-[48px] px-5 py-2.5 bg-white border border-[#C6BCAB] text-[#1F5F4A] hover:bg-[#FAF7F0] font-bold rounded-xl text-base transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs"
          >
            <span>Katalogga o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              onAddToCart={onAddToCart}
              onQuickRead={onQuickRead}
            />
          ))}
        </div>
      </section>

      {/* 4. Bepul kitoblar (Free Public Domain Classics) */}
      <section className="bg-gradient-to-b from-[#FAF7F0] to-[#EAE4D5]/40 py-12 sm:py-16 border-y border-[#E5DECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1F5F4A] px-3 py-1 rounded-md mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Ommaviy mulk durdonalari</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A]">
                Bepul kitoblar va mumtoz meros
              </h2>
              <p className="text-lg text-[#4D5C54] mt-1 max-w-2xl">
                Abdulla Qodiriy, Bobur Mirzo, Cho'lpon va boshqa buyuk ajdodlarimizning asarlarini istalgan vaqtda mutlaqo bepul yuklab oling va mutolaa qiling.
              </p>
            </div>

            <button
              onClick={() => onNavigateToCatalog('Bepul kitoblar')}
              className="min-h-[48px] px-6 py-2.5 bg-[#1F5F4A] text-white hover:bg-[#174838] font-bold rounded-xl text-base transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs"
            >
              <span>Barcha bepul kitoblar</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                onAddToCart={onAddToCart}
                onQuickRead={onQuickRead}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Nega aynan Ziyo do'koni? (Senior-tailored Trust Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B]">
            Bizning afzalliklarimiz
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A] mt-1">
            Nega aynan Ziyo do'koni?
          </h2>
          <p className="text-lg text-[#4D5C54] mt-2">
            Biz har bir kitobxonga ehtirom va g'amxo'rlik bilan yondashamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#E5DECF] rounded-2xl p-8 shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1F5F4A]/10 text-[#1F5F4A] flex items-center justify-center mx-auto">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2924]">
              Katta va ko'zga yoqimli shrift
            </h3>
            <p className="text-base text-[#4D5C54] leading-relaxed">
              Saytimiz va kitoblarimiz katta yoshdagi insonlar uchun qulay o'lchamda tayyorlangan. Shrift o'lchamini o'zingizga moslab kattalashtirishingiz mumkin.
            </p>
          </div>

          <div className="bg-white border border-[#E5DECF] rounded-2xl p-8 shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1F5F4A]/10 text-[#1F5F4A] flex items-center justify-center mx-auto">
              <HeartHandshake className="w-8 h-8 text-[#C9A24B]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2924]">
              Telefon orqali samimiy xizmat
            </h3>
            <p className="text-base text-[#4D5C54] leading-relaxed">
              Agar onlayn buyurtma berishda noqulaylik sezilsa, birgina qo'ng'iroq orqali xodimlarimiz buyurtmangizni to'liq rasmiylashtirib berishadi.
            </p>
          </div>

          <div className="bg-white border border-[#E5DECF] rounded-2xl p-8 shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1F5F4A]/10 text-[#1F5F4A] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2924]">
              Elektron va bosma nusxalar
            </h3>
            <p className="text-base text-[#4D5C54] leading-relaxed">
              Ko'plab kitoblarning qog'oz shakli bilan birga PDF elektron nusxasi ham taqdim etiladi. Istalgan vaqtda telefoningizda ham o'qiy olasiz.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews Section */}
      <ReviewsSection
        reviews={reviews}
        onAddReview={onAddReview}
      />

    </div>
  );
};
