import {
    ClipboardList,
    Search,
    UserCheck,
    FileText,
    CheckSquare,
    BarChart, 
  } from "lucide-react";

const Carakerja = () => {
    return (
<div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Bagaimana Cara Kerja Kami
              </h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Suara Sekolah memiliki alur kerja yang sistematis untuk
                memastikan setiap laporan ditangani dengan baik, dari awal
                pengaduan hingga penyelesaian masalah.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line for timeline on larger screens */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right order-2 md:order-1">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="font-semibold text-lg mb-2 text-blue-700">
                        Penerimaan Laporan
                      </h3>
                      <p className="text-gray-600">
                        Warga sekolah dapat menyampaikan laporan melalui
                        berbagai kanal yang tersedia. Setiap laporan akan
                        diberikan nomor tiket unik untuk memudahkan pelacakan.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-blue-500 rounded-full p-3 z-10">
                      <ClipboardList className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pl-8 order-2">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="font-semibold text-lg mb-2 text-blue-700">
                        Verifikasi dan Klasifikasi
                      </h3>
                      <p className="text-gray-600">
                        Tim kami akan memverifikasi dan mengklasifikasikan
                        laporan berdasarkan jenis, urgensi, dan unit yang
                        bertanggung jawab untuk menanganinya.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-end order-1 mb-4 md:mb-0">
                    <div className="bg-green-500 rounded-full p-3 z-10">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right order-2 md:order-1">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="font-semibold text-lg mb-2 text-blue-700">
                        Penyaluran ke Pihak Terkait
                      </h3>
                      <p className="text-gray-600">
                        Laporan akan diteruskan kepada pihak yang berwenang
                        untuk ditindaklanjuti, baik itu kepala sekolah, guru,
                        atau unit terkait lainnya.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-yellow-500 rounded-full p-3 z-10">
                      <UserCheck className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pl-8 order-2">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="font-semibold text-lg mb-2 text-blue-700">
                        Penanganan dan Solusi
                      </h3>
                      <p className="text-gray-600">
                        Pihak yang berwenang akan menangani laporan dan
                        memberikan solusi atau tindakan perbaikan yang
                        diperlukan.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-end order-1 mb-4 md:mb-0">
                    <div className="bg-purple-500 rounded-full p-3 z-10">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right order-2 md:order-1">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="font-semibold text-lg mb-2 text-blue-700">
                        Penutupan Laporan
                      </h3>
                      <p className="text-gray-600">
                        Setelah masalah terselesaikan, laporan akan ditutup dan
                        pelapor akan diberitahu tentang hasil penanganan.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-red-500 rounded-full p-3 z-10">
                      <CheckSquare className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pl-8 order-2">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="font-semibold text-lg mb-2 text-blue-700">
                        Evaluasi dan Peningkatan
                      </h3>
                      <p className="text-gray-600">
                        Kami secara berkala mengevaluasi laporan yang masuk
                        untuk mengidentifikasi pola dan melakukan perbaikan
                        sistemik untuk mencegah masalah serupa terulang.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-end order-1 mb-4 md:mb-0">
                    <div className="bg-blue-700 rounded-full p-3 z-10">
                      <BarChart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
 }

 export default Carakerja;