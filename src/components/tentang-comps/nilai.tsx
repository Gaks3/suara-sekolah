import {
  ShieldCheck,
  ClipboardList,
  Zap
} from "lucide-react";

const Nilai = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Nilai-Nilai Kami
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto"></div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-blue-700 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Transparansi</h3>
            <p className="text-gray-600">
              Kami berkomitmen untuk menjaga keterbukaan dalam setiap proses
              penanganan laporan.
            </p>
          </div>

          <div className="p-4">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Akuntabilitas</h3>
            <p className="text-gray-600">
              Setiap tindakan kami dapat dipertanggungjawabkan dengan jelas dan
              terukur.
            </p>
          </div>

          <div className="p-4">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-purple-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Responsif</h3>
            <p className="text-gray-600">
              Kami berkomitmen untuk merespon setiap laporan dengan cepat dan
              efektif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nilai;
