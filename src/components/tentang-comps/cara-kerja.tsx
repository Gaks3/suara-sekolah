"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ClipboardList, Search, UserCheck, FileText, CheckSquare, BarChart } from "lucide-react"

const Carakerja = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Bagaimana Cara Kerja Kami</h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Suara Sekolah memiliki alur kerja yang sistematis untuk memastikan setiap laporan ditangani dengan baik, dari
          awal pengaduan hingga penyelesaian masalah.
        </p>
      </motion.div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>

        <div className="space-y-1">
          <WorkflowItem
            title="Penerimaan Laporan"
            description="Warga sekolah dapat menyampaikan laporan melalui berbagai kanal yang tersedia. Setiap laporan akan diberikan nomor tiket unik untuk memudahkan pelacakan."
            icon={<ClipboardList className="h-8 w-8 text-white" />}
            iconBgColor="bg-blue-500"
            isLeft={true}
            delay={0.1}
          />

          <WorkflowItem
            title="Verifikasi dan Klasifikasi"
            description="Tim kami akan memverifikasi dan mengklasifikasikan laporan berdasarkan jenis, urgensi, dan unit yang bertanggung jawab untuk menanganinya."
            icon={<Search className="h-8 w-8 text-white" />}
            iconBgColor="bg-green-500"
            isLeft={false}
            delay={0.2}
          />

          <WorkflowItem
            title="Penyaluran ke Pihak Terkait"
            description="Laporan akan diteruskan kepada pihak yang berwenang untuk ditindaklanjuti, baik itu kepala sekolah, guru, atau unit terkait lainnya."
            icon={<UserCheck className="h-8 w-8 text-white" />}
            iconBgColor="bg-yellow-500"
            isLeft={true}
            delay={0.3}
          />

          <WorkflowItem
            title="Penanganan dan Solusi"
            description="Pihak yang berwenang akan menangani laporan dan memberikan solusi atau tindakan perbaikan yang diperlukan."
            icon={<FileText className="h-8 w-8 text-white" />}
            iconBgColor="bg-purple-500"
            isLeft={false}
            delay={0.4}
          />

          <WorkflowItem
            title="Penutupan Laporan"
            description="Setelah masalah terselesaikan, laporan akan ditutup dan pelapor akan diberitahu tentang hasil penanganan."
            icon={<CheckSquare className="h-8 w-8 text-white" />}
            iconBgColor="bg-red-500"
            isLeft={true}
            delay={0.5}
          />

          <WorkflowItem
            title="Evaluasi dan Peningkatan"
            description="Kami secara berkala mengevaluasi laporan yang masuk untuk mengidentifikasi pola dan melakukan perbaikan sistemik untuk mencegah masalah serupa terulang."
            icon={<BarChart className="h-8 w-8 text-white" />}
            iconBgColor="bg-blue-700"
            isLeft={false}
            delay={0.6}
          />
        </div>
      </div>
    </div>
  )
}

interface WorkflowItemProps {
  title: string
  description: string
  icon: React.ReactNode
  iconBgColor: string
  isLeft: boolean
  delay: number
}

const WorkflowItem = ({ title, description, icon, iconBgColor, isLeft, delay }: WorkflowItemProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div className="relative flex flex-col md:flex-row items-center" ref={ref}>
      {isLeft ? (
        <>
          <motion.div
            className="md:w-1/2 md:pr-8 md:text-right order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-2 mb-4 md:mb-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <div className={`${iconBgColor} rounded-full p-3 z-10`}>{icon}</div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            className="md:w-1/2 md:pl-8 order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center md:justify-end order-1 mb-4 md:mb-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <div className={`${iconBgColor} rounded-full p-3 z-10`}>{icon}</div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default Carakerja
