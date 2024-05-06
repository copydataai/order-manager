import { Header } from "~/components/Header.tsx";
import { Hero } from "~/components/Hero.tsx";
import { Footer } from "~/components/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}

export default App;
