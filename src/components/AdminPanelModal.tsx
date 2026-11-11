import React, { useState } from 'react';
import { Book, BookCategory, Order } from '../types/book';
import { formatPrice } from '../data/initialBooks';
import { 
  X, ShieldCheck, Plus, Edit2, Trash2, KeyRound, 
  BookOpen, Package, RotateCcw, Upload, Check, AlertCircle, FileText 
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  orders: Order[];
  onAddBook: (newBook: Book) => void;
  onUpdateBook: (updatedBook: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onResetDefaults: () => void;
}

const CATEGORIES: BookCategory[] = [
  'Bolalar tarbiyasi',
  'Liderlik',
  'Badiiy adabiyot',
  'Biznes',
  'Psixologiya',
  'Diniy-ma\'rifiy',
  'Jahon klassikasi'
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  books,
  orders,
  onAddBook,
  onUpdateBook,
  onDeleteBook,
  onResetDefaults
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'books' | 'add' | 'orders'>('books');
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<BookCategory>('Bolalar tarbiyasi');
  const [price, setPrice] = useState<number>(35000);
  const [coverImage, setCoverImage] = useState('');
  const [coverColor, setCoverColor] = useState('from-[#1F5F4A] to-[#123629]');
  const [pagesCount, setPagesCount] = useState<number>(220);
  const [publishedYear, setPublishedYear] = useState<number>(2025);
  const [description, setDescription] = useState('');
  const [intro, setIntro] = useState('');
  const [hasPdf, setHasPdf] = useState(true);
  const [pdfFileName, setPdfFileName] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isFree, setIsFree] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password
    if (passwordInput === 'ziyo2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError("Noto'g'ri parol. Sinov paroli: ziyo2026");
    }
  };

  const handleResetForm = () => {
    setTitle('');
    setAuthor('');
    setCategory('Bolalar tarbiyasi');
    setPrice(35000);
    setCoverImage('');
    setCoverColor('from-[#1F5F4A] to-[#123629]');
    setPagesCount(220);
    setPublishedYear(2025);
    setDescription('');
    setIntro('');
    setHasPdf(true);
    setPdfFileName('');
    setIsBestseller(false);
    setIsNew(true);
    setIsFree(false);
    setEditingBookId(null);
    setFormSuccessMessage('');
  };

  const startEditBook = (book: Book) => {
    setEditingBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setPrice(book.price);
    setCoverImage(book.coverImage || '');
    setCoverColor(book.coverColor || 'from-[#1F5F4A] to-[#123629]');
    setPagesCount(book.pagesCount);
    setPublishedYear(book.publishedYear);
    setDescription(book.description);
    setIntro(book.intro);
    setHasPdf(book.hasPdf);
    setPdfFileName(book.pdfFileName || '');
    setIsBestseller(book.isBestseller || false);
    setIsNew(book.isNew || false);
    setIsFree(book.price === 0 || !!book.isFree);
    setActiveTab('add');
    setFormSuccessMessage('');
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !description.trim() || !intro.trim()) {
      alert("Iltimos, kitob nomi, muallif, tavsif va muqaddimani to'ldiring.");
      return;
    }

    const calculatedPrice = isFree ? 0 : Number(price);

    if (editingBookId) {
      // Update existing
      const updated: Book = {
        id: editingBookId,
        title: title.trim(),
        author: author.trim(),
        category,
        price: calculatedPrice,
        isFree,
        isBestseller,
        isNew,
        coverImage: coverImage.trim(),
        coverColor,
        pagesCount: Number(pagesCount) || 200,
        publishedYear: Number(publishedYear) || 2025,
        description: description.trim(),
        intro: intro.trim(),
        hasPdf,
        pdfFileName: pdfFileName.trim() || (hasPdf ? `${title.toLowerCase().replace(/\s+/g, '_')}.pdf` : undefined),
        rating: 4.9,
        reviewsCount: 45
      };
      onUpdateBook(updated);
      setFormSuccessMessage("Kitob ma'lumotlari muvaffaqiyatli yangilandi!");
    } else {
      // Create new
      const newBook: Book = {
        id: `book-custom-${Date.now()}`,
        title: title.trim(),
        author: author.trim(),
        category,
        price: calculatedPrice,
        isFree,
        isBestseller,
        isNew,
        coverImage: coverImage.trim(),
        coverColor,
        pagesCount: Number(pagesCount) || 200,
        publishedYear: Number(publishedYear) || 2025,
        description: description.trim(),
        intro: intro.trim(),
        hasPdf,
        pdfFileName: pdfFileName.trim() || (hasPdf ? `${title.toLowerCase().replace(/\s+/g, '_')}.pdf` : undefined),
        rating: 5.0,
        reviewsCount: 1
      };
      onAddBook(newBook);
      setFormSuccessMessage("Yangi kitob katalogga muvaffaqiyatli qo'shildi!");
    }

    setTimeout(() => {
      handleResetForm();
      setActiveTab('books');
    }, 1200);
  };

  // Mock PDF file selection
  const handlePdfUploadSimulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFileName(file.name);
      setHasPdf(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF7F0] border border-[#E5DECF] rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1F5F4A] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#C9A24B]" />
            <div>
              <h2 className="font-serif font-bold text-xl">
                Ziyo Do'koni — Boshqaruv Paneli (Admin)
              </h2>
              <span className="text-xs text-[#E5DECF]">
                Kitoblarni tahrirlash, yangi qo'shish va buyurtmalar nazorati
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Yopish"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* Password Prompt if not authenticated */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="w-16 h-16 bg-[#1F5F4A]/10 text-[#1F5F4A] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1C2924] mb-2">
                Admin parolini kiriting
              </h3>
              <p className="text-sm text-[#4D5C54] mb-6">
                Ushbu bo'lim faqat do'kon ma'murlari uchun mo'ljallangan.
              </p>

              {passwordError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
                  {passwordError}
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-semibold text-[#1C2924] mb-1">
                    Parol:
                  </label>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Parolni kiriting..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                  />
                </div>

                <div className="p-3 bg-[#EAE4D5]/60 rounded-lg text-xs text-[#4D5C54] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#1F5F4A] shrink-0" />
                  <span>Sinov uchun standart parol: <strong className="text-[#1F5F4A]">ziyo2026</strong></span>
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] bg-[#1F5F4A] hover:bg-[#174838] text-white font-bold rounded-xl text-base shadow-sm transition-colors"
                >
                  Kirish
                </button>
              </form>
            </div>
          ) : (
            <div>
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#E5DECF] pb-4 mb-6 gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setActiveTab('books'); handleResetForm(); }}
                    className={`min-h-[44px] px-5 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${
                      activeTab === 'books'
                        ? 'bg-[#1F5F4A] text-white'
                        : 'bg-white border border-[#C6BCAB] text-[#1C2924] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Kitoblar ro'yxati ({books.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('add'); handleResetForm(); }}
                    className={`min-h-[44px] px-5 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${
                      activeTab === 'add'
                        ? 'bg-[#1F5F4A] text-white'
                        : 'bg-white border border-[#C6BCAB] text-[#1C2924] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingBookId ? "Kitobni tahrirlash" : "Yangi kitob qo'shish"}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`min-h-[44px] px-5 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${
                      activeTab === 'orders'
                        ? 'bg-[#1F5F4A] text-white'
                        : 'bg-white border border-[#C6BCAB] text-[#1C2924] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Buyurtmalar ({orders.length})</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm("Barcha kitoblarni boshlang'ich holatiga qaytarmoqchimisiz?")) {
                      onResetDefaults();
                    }
                  }}
                  className="min-h-[44px] px-4 py-2 text-xs font-semibold text-[#8A6D3B] hover:text-[#5E4720] flex items-center gap-1.5"
                  title="Standart kitoblarni tiklash"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Boshlang'ich holatga qaytarish</span>
                </button>
              </div>

              {/* TAB 1: Books List */}
              {activeTab === 'books' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-serif text-xl font-bold text-[#1C2924]">
                      Barcha kitoblar ({books.length} ta)
                    </h3>
                    <button
                      onClick={() => { handleResetForm(); setActiveTab('add'); }}
                      className="min-h-[40px] px-4 py-2 bg-[#1F5F4A] text-white hover:bg-[#174838] text-xs font-bold rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yangi kitob</span>
                    </button>
                  </div>

                  <div className="bg-white border border-[#E5DECF] rounded-2xl overflow-hidden shadow-xs divide-y divide-[#EFEAE1]">
                    {books.map((b) => (
                      <div key={b.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF7F0] transition-colors">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-14 h-18 rounded bg-[#EAE4D5] overflow-hidden shrink-0 border border-[#DCD3C1]">
                            {b.coverImage ? (
                              <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className={`w-full h-full bg-linear-to-br ${b.coverColor} p-1 text-[8px] text-white flex flex-col justify-center text-center font-serif`}>
                                {b.title.slice(0, 12)}...
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#1F5F4A]">{b.category}</span>
                              {b.hasPdf && <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold">PDF bor</span>}
                              {b.price === 0 && <span className="text-[10px] bg-[#C9A24B] text-white px-1.5 py-0.5 rounded font-bold">Bepul</span>}
                            </div>
                            <h4 className="font-serif font-bold text-lg text-[#1C2924] truncate">
                              {b.title}
                            </h4>
                            <p className="text-sm text-[#4D5C54]">{b.author}</p>
                            <span className="text-base font-bold font-serif text-[#1F5F4A]">
                              {formatPrice(b.price)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => startEditBook(b)}
                            className="min-h-[42px] px-3.5 py-1.5 bg-white border border-[#C6BCAB] text-[#1C2924] hover:bg-[#EAE4D5] rounded-lg text-sm font-semibold flex items-center gap-1.5"
                          >
                            <Edit2 className="w-4 h-4 text-[#1F5F4A]" />
                            <span>Tahrirlash</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`"${b.title}" kitobini o'chirib tashlamoqchimisiz?`)) {
                                onDeleteBook(b.id);
                              }
                            }}
                            className="min-h-[42px] px-3.5 py-1.5 bg-white border border-red-200 text-red-700 hover:bg-red-50 rounded-lg text-sm font-semibold flex items-center gap-1.5"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>O'chirish</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Add or Edit Book Form */}
              {activeTab === 'add' && (
                <div className="bg-white border border-[#E5DECF] rounded-2xl p-6 sm:p-8 shadow-xs">
                  <div className="border-b border-[#E5DECF] pb-4 mb-6 flex justify-between items-center">
                    <h3 className="font-serif text-2xl font-bold text-[#1F5F4A]">
                      {editingBookId ? "Kitobni tahrirlash" : "Yangi kitob qo'shish"}
                    </h3>
                    {editingBookId && (
                      <button
                        onClick={handleResetForm}
                        className="text-sm text-[#4D5C54] hover:underline"
                      >
                        Yangi kitob rejimiga o'tish
                      </button>
                    )}
                  </div>

                  {formSuccessMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-2 font-medium">
                      <Check className="w-5 h-5 text-green-600" />
                      <span>{formSuccessMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveBook} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Kitob nomi */}
                      <div>
                        <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                          Kitob nomi *
                        </label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Masalan: Ota-onamni yaxshi ko'raman"
                          className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                        />
                      </div>

                      {/* Muallif */}
                      <div>
                        <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                          Muallif *
                        </label>
                        <input
                          type="text"
                          required
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="Masalan: Nargiza Rustamova"
                          className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                        />
                      </div>

                      {/* Kategoriya */}
                      <div>
                        <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                          Kategoriya *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as BookCategory)}
                          className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Narx */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-sm font-bold text-[#1C2924]">
                            Narx (so'mda) *
                          </label>
                          <label className="flex items-center gap-1.5 text-xs text-[#1F5F4A] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isFree}
                              onChange={(e) => setIsFree(e.target.checked)}
                              className="rounded text-[#1F5F4A]"
                            />
                            <span className="font-bold">Bepul asar</span>
                          </label>
                        </div>
                        <input
                          type="number"
                          disabled={isFree}
                          min={0}
                          max={150000}
                          step={1000}
                          value={isFree ? 0 : price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          placeholder="35000"
                          className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A] disabled:opacity-50"
                        />
                        <span className="text-xs text-[#5C6E64] mt-1 block">
                          Format: {formatPrice(isFree ? 0 : price)} (10 000 - 150 000 so'm oralig'ida)
                        </span>
                      </div>

                      {/* Muqova rasmi */}
                      <div>
                        <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                          Muqova rasmi manzili (URL)
                        </label>
                        <input
                          type="text"
                          value={coverImage}
                          onChange={(e) => setCoverImage(e.target.value)}
                          placeholder="https://... yoki rasm havolasi"
                          className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                        />
                        <span className="text-xs text-[#5C6E64] mt-1 block">
                          Bo'sh qoldirilsa, maxsus chiroyli rangli charm muqova qo'llaniladi
                        </span>
                      </div>

                      {/* PDF Fayl Yuklash */}
                      <div>
                        <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                          PDF fayl biriktirish / yuklash
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handlePdfUploadSimulation}
                            className="w-full text-xs text-[#4D5C54] file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#1F5F4A] file:text-white hover:file:bg-[#174838] cursor-pointer bg-[#FAF7F0] border border-[#C6BCAB] rounded-xl p-2"
                          />
                        </div>
                        {pdfFileName && (
                          <span className="text-xs text-green-700 font-medium mt-1 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            Biriktirilgan fayl: {pdfFileName}
                          </span>
                        )}
                      </div>

                      {/* Sahifalar soni & Yil */}
                      <div>
                        <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                          Sahifalar soni
                        </label>
                        <input
                          type="number"
                          value={pagesCount}
                          onChange={(e) => setPagesCount(Number(e.target.value))}
                          className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                          Nashr qilingan yil
                        </label>
                        <input
                          type="number"
                          value={publishedYear}
                          onChange={(e) => setPublishedYear(Number(e.target.value))}
                          className="w-full min-h-[48px] px-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                        />
                      </div>
                    </div>

                    {/* Flags */}
                    <div className="flex flex-wrap gap-4 pt-2 border-t border-[#E5DECF]">
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#1C2924]">
                        <input
                          type="checkbox"
                          checked={hasPdf}
                          onChange={(e) => setHasPdf(e.target.checked)}
                          className="rounded text-[#1F5F4A]"
                        />
                        <span>PDF elektron nusxasi mavjud</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#1C2924]">
                        <input
                          type="checkbox"
                          checked={isBestseller}
                          onChange={(e) => setIsBestseller(e.target.checked)}
                          className="rounded text-[#1F5F4A]"
                        />
                        <span>"Eng xaridorgir" (Bestseller) sifatida belgilash</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#1C2924]">
                        <input
                          type="checkbox"
                          checked={isNew}
                          onChange={(e) => setIsNew(e.target.checked)}
                          className="rounded text-[#1F5F4A]"
                        />
                        <span>"Yangi kitob" belgisi</span>
                      </label>
                    </div>

                    {/* Tavsif (Description) */}
                    <div>
                      <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                        Kitob tavsifi (umumiy ma'lumot) *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Kitobning mazmuni, kimlarga mo'ljallangani haqida qisqacha ma'lumot..."
                        className="w-full p-4 rounded-xl border border-[#C6BCAB] text-base bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                      />
                    </div>

                    {/* Muqaddima */}
                    <div>
                      <label className="block text-sm font-bold text-[#1C2924] mb-1.5">
                        Muqaddima (Namuna mutolaa uchun kirish so'zi) *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        placeholder="Kitobning muqaddimasi yoki birinchi bobidan ibratli parcha..."
                        className="w-full p-4 rounded-xl border border-[#C6BCAB] text-base font-serif bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F5F4A]"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4 border-t border-[#E5DECF]">
                      <button
                        type="submit"
                        className="min-h-[50px] px-8 py-3 bg-[#1F5F4A] hover:bg-[#174838] text-white font-bold rounded-xl text-lg transition-colors flex items-center gap-2 shadow-sm"
                      >
                        <Check className="w-5 h-5 text-[#C9A24B]" />
                        <span>{editingBookId ? "O'zgarishlarni saqlash" : "Kitobni katalogga kiritish"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="min-h-[50px] px-6 py-3 bg-[#FAF7F0] border border-[#C6BCAB] text-[#1C2924] hover:bg-[#EAE4D5] rounded-xl font-semibold text-base"
                      >
                        Bekor qilish
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: Orders History */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1C2924]">
                    Kelib tushgan buyurtmalar ({orders.length} ta)
                  </h3>

                  {orders.length === 0 ? (
                    <div className="bg-white border border-[#E5DECF] rounded-2xl p-8 text-center text-[#4D5C54]">
                      Hozircha yangi buyurtmalar kelib tushmagan.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div key={ord.id} className="bg-white border border-[#E5DECF] rounded-xl p-5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between border-b border-[#E5DECF] pb-3 mb-3 gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-base text-[#1F5F4A]">{ord.id}</span>
                              <span className="text-xs text-[#5C6E64]">· {ord.date}</span>
                            </div>
                            <span className="text-xs bg-[#1F5F4A]/10 text-[#1F5F4A] font-bold px-2.5 py-1 rounded">
                              {ord.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[#3E4D45] mb-3">
                            <div>
                              <span className="text-xs text-[#6B7C73] block">Buyurtmachi:</span>
                              <strong className="text-[#1C2924]">{ord.customerName}</strong>
                            </div>
                            <div>
                              <span className="text-xs text-[#6B7C73] block">Telefon:</span>
                              <a href={`tel:${ord.phone}`} className="text-[#1F5F4A] font-semibold">{ord.phone}</a>
                            </div>
                            <div>
                              <span className="text-xs text-[#6B7C73] block">To'lov turi:</span>
                              <strong className="text-[#1C2924]">{ord.paymentMethod}</strong>
                            </div>
                          </div>

                          <div className="text-sm text-[#3E4D45] bg-[#FAF7F0] p-3 rounded-lg mb-2">
                            <span className="text-xs text-[#6B7C73] block mb-0.5">Yetkazib berish manzili:</span>
                            {ord.address}
                          </div>

                          <div className="border-t border-[#EFEAE1] pt-2 flex justify-between items-center text-sm">
                            <span className="text-xs text-[#5C6E64]">
                              Kitoblar: {ord.items.map(i => `${i.book.title} (${i.quantity}x)`).join(', ')}
                            </span>
                            <span className="font-bold font-serif text-[#1F5F4A] text-base">
                              Jami: {formatPrice(ord.totalAmount)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
