import FormLaporan from "@/components/beranda/form-laporan";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Herofor from "@/components/beranda/herofor";
import ProsesFlow from "@/components/beranda/proses-flow";
import Quantity from "@/components/beranda/quantity";
import DetailLaporan from "@/components/beranda/detail-laporan";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Herofor />
      <FormLaporan />
      <ProsesFlow />
      <Quantity />
      <DetailLaporan />
      <Footer />
    </div>
  );
}
