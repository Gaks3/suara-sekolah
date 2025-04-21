import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Selamat Datang di Suara Sekolah</h1>
          <p className="mt-4 text-gray-600">Platform untuk menyampaikan aspirasi siswa.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
