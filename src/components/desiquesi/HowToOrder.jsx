import React from "react";
import { Instagram, MapPin, Clock, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { IG_URL, WA_URL, DELIVERY_TEXT } from "@/lib/desi";

const steps = [
  { n: "1", title: "Escoge", text: "Elige tu quesillo tradicional o con decorado del menú." },
  { n: "2", title: "Escríbenos", text: "Arma tu pedido y envíaselo a Desi por WhatsApp o Instagram." },
  { n: "3", title: "Disfruta", text: "Coordinamos la entrega en el DMV o lo recoges con nosotros." },
];

export default function HowToOrder() {
  return (
    <section id="como-ordenar" className="bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Cómo ordenar</p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-foreground sm:text-5xl">Tu camino al antojo</h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl bg-card p-6 ring-1 ring-black/5 shadow-sm">
              <span className="font-heading text-5xl font-semibold text-primary/25">{s.n}</span>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-foreground/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="block hover:-translate-y-0.5 transition">
            <div className="flex items-start gap-3 rounded-2xl bg-card p-4 ring-1 ring-black/5 h-full">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"><MessageCircle className="w-5 h-5" /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">WhatsApp</p>
                <p className="mt-0.5 font-medium text-foreground">(954) 381-9451</p>
              </div>
            </div>
          </a>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="block hover:-translate-y-0.5 transition">
            <div className="flex items-start gap-3 rounded-2xl bg-card p-4 ring-1 ring-black/5 h-full">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"><Instagram className="w-5 h-5" /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Instagram</p>
                <p className="mt-0.5 font-medium text-foreground">@desi_quesi</p>
              </div>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-2xl bg-card p-4 ring-1 ring-black/5 h-full">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"><MapPin className="w-5 h-5" /></span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Entrega</p>
              <p className="mt-0.5 font-medium text-foreground leading-snug">{DELIVERY_TEXT}</p>
            </div>
          </div>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-sm text-foreground/60 text-center">
          <Clock className="w-4 h-4" /> Sábado y domingo, 11:00 a.m. – 7:00 p.m. · Sin cargo por entrega.
        </p>

        <div className="mt-8 text-center">
          <Link to="/pedir" className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary px-8 text-primary-foreground font-semibold shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.65)] hover:brightness-105 active:scale-[0.98] transition">
            <MessageCircle className="w-5 h-5" /> Armar mi pedido
          </Link>
        </div>
      </div>
    </section>
  );
}
