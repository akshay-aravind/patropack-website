import { useLenis } from './lib/useLenis'
import { useHashRoute } from './lib/useHashRoute'
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
import QuotePage from './pages/QuotePage'

export default function App() {
  const route = useHashRoute()
  const onQuotePage = route.name === 'quote'

  // Smooth scrolling suits the marketing page; the order builder is a form-led
  // app screen where native scrolling is more predictable.
  useLenis(!onQuotePage)

  if (onQuotePage) {
    return (
      <>
        <QuotePage productId={route.param} />
        <Footer />
      </>
    )
  }

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
