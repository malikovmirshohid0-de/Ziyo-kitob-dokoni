import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, Mail } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setPhone('+998 ');
      setMessage('');
      setIsSent(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B] block mb-2">
          Biz bilan bog'laning
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F5F4A] mb-4">
          Aloqa va manzilimiz
        </h1>
        <p className="text-xl text-[#4D5C54] leading-relaxed">
          Savollaringiz bormi yoki telefon orqali kitob buyurtma qilmoqchimisiz? Biz sizga bajonidil yordam beramiz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Phone Card */}
          <div className="bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#1F5F4A]/10 text-[#1F5F4A] rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-[#6B7C73] uppercase font-bold tracking-wider block mb-1">
                  Telefon qo'ng'iroqlari
                </span>
                <a href="tel:+998712004575" className="text-2xl font-bold text-[#1F5F4A] block hover:underline">
                  +998 71 200-45-75
                </a>
                <a href="tel:+998901234567" className="text-lg font-semibold text-[#1C2924] block hover:underline mt-0.5">
                  +998 90 123-45-67
                </a>
                <p className="text-xs text-[#5C6E64] mt-2">
                  Mutaxassisimiz sizga kitob tanlashda va buyurtma berishda yordam beradi.
                </p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#1F5F4A]/10 text-[#1F5F4A] rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-[#6B7C73] uppercase font-bold tracking-wider block mb-1">
                  Bosh do'kon manzili
                </span>
                <h3 className="text-xl font-bold text-[#1C2924]">
                  Toshkent shahri, Chilonzor tumani
                </h3>
                <p className="text-base text-[#4D5C54] mt-1">
                  Bunyodkor shox ko'chasi, 24-uy ("Mirzo Ulug'bek" metro bekati yaqinida)
                </p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#1F5F4A]/10 text-[#1F5F4A] rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-[#6B7C73] uppercase font-bold tracking-wider block mb-1">
                  Ish vaqti
                </span>
                <h3 className="text-xl font-bold text-[#1C2924]">
                  Har kuni 09:00 — 20:00
                </h3>
                <p className="text-sm text-[#4D5C54] mt-1">
                  Shanba va yakshanba kunlari ham dam olishsiz xizmat ko'rsatamiz.
                </p>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="bg-[#FAF7F0] border border-[#E5DECF] rounded-2xl p-6">
            <span className="text-xs text-[#6B7C73] uppercase font-bold tracking-wider block mb-3">
              Ijtimoiy tarmoqlar
            </span>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#C6BCAB] rounded-xl text-sm font-semibold text-[#1C2924] hover:bg-[#FAF7F0]"
              >
                <Send className="w-4 h-4 text-[#1F5F4A]" />
                <span>Telegram: @ziyokitoblar_uz</span>
              </a>
            </div>
          </div>

        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-10 shadow-xs">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F5F4A] mb-2">
              Bizga xabar qoldiring
            </h2>
            <p className="text-base text-[#4D5C54] mb-8">
              Siz qidirayotgan kitob katalogda yo'qmi yoki taklifingiz bormi? Quyidagi formani to'ldiring, biz sizga qo'ng'iroq qilamiz.
            </p>

            {isSent ? (
              <div className="p-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-center gap-3 font-semibold text-lg">
                <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                <span>Xabaringiz qabul qilindi! Tez orada mutaxassisimiz siz bilan bog'lanadi.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-[#1C2924] mb-1.5">
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Dilshod Rahimov"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[50px] px-4 rounded-xl border border-[#C6BCAB] text-lg bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-[#1C2924] mb-1.5">
                    Telefon raqamingiz *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full min-h-[50px] px-4 rounded-xl border border-[#C6BCAB] text-lg bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-[#1C2924] mb-1.5">
                    Xabaringiz yoki savolingiz *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Qanday kitob kerak yoki qanday yordam bera olamiz?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 rounded-xl border border-[#C6BCAB] text-lg bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[52px] py-4 bg-[#1F5F4A] hover:bg-[#174838] text-white font-bold rounded-xl text-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 text-[#C9A24B]" />
                  <span>Xabarni yuborish</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
