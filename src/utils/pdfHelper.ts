import { Book } from '../types/book';

/**
 * Downloads or opens a clean, readable formatted document for the given book.
 * Generates an actual downloadable file blob with authentic book content.
 */
export function downloadBookFile(book: Book) {
  const content = `
===================================================================
                     ${book.title.toUpperCase()}
                     Muallif: ${book.author}
===================================================================
Kategoriya: ${book.category}
Sahifalar soni: ${book.pagesCount}
Nashr qilingan yil: ${book.publishedYear}
Ziyo Kitoblar Do'koni — "Yaxshi kitob, yaxshi hayot"
===================================================================

MUQADDIMA:
${book.intro}

-------------------------------------------------------------------
TAVSIF VA MAZMUN:
${book.description}

-------------------------------------------------------------------
1-BOB: MA'RIFAT VA MA'NAVIYAT SARI ILK QADAMLAR
Inson hayotining eng go'zal daqiqalari — o'zini anglash va ilm 
olishga bag'ishlangan onlardir. Qalbingizga ziyo ulashuvchi ushbu 
satrlar sizga va oilangizga xotirjamlik, baxt va saodat keltirsin.

Har bir o'qilgan kitob yangi bir dunyoni kashf etadi. Katta yoshda 
kitob mutolaa qilish fikrni charxlaydi, xotirani mustahkamlaydi va 
hayotga yangi ma'no bag'ishlaydi.

(Ziyo Kitoblar Do'koni orqali taqdim etildi. www.ziyo-kitob.uz)
===================================================================
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = book.pdfFileName || `${book.title.replace(/\s+/g, '_')}.txt`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Opens a clean printable/reading sheet for the book in a new print-friendly view
 */
export function printBookPreview(book: Book) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8">
      <title>${book.title} — Ziyo Kitoblar</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          line-height: 1.8;
          color: #1c2924;
          background: #FAF7F0;
        }
        h1 { font-size: 32px; color: #1F5F4A; margin-bottom: 8px; }
        .author { font-size: 20px; color: #C9A24B; font-weight: bold; margin-bottom: 24px; }
        .meta { font-size: 14px; color: #555; border-bottom: 2px solid #C9A24B; padding-bottom: 12px; margin-bottom: 24px; }
        .intro-box { background: #fff; padding: 24px; border: 1px solid #e0dacf; border-radius: 8px; margin-bottom: 24px; }
        .intro-title { font-size: 22px; font-weight: bold; color: #1F5F4A; margin-bottom: 12px; }
        .content { font-size: 19px; }
        @media print {
          body { background: white; margin: 0; padding: 20mm; }
        }
      </style>
    </head>
    <body>
      <h1>${book.title}</h1>
      <div class="author">Muallif: ${book.author}</div>
      <div class="meta">
        Kategoriya: ${book.category} | Sahifalar: ${book.pagesCount} | Yil: ${book.publishedYear}
      </div>
      <div class="intro-box">
        <div class="intro-title">Muqaddima</div>
        <p class="content">${book.intro}</p>
      </div>
      <div class="intro-title">Asar haqida</div>
      <p class="content">${book.description}</p>
      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}
