const laporanInstansi = [
    { nama: "Guru", jumlah: 120 },
    { nama: "Tata Usaha", jumlah: 75 },
    { nama: "Bimbingan Konseling", jumlah: 43 },
    { nama: "Kesiswaan", jumlah: 58 },
    { nama: "Kepala Sekolah", jumlah: 32 },
    { nama: "Badan Kebersihan", jumlah: 89 },
    { nama: "Keamanan", jumlah: 47 },
    { nama: "Sarpras", jumlah: 66 },
];

const DetailLaporan = () => {
    return (
        <div className="w-full py-10 px-4 bg-gray-100">
            <h2 className="text-2xl font-bold text-center mb-6">Detail Laporan Masuk</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {laporanInstansi.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-primary">{item.jumlah}</div>
                        <div className="mt-2 text-gray-600 font-medium">{item.nama}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailLaporan;
