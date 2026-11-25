import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import { SnsFloat } from "../_components/SnsFloat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SnsFloat />
    </>
  );
}
