import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import ShopPreview from '../components/ShopPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <ShopPreview />
      <Services />
      <About />
      <Contact />
    </>
  );
}
