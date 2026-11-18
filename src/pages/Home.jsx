import React from "react";
import Hero from "@/components/desiquesi/Hero";
import About from "@/components/desiquesi/About";
import Products from "@/components/desiquesi/Products";
import Reviews from "@/components/desiquesi/Reviews";
import HowToOrder from "@/components/desiquesi/HowToOrder";
import SiteFooter from "@/components/desiquesi/SiteFooter";
import StickyCTA from "@/components/desiquesi/StickyCTA";

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      <Hero />
      <About />
      <Products />
      <Reviews />
      <HowToOrder />
      <SiteFooter />
      <StickyCTA />
    </div>
  );
}
