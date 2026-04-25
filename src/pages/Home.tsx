import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import Contact from '../components/sections/Contact';
import QRCodeSection from '../components/sections/QRCodeSection';
import Announcements from '../components/sections/Announcements';

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden relative">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <QRCodeSection />
      <Contact />
      <Announcements />
    </div>
  );
}
