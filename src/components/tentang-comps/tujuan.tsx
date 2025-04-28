import {
  BookOpen,
  Target,
  Users,
  CheckCircle,
} from "lucide-react";

const Tujuan = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary mb-4">Tujuan Kami</h2>
        <div className="w-16 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex">
          <CheckCircle className="text-green-500 mr-4 h-6 w-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Sistem Pengaduan yang Efektif
            </h3>
            <p className="text-gray-600">
              Menyediakan sistem pengaduan yang mudah, cepat, dan transparan
              bagi seluruh warga sekolah.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex">
          <Users className="text-primary mr-4 h-6 w-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Partisipasi Aktif</h3>
            <p className="text-gray-600">
              Mendorong partisipasi aktif masyarakat sekolah dalam membangun
              kualitas layanan pendidikan.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex">
          <Target className="text-red-500 mr-4 h-6 w-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Penanganan Efektif</h3>
            <p className="text-gray-600">
              Meningkatkan efektivitas penanganan laporan, dengan meminimalkan
              duplikasi dan memastikan setiap laporan ditangani oleh pihak yang
              tepat.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex">
          <BookOpen className="text-yellow-500 mr-4 h-6 w-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Budaya Sekolah Inklusif
            </h3>
            <p className="text-gray-600">
              Mendukung terciptanya budaya sekolah yang inklusif, adil, dan
              bertanggung jawab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tujuan;
