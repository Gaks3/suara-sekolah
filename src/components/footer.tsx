const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-6">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 font-semibold mb-4 text-center">
          <a href="/" className="text-black text-base hover:text-blue-600 transition">PRIVACY</a>
          <a href="/" className="text-black text-base hover:text-blue-600 transition">BERANDA</a>
          <a href="/tentang-kami" className="text-black text-base hover:text-blue-600 transition">KETENTUAN LAYANAN</a>
          <a href="/tentang-kami" className="text-black text-base hover:text-blue-600 transition">TENTANG KAMI</a>
          <a href="/faq" className="text-black text-base hover:text-blue-600 transition">FAQ</a>
          <a href="/" className="text-black text-base hover:text-blue-600 transition">HUBUNGI KAMI</a>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">©2025 Suara Sekolah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
