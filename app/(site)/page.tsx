import { Hero } from "../_components/Hero";
import { About, Education, Mission, News, Sermons, Worship } from "../_components/Sections";
import { Vision } from "../_components/Vision";

export default function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <About />
      <Worship />
      <Sermons />
      <News />
      <Education />
      <Mission />
    </>
  );
}
