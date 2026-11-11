import React, { useState } from 'react';
import { BookOpen, ShoppingBag, BookMarked, Phone, ShieldCheck, Menu, X, Plus, Minus } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'catalog' | 'cart' | 'my-books' | 'contact';
  onNavigate: (view: 'home' | 'catalog' | 'cart' | 'my-books' | 'contact') => void;
  cartCount: number;
  myBooksCount: number;
  fontSize: 'standard' | 'large' | 'xlarge';
  onFontSizeChange: (size: 'standard' | 'large' | 'xlarge') => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  myBooksCount,
  fontSize,
  onFontSizeChange,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: 'home' | 'catalog' | 'cart' | 'my-books' | 'contact'; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: null },
    { id: 'catalog', label: 'Kitoblar', icon: null },
    { id: 'cart', label: 'Savat', icon: <ShoppingBag className="w-5 h-5 mr-1" />, badge: cartCount },
    { id: 'my-books', label: 'Kitoblarim', icon: <BookMarked className="w-5 h-5 mr-1" />, badge: myBooksCount },
    { id: 'contact', label: 'Aloqa', icon: null },
  ];

  const handleNavClick = (view: 'home' | 'catalog' | 'cart' | 'my-books' | 'contact') => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E5DECF] transition-colors shadow-xs">
      {/* Top accessibility bar for elder readers */}
      <div className="bg-[#1F5F4A] text-white px-4 py-1.5 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#FAF7F0]">Telefon orqali buyurtma:</span>
            <a href="tel:+998712004575" className="font-bold text-[#E5DECF] hover:underline">
              +998 71 200-45-75
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Font size accessibility controller */}
            <div className="flex items-center gap-1.5 bg-[#174838] px-2.5 py-0.5 rounded-sm">
              <span className="text-[11px] text-[#E5DECF] hidden sm:inline">Matn o'lchami:</span>
              <button
                type="button"
                onClick={() => onFontSizeChange('standard')}
                title="Standart matn"
                className={`px-2 py-0.5 text-xs font-semibold rounded ${fontSize === 'standard' ? 'bg-[#FAF7F0] text-[#1F5F4A]' : 'text-white hover:text-[#C9A24B]'}`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('large')}
                title="Katta matn"
                className={`px-2 py-0.5 text-xs font-bold rounded ${fontSize === 'large' ? 'bg-[#FAF7F0] text-[#1F5F4A]' : 'text-white hover:text-[#C9A24B]'}`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('xlarge')}
                title="Juda katta matn"
                className={`px-2 py-0.5 text-xs font-black rounded ${fontSize === 'xlarge' ? 'bg-[#FAF7F0] text-[#1F5F4A]' : 'text-white hover:text-[#C9A24B]'}`}
              >
                A++
              </button>
            </div>

            {/* Admin entry */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-[#FAF7F0]/80 hover:text-white transition-colors"
              title="Admin boshqaruv paneli"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span className="hidden md:inline">Boshqaruv</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-lg bg-[#1F5F4A] flex items-center justify-center text-[#C9A24B] shadow-sm transition-transform group-hover:scale-105">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1F5F4A] block">
                ZIYO
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#4D5C54] tracking-wide block">
                Kitoblar Do'koni
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center text-lg font-medium py-2 px-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#1F5F4A] font-bold border-b-2 border-[#1F5F4A]'
                      : 'text-[#3E4D45] hover:text-[#1F5F4A]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-[#C9A24B] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Call-to-action button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('catalog')}
              className="min-h-[48px] px-6 py-2.5 bg-[#1F5F4A] text-white hover:bg-[#174838] transition-colors rounded-md font-semibold text-base shadow-sm flex items-center gap-2"
            >
              <span>Kitob qidirish</span>
            </button>
          </div>

          {/* Mobile Menu & Cart Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 text-[#1F5F4A] hover:bg-[#EAE4D5] rounded-md"
              aria-label="Savat"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#C9A24B] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#1F5F4A] hover:bg-[#EAE4D5] rounded-md"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5DECF] bg-[#FAF7F0] px-4 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between min-h-[50px] px-4 py-3 rounded-lg text-lg font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-[#1F5F4A] text-white'
                      : 'text-[#1C2924] hover:bg-[#EAE4D5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                        isActive ? 'bg-[#C9A24B] text-white' : 'bg-[#1F5F4A] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            
            <div className="pt-3 border-t border-[#E5DECF] mt-2 flex justify-between items-center px-2">
              <span className="text-sm font-medium text-[#4D5C54]">Qo'ng'iroq uchun:</span>
              <a href="tel:+998712004575" className="text-base font-bold text-[#1F5F4A]">
                +998 71 200-45-75
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
