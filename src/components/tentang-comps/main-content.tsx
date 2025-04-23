import {
  BookOpen,
  MessageSquare,
  Target,
  Users,
  CheckCircle,
  Share2,
  ShieldCheck,
  ClipboardList,
  Zap,
  Search,
  UserCheck,
  FileText,
  CheckSquare,
  BarChart,
} from "lucide-react";

const Main = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
      <div className="p-8">
        <div className="flex items-start mb-6">
          <MessageSquare className="text-blue-600 mr-4 h-8 w-8 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Suara Sekolah
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Suara Sekolah adalah platform pengaduan dan aspirasi yang
              dirancang untuk mewadahi suara seluruh warga sekolah – baik siswa,
              guru, tenaga kependidikan, maupun orang tua – dalam menyampaikan
              masukan, keluhan, atau ide-ide perbaikan terkait layanan
              pendidikan dan lingkungan sekolah.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kami memahami bahwa komunikasi dua arah yang terbuka antara warga
              sekolah dan pihak penyelenggara pendidikan merupakan kunci dalam
              menciptakan suasana belajar yang sehat, aman, dan berkualitas.
              Namun seringkali, aspirasi dan pengaduan yang ada belum terkelola
              secara efektif dan tidak tersalurkan ke pihak yang tepat.
              Akibatnya, banyak masalah berulang tanpa solusi yang tuntas.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Untuk itu, Suara Sekolah hadir sebagai solusi satu pintu dalam
              pengelolaan pengaduan dan aspirasi di lingkungan sekolah. Dengan
              mengadopsi semangat dan prinsip dari SP4N-LAPOR!, platform ini
              dibangun agar semua laporan, dari manapun dan tentang apapun, bisa
              disalurkan kepada pihak yang berwenang secara cepat, tepat, dan
              terkoordinasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
