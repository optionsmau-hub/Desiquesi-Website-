import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Star, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IG_URL, WA_URL } from "@/lib/desi";

const HERO_IMG = "https://media.base44.com/images/public/user_6ac53815d6dfec4581b91faf/33f059d29_Quesillo.jpg";

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="flex items-center justify-between">
          <span className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Desi<span className="text-primary">Quesi</span>
          </span>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            <Instagram className="w-4 h-4" /> @desi_quesi
          </a>
        </div>

        <div className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-2 sm:items-center">
          <div className="order-2 sm:order-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-foreground/70">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" /> Quesillo venezolano hecho en casa
            </div>
            <h1 className="mt-4 font-heading text-5xl leading-[1.05] font-semibold text-foreground text-balance sm:text-6xl">
              El verdadero sabor venezolano, ahora más cerca.
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground/75">
              Quesillo tradicional y con decorado, preparado a mano con la receta de siempre. Hecho en casa y entregado con cariño en todo el DMV.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/pedir" className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.65)] hover:brightness-105 active:scale-[0.98] transition">
                <MessageCircle className="w-5 h-5" /> Pedir ahora
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-14 px-7 rounded-full border border-border bg-card text-foreground font-medium hover:bg-secondary transition-colors">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="order-1 sm:order-2">
            <div className="relative mx-auto max-w-sm sm:max-w-none">
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-primary/20 blur-2xl" />
              <div className="overflow-hidden rounded-[2rem] ring-1 ring-black/5 shadow-[0_30px_60px_-20px_rgba(61,38,22,0.4)]">
                <Image src={HERO_IMG} alt="Quesillo tradicional venezolano con caramelo sobre un plato blanco" className="aspect-[4/5] w-full" fittingType="cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
