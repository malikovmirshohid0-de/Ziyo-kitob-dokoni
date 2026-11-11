import React, { useState } from 'react';
import { Review } from '../types/book';
import { Star, MessageSquarePlus, CheckCircle, Quote } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [bookTitle, setBookTitle] = useState("Ota-onamni yaxshi ko'raman");
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      role: role.trim() || "Kitobxon",
      comment: comment.trim(),
      bookTitle,
      rating,
      date: "Hozirgina"
    };

    onAddReview(newRev);
    setIsSubmitted(true);
    setTimeout(() => {
      setShowAddForm(false);
      setIsSubmitted(false);
      setAuthor('');
      setRole('');
      setComment('');
    }, 1500);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F0] border-t border-[#E5DECF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C9A24B]">
              Samimiy e'tiroflar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F5F4A] mt-1">
              Kitobxonlarimiz fikrlari
            </h2>
            <p className="text-lg text-[#4D5C54] mt-2 max-w-xl">
              Bizning aziz o'quvchilarimiz, nuroniy ota-onalar va muallimlarning xizmatimiz haqidagi samimiy dil so'zlari.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="min-h-[48px] px-6 py-2.5 bg-white border border-[#C6BCAB] text-[#1F5F4A] hover:bg-[#FAF7F0] rounded-xl font-bold text-base transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs"
          >
            <MessageSquarePlus className="w-5 h-5 text-[#C9A24B]" />
            <span>Fikr qoldirish</span>
          </button>
        </div>

        {/* Optional Add Review Form */}
        {showAddForm && (
          <div className="mb-10 bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl">
            <h3 className="font-serif text-2xl font-bold text-[#1F5F4A] mb-4">
              O'z fikr-mulohazangizni yozing
            </h3>

            {isSubmitted ? (
              <div className="p-4 bg-green-50 text-green-800 rounded-xl flex items-center gap-2 font-medium">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Rahmat! Sizning samimiy fikringiz qabul qilindi.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1C2924] mb-1">
                      Ismingiz va yoshingiz *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Sobir ota, 63 yosh"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full min-h-[46px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1C2924] mb-1">
                      Kasbingiz yoki shahringiz
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: O'qituvchi, Buxoro"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full min-h-[46px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1C2924] mb-1">
                      Qaysi kitob haqida?
                    </label>
                    <input
                      type="text"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      className="w-full min-h-[46px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1C2924] mb-1">
                      Bahoyingiz:
                    </label>
                    <div className="flex items-center gap-2 pt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setRating(s)}
                          className="p-1 text-[#C9A24B] focus:outline-none"
                        >
                          <Star className={`w-6 h-6 ${s <= rating ? 'fill-current' : 'opacity-30'}`} />
                        </button>
                      ))}
                      <span className="text-sm font-bold text-[#1C2924] ml-2">{rating} yulduz</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C2924] mb-1">
                    Fikringiz *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Kitobning qulayligi, shrift o'lchami yoki yetkazib berish xizmati haqida yozing..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="min-h-[48px] px-6 py-2.5 bg-[#1F5F4A] text-white hover:bg-[#174838] font-bold rounded-xl text-base shadow-xs transition-colors"
                  >
                    Fikrni yuborish
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="min-h-[48px] px-4 py-2.5 text-sm font-semibold text-[#4D5C54] hover:text-[#1C2924]"
                  >
                    Bekor qilish
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#C9A24B]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#C9A24B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#C9A24B]/40" />
                </div>

                <p className="text-lg text-[#2E3C34] leading-relaxed font-sans mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFEAE1]">
                <h4 className="font-serif font-bold text-lg text-[#1C2924]">
                  {rev.author}
                </h4>
                <p className="text-sm text-[#4D5C54]">
                  {rev.role}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-[#6B7C73]">
                  <span className="italic">Kitob: {rev.bookTitle}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
