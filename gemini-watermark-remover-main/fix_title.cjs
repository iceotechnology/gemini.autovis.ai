const fs = require('fs');
const path = 'd:/Download/gemini-watermark-remover-main/gemini-watermark-remover-main/public/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Title Tag
const newTitle = '<title>Gemini Watermark Remover - Công cụ xoá watermark không giảm chất lượng</title>';
content = content.replace(/<title>[\s\S]*?<\/title>/, newTitle);

// 2. Fix mangled Meta Tags and Titles
// We'll replace the entire SEO section to be safe
const seoSectionStart = '<title>';
const seoSectionEnd = '<!-- Twitter -->'; // Replace up to here

const cleanSeoSection = `<title>Gemini Watermark Remover - Công cụ xoá watermark không giảm chất lượng</title>
  <meta name="description"
    content="Công cụ AI chuyên nghiệp giúp xoá mờ logo Gemini và watermark từ hình ảnh một cách tự động, giữ nguyên chất lượng gốc. Miễn phí, an toàn và bảo mật.">
  <meta name="keywords"
    content="Gemini watermark remover, xoá logo gemini, xoá watermark gemini bằng ai, công cụ xoá logo ảnh, remove gemini watermark ai, autovis gemini remover" />
  <link rel="icon" href="https://upload.shortspin.ai/data/a2cad3bc-29c3-446b-8e4d-d9e743736505.png">
  <link rel="canonical" href="https://autovis.ai/gemini-remover" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://autovis.ai/gemini-remover">
  <meta property="og:title" content="Gemini Watermark Remover - Công cụ xoá watermark không giảm chất lượng">
  <meta property="og:description" content="Tự động xoá mờ logo Gemini và watermark từ ảnh với công nghệ AI tiên tiến từ Autovis.">
  <meta property="og:image" content="https://upload.shortspin.ai/data/c208da3b-8bf6-4b49-8330-7b43f6288f1d.png">

  <!-- Twitter -->`;

content = content.replace(/<title>[\s\S]*?<!-- Twitter -->/, cleanSeoSection);

// Fix Twitter titles as well
const twitterSection = `  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://autovis.ai/gemini-remover">
  <meta property="twitter:title" content="Gemini Watermark Remover - Công cụ xoá watermark không giảm chất lượng">
  <meta property="twitter:description" content="Tự động xoá mờ logo Gemini và watermark từ ảnh với công nghệ AI tiên tiến từ Autovis.">
  <meta property="twitter:image" content="https://upload.shortspin.ai/data/c208da3b-8bf6-4b49-8330-7b43f6288f1d.png">`;

content = content.replace(/<meta property="twitter:card"[\s\S]*?<meta property="twitter:image"[\s\S]*?>/, twitterSection);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated title and fixed encoding issues.');
