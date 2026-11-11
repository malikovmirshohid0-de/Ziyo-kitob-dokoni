import React from 'react';
import { BookOpen, Phone, MapPin, Clock, Send, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'catalog' | 'cart' | 'my-books' | 'contact') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-[#143B2E] text-[#FAF7F0] border-t border-[#C9A24B]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#FAF7F0] flex items-center justify-center text-[#1F5F4A] shadow-sm">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <span className="font-serif text-3xl font-bold tracking-tight text-white block">
                  ZIYO
                </span>
                <span className="text-xs text-[#C9A24B] tracking-wider uppercase font-semibold">
                  Kitoblar Do'koni
                </span>
              </div>
            </div>

            <p className="text-base text-[#D4DFD9] leading-relaxed">
              "Yaxshi kitob, yaxshi hayot". Biz katta yoshdagi qadrdon kitobxonlar, ota-onalar va oilalar uchun qulay, ishonchli hamda ko'zga yoqimli milliy va jahon adabiyotlarini yetkazib beramiz.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#C9A24B]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% rasmiy nashrlar va sifat kafolati</span>
            </div>
          </div>

          {/* Sahifalar (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#C9A24B]/30 pb-2">
              Sahifalar
            </h4>
            <ul className="space-y-2.5 text-base text-[#D4DFD9]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  Kitoblar katalogi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-books')}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  Kitoblarim
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cart')}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  Xarid savati
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  Aloqa va manzil
                </button>
              </li>
            </ul>
          </div>

          {/* Kategoriyalar (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#C9A24B]/30 pb-2">
              Kategoriyalar
            </h4>
            <ul className="space-y-2 text-sm text-[#D4DFD9]">
              <li>Bolalar tarbiyasi va oila</li>
              <li>Liderlik va shaxsiy rivojlanish</li>
              <li>Badiiy adabiyot va romanlar</li>
              <li>Psixologiya va qalb xotirjamligi</li>
              <li>Diniy-ma'rifiy asarlar</li>
              <li>O'zbek va jahon klassikasi</li>
            </ul>
          </div>

          {/* Aloqa & Ijtimoiy tarmoqlar (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#C9A24B]/30 pb-2">
              Bog'lanish
            </h4>
            
            <div className="space-y-3 text-base text-[#D4DFD9]">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" />
                <div>
                  <a href="tel:+998712004575" className="font-bold text-white block hover:text-[#C9A24B]">
                    +998 71 200-45-75
                  </a>
                  <a href="tel:+998901234567" className="text-sm text-[#D4DFD9] block hover:text-[#C9A24B]">
                    +998 90 123-45-67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" />
                <span className="text-sm">
                  Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi, 24-uy
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" />
                <span className="text-sm">
                  Har kuni: 09:00 dan 20:00 gacha
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2">
              <span className="text-xs uppercase font-bold text-[#C9A24B] block mb-2">
                Ijtimoiy tarmoqlarimiz:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#C9A24B] hover:text-[#143B2E] transition-colors flex items-center justify-center font-bold text-sm"
                  title="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#C9A24B] hover:text-[#143B2E] transition-colors flex items-center justify-center font-bold text-sm"
                  title="Instagram"
                >
                  Insta
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#C9A24B] hover:text-[#143B2E] transition-colors flex items-center justify-center font-bold text-sm"
                  title="Facebook"
                >
                  FB
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A6BAAE] gap-4">
          <p>© 2026 Ziyo Kitoblar Do'koni. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6">
            <span>O'zbekistonda mehr bilan yaratilgan</span>
            <button
              onClick={onOpenAdmin}
              className="text-[#C9A24B] hover:underline"
            >
              Do'kon ma'muriyati (Admin)
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
