import { useLenis } from './lib/useLenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import RetailBoxes from './components/RetailBoxes'
import FlexiblePouches from './components/FlexiblePouches'
import Specifications from './components/Specifications'
import Industries from './components/Industries'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  useLenis()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <RetailBoxes />
        <FlexiblePouches />
        <Specifications />
        <Industries />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
