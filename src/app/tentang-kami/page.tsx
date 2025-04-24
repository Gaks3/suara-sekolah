import Carakerja from "@/components/tentang-comps/cara-kerja";
import Hero from "@/components/tentang-comps/hero";
import Main from "@/components/tentang-comps/main-content";
import Nilai from "@/components/tentang-comps/nilai";
import Pengaduan from "@/components/tentang-comps/pengaduan";
import Tujuan from "@/components/tentang-comps/tujuan";

const TentangKami = () => {
  return (
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Hero />
          <Main />
          <Tujuan />
          <Pengaduan />
          <Nilai />
          <Carakerja />
        </div>
      </main>
  );
};

export default TentangKami;
