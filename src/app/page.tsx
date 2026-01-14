import Hero from "./components/home/Hero";

import Services from "./components/home/Services";
import Testimonials from "./components/home/Testimonials";
import WhyChooseUs from "./components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
