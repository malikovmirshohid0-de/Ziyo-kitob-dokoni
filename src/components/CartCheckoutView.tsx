import React, { useState } from 'react';
import { CartItem, Order, Book } from '../types/book';
import { formatPrice } from '../data/initialBooks';
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle, ShieldCheck, Truck, BookOpen, Download } from 'lucide-react';

interface CartCheckoutViewProps {
  cart: CartItem[];
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
  onCompleteOrder: (order: Order) => void;
  onNavigateToCatalog: () => void;
  onNavigateToMyBooks: () => void;
}

export const CartCheckoutView: React.FC<CartCheckoutViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCompleteOrder,
  onNavigateToCatalog,
  onNavigateToMyBooks
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Click' | 'Payme' | 'Uzum' | 'Naqd pul'>('Click');
  const [customerNote, setCustomerNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [formError, setFormError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const deliveryFee = subtotal > 100000 || subtotal === 0 ? 0 : 15000;
  const grandTotal = subtotal + deliveryFee;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhone(val);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError("Iltimos, ismingiz va familiyangizni kiriting.");
      return;
    }
    if (phone.replace(/\D/g, '').length < 9) {
      setFormError("Iltimos, to'liq telefon raqamingizni kiriting.");
      return;
    }
    if (!address.trim()) {
      setFormError("Iltimos, yetkazib berish manzilini (shahar, tuman, ko'cha) kiriting.");
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const newOrder: Order = {
      id: `ZY-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }),
      customerName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod,
      items: [...cart],
      totalAmount: grandTotal,
      status: 'Tasdiqlandi'
    };

    setTimeout(() => {
      onCompleteOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsSubmitting(false);
    }, 600);
  };

  // If order is completed, show the "Rahmat" (Thank You) confirmation view
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-[#1F5F4A] rounded-2xl p-8 sm:p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-[#1F5F4A]/10 text-[#1F5F4A] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B] block mb-1">
            Buyurtma qabul qilindi
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A] mb-3">
            Rahmat, buyurtmangiz muvaffaqiyatli rasmiylashtirildi!
          </h1>
          <p className="text-lg text-[#3E4D45] max-w-xl mx-auto mb-6">
            Hurmatli <span className="font-bold text-[#1C2924]">{completedOrder.customerName}</span>, sizning buyurtmangiz qabul qilindi. Tez orada operatorimiz siz bilan bog'lanadi.
          </p>

          {/* Receipt details */}
          <div className="bg-[#FAF7F0] border border-[#E5DECF] rounded-xl p-6 text-left max-w-lg mx-auto mb-8 space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-[#E5DECF] pb-2">
              <span className="text-[#5C6E64]">Buyurtma raqami:</span>
              <span className="font-bold font-mono text-[#1F5F4A] text-base">{completedOrder.id}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-[#E5DECF] pb-2">
              <span className="text-[#5C6E64]">Sana:</span>
              <span className="font-medium text-[#1C2924]">{completedOrder.date}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-[#E5DECF] pb-2">
              <span className="text-[#5C6E64]">Telefon:</span>
              <span className="font-medium text-[#1C2924]">{completedOrder.phone}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-[#E5DECF] pb-2">
              <span className="text-[#5C6E64]">Manzil:</span>
              <span className="font-medium text-[#1C2924] text-right">{completedOrder.address}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-[#E5DECF] pb-2">
              <span className="text-[#5C6E64]">To'lov usuli:</span>
              <span className="font-bold text-[#1F5F4A]">{completedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center text-base pt-1 font-bold">
              <span className="text-[#1C2924]">Jami to'lov:</span>
              <span className="text-xl font-serif text-[#1F5F4A]">{formatPrice(completedOrder.totalAmount)}</span>
            </div>
          </div>

          <div className="p-4 bg-[#EAF2ED] rounded-xl max-w-lg mx-auto mb-8 text-left flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-[#1F5F4A] shrink-0 mt-0.5" />
            <div className="text-sm text-[#1C2924]">
              <span className="font-bold block mb-0.5">Elektron kitoblaringiz tayyor!</span>
              Sotib olingan kitoblarning PDF nusxalari va namunalarini <span className="font-bold text-[#1F5F4A]">"Kitoblarim"</span> bo'limidan darhol yuklab olishingiz yoki onlayn o'qishingiz mumkin.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onNavigateToMyBooks}
              className="min-h-[50px] px-8 py-3 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-5 h-5 text-[#C9A24B]" />
              <span>Kitoblarimga o'tish</span>
            </button>
            <button
              onClick={onNavigateToCatalog}
              className="min-h-[50px] px-6 py-3 bg-white border border-[#C6BCAB] text-[#1C2924] hover:bg-[#FAF7F0] transition-colors rounded-xl font-semibold text-lg"
            >
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-[#EAE4D5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1F5F4A]">
          <BookOpen className="w-12 h-12" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1F5F4A] mb-3">
          Savatingiz hozircha bo'sh
        </h2>
        <p className="text-xl text-[#4D5C54] max-w-md mx-auto mb-8">
          Bizning qulay katalogimizdan o'zingiz yoki oilangiz uchun foydali kitoblarni tanlang.
        </p>
        <button
          onClick={onNavigateToCatalog}
          className="min-h-[52px] px-8 py-3.5 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-xl font-bold text-lg shadow-sm"
        >
          Kitoblar katalogiga o'tish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B]">
            Xaridni rasmiylashtirish
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A]">
            Savatingiz va buyurtma
          </h1>
        </div>
        <button
          onClick={onNavigateToCatalog}
          className="flex items-center gap-1.5 text-base font-semibold text-[#1F5F4A] hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Katalogga qaytish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#E5DECF] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5DECF] pb-4 mb-4">
              <h2 className="font-serif text-xl font-bold text-[#1C2924]">
                Tanlangan kitoblar ({cart.length})
              </h2>
              <button
                onClick={onClearCart}
                className="text-sm text-red-700 hover:underline font-medium"
              >
                Savatni tozalash
              </button>
            </div>

            <div className="divide-y divide-[#EFEAE1]">
              {cart.map((item) => (
                <div key={item.book.id} className="py-4 flex gap-4 items-center">
                  {/* Miniature Cover */}
                  <div className="w-16 h-22 rounded-md overflow-hidden bg-[#FAF7F0] border border-[#E5DECF] shrink-0 flex items-center justify-center">
                    {item.book.coverImage ? (
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-linear-to-br ${item.book.coverColor} p-1 text-[8px] text-white flex flex-col justify-center text-center font-serif`}>
                        {item.book.title.slice(0, 15)}...
                      </div>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-[#5C6E64] block">{item.book.category}</span>
                    <h3 className="font-serif font-bold text-lg text-[#1C2924] truncate">
                      {item.book.title}
                    </h3>
                    <p className="text-sm text-[#4D5C54] mb-1">{item.book.author}</p>
                    <span className="font-serif font-bold text-base text-[#1F5F4A]">
                      {formatPrice(item.book.price)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#FAF7F0] border border-[#E5DECF] rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.book.id, -1)}
                      className="w-8 h-8 rounded flex items-center justify-center text-[#1C2924] hover:bg-white transition-colors"
                      aria-label="Kamaytirish"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-7 text-center font-bold text-base">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.book.id, 1)}
                      className="w-8 h-8 rounded flex items-center justify-center text-[#1C2924] hover:bg-white transition-colors"
                      aria-label="Ko'paytirish"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveItem(item.book.id)}
                    className="p-2 text-[#7C8B82] hover:text-red-700 transition-colors"
                    title="O'chirish"
                    aria-label="O'chirish"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Trust note */}
          <div className="bg-[#FAF7F0] border border-[#E5DECF] rounded-2xl p-6 flex items-start gap-4">
            <Truck className="w-7 h-7 text-[#1F5F4A] shrink-0 mt-1" />
            <div className="text-base text-[#3E4D45]">
              <span className="font-bold text-[#1C2924] block mb-1">
                Yetkazib berish xizmati
              </span>
              Toshkent shahri bo'ylab 24 soat ichida, butun O'zbekiston viloyatlariga esa 2-3 ish kunida xavfsiz va ehtiyotkorona yetkazib beriladi.
            </div>
          </div>
        </div>

        {/* Right: Checkout Form */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#1F5F4A] mb-6">
              Buyurtmachining ma'lumotlari
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#1C2924] mb-1.5">
                  Ismingiz va Familiyangiz *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Anvar Qodirov"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-lg bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#1C2924] mb-1.5">
                  Telefon raqamingiz *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998 90 123 45 67"
                  className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-lg bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                />
                <span className="text-xs text-[#5C6E64] mt-1 block">
                  Buyurtma holatini xabar qilish uchun
                </span>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#1C2924] mb-1.5">
                  Yetkazib berish manzili *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Viloyat, shahar/tuman, ko'cha va xonadon raqami"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#1C2924] mb-2">
                  To'lov usulini tanlang:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'Click', label: 'Click', desc: 'Online to\'lov' },
                    { id: 'Payme', label: 'Payme', desc: 'Online to\'lov' },
                    { id: 'Uzum', label: 'Uzum Bank', desc: 'Online to\'lov' },
                    { id: 'Naqd pul', label: 'Naqd pul', desc: 'Qabul qilganda' },
                  ].map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`min-h-[52px] p-3 rounded-xl border text-left transition-all flex flex-col justify-center ${
                          isSelected
                            ? 'border-2 border-[#1F5F4A] bg-[#1F5F4A]/5 text-[#1F5F4A] font-bold'
                            : 'border-[#C6BCAB] bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#1C2924]'
                        }`}
                      >
                        <span className="text-base font-bold block">{method.label}</span>
                        <span className="text-xs text-[#5C6E64]">{method.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Calculation */}
              <div className="pt-4 border-t border-[#E5DECF] space-y-2 text-base">
                <div className="flex justify-between text-[#4D5C54]">
                  <span>Kitoblar narxi:</span>
                  <span className="font-semibold text-[#1C2924]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#4D5C54]">
                  <span>Yetkazib berish:</span>
                  <span className="font-semibold text-[#1C2924]">
                    {deliveryFee === 0 ? "Bepul" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#1F5F4A] pt-2 border-t border-[#E5DECF]">
                  <span>Jami to'lov:</span>
                  <span className="font-serif text-2xl">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Big Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] py-4 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-xl font-bold text-xl shadow-md flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <span>Buyurtma yuborilmoqda...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6 text-[#C9A24B]" />
                    <span>Buyurtmani tasdiqlash</span>
                  </>
                )}
              </button>

              <p className="text-xs text-center text-[#5C6E64]">
                Buyurtmani tasdiqlash orqali siz shaxsiy ma'lumotlarni qayta ishlash shartlariga rozilik bildirasiz.
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
