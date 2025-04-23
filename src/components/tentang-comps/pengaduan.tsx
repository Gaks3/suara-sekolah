import {
  Share2
} from "lucide-react";

const Pengaduan = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
      <div className="p-8">
        <div className="flex items-start">
          <Share2 className="text-purple-600 mr-4 h-8 w-8 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Kanal Pengaduan
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Laporan bisa disampaikan melalui berbagai kanal seperti website
              resmi Suara Sekolah, aplikasi mobile, maupun media sosial yang
              terintegrasi dengan sistem kami. Setiap laporan akan
              ditindaklanjuti secara profesional dan dijaga kerahasiaannya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengaduan;
