import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { About, Education, Mission, News, Sermons, Worship } from "./_components/Sections";
import { Vision } from "./_components/Vision";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Vision />
        <About />
        <Worship />
        <Sermons />
        <News />
        <Education />
        <Mission />
      </main>
      <Footer />
    </>
  );
}
