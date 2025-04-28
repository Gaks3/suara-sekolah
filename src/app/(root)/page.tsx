import FormLaporan from "@/components/beranda/form-laporan";
import Herofor from "@/components/beranda/herofor";
import ProsesFlow from "@/components/beranda/proses-flow";
import Quantity from "@/components/beranda/quantity";
import DetailLaporan from "@/components/beranda/detail-laporan";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto">
        <Herofor />
        <FormLaporan />
        <ProsesFlow />
        <Quantity />
        <DetailLaporan />
      </main>
    </div>
  );
}
