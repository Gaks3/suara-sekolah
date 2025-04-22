"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Navbar from "../../components/navbar"

const faqData = [
  {
    id: "1",
    question: "Apa itu Suara Sekolah?",
    answer:
      "Suara Sekolah adalah platform pengaduan dan aspirasi digital yang dirancang untuk memfasilitasi seluruh warga sekolah – siswa, guru, orang tua, hingga staf – dalam menyampaikan keluhan, saran, atau masukan terkait layanan dan kondisi sekolah.",
  },
  {
    id: "2",
    question: "Siapa saja yang bisa menggunakan Suara Sekolah?",
    answer:
      "Semua warga sekolah bisa menggunakan platform ini, termasuk siswa, guru, tenaga kependidikan, kepala sekolah, hingga orang tua/wali murid.",
  },
  {
    id: "3",
    question: "Jenis laporan seperti apa yang bisa disampaikan?",
    answer:
      "Laporan dapat mencakup berbagai hal seperti fasilitas sekolah yang rusak, pelayanan guru yang tidak maksimal, tindakan perundungan (bullying), usulan kegiatan, ketidakadilan dalam perlakuan, hingga saran pengembangan sekolah.",
  },
  {
    id: "4",
    question: "Apakah laporan saya akan ditanggapi?",
    answer:
      "Ya. Setiap laporan yang masuk akan ditindaklanjuti oleh pihak yang berwenang di lingkungan sekolah. Kami menjamin laporan tidak akan diabaikan dan akan diproses secara adil dan profesional.",
  },
  {
    id: "5",
    question: "Apakah identitas saya akan dirahasiakan?",
    answer:
      "Keamanan dan kerahasiaan data pelapor adalah prioritas kami. Anda juga bisa memilih untuk menyampaikan laporan secara anonim, tanpa mencantumkan identitas pribadi.",
  },
  {
    id: "6",
    question: "Apakah semua laporan akan langsung dipublikasikan?",
    answer:
      "Tidak. Laporan akan melalui proses verifikasi terlebih dahulu untuk memastikan kebenaran dan kelayakannya. Hanya laporan yang telah diverifikasi yang akan diproses dan, bila perlu, dipublikasikan secara terbatas.",
  },
  {
    id: "7",
    question: "Apa manfaat menggunakan Suara Sekolah?",
    answer:
      "Dengan adanya Suara Sekolah, proses penyampaian dan penanganan laporan menjadi lebih cepat, tertib, dan transparan. Ini akan membantu menciptakan lingkungan sekolah yang lebih baik, aman, dan mendukung proses belajar yang berkualitas.",
  },
]

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Temukan jawaban untuk pertanyaan umum tentang Suara Sekolah
          </p>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <Accordion type="single" collapsible defaultValue="1" className="w-full space-y-4">
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-lg font-medium text-gray-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <p className="text-base text-gray-600">
            Masih punya pertanyaan lain?{" "}
            <a
              href="/contact"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Hubungi kami
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
