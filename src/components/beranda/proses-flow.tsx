import { RefreshCw, FileText, Check } from "lucide-react";

export default function ProsesFlow() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50 rounded-xl">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center text-center mb-8 md:mb-0">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-6 flex items-center justify-center w-24 h-24 shadow-lg">
            <RefreshCw className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-semibold text-lg mt-4 text-primary">
            Proses Verifikasi
          </h3>
          <p className="text-center max-w-[250px] mt-2">
            Dalam 3 hari, laporan Anda akan diverifikasi dan diteruskan kepada
            instansi berwenang
          </p>
        </div>

        <div className="hidden md:block w-24 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"></div>

        <div className="flex flex-col items-center text-center mb-8 md:mb-0">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-6 flex items-center justify-center w-24 h-24 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-semibold text-lg mt-4 text-purple-600">
            Tindak Lanjut
          </h3>
          <p className="text-center max-w-[250px] mt-2">
            Dalam 5 hari, instansi akan menindaklanjuti dan membalas laporan
            Anda
          </p>
        </div>

        <div className="hidden md:block w-24 h-[2px] bg-gradient-to-r from-purple-500 to-teal-500"></div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-full p-6 flex items-center justify-center w-24 h-24 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-semibold text-lg mt-4 text-teal-600">Selesai</h3>
          <p className="text-center max-w-[250px] mt-2">
            Laporan Anda akan terus ditindaklanjuti hingga terselesaikan
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <a href="/tentang-kami" className="px-4 py-2 rounded-lg border-2 border-blue-700 text-primary hover:bg-primary hover:text-white transition">
          Pelajari Lebih Lanjut
        </a>
      </div>
    </div>
  );
}
