import React from "react";
import "style.css";
import "tailwindcss/dist/base.css";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from "components/hero/TwoColumnWithVideo";
import Footer from "components/footers/MiniCenteredFooter";
import Cards from "components/cards/ThreeColSlider";

function App() {
  return (
    <AnimationRevealPage>
      <Hero />
      <Cards />
      <Footer />
    </AnimationRevealPage>
  );
}

export default App;
