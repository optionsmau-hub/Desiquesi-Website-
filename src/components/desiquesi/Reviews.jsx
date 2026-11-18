import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Verónica", quote: "¡Muy rico el postre! 10/10. Gracias 🫶" },
  { name: "Lucía", quote: "Buenos días ☀️🍮 Gracias amiga por este delicioso postre." },
  { name: "Génesis", quote: "¡Omg, esto está riquísimo! Siempre que hagas quiero pedir, lo amé 😊" },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="testimonios" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Testimonios</p>
        <h2 className="mt-3 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Lo que dicen quienes ya probaron
        </h2>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="relative flex flex-col rounded-3xl bg-card p-6 ring-1 ring-black/5 shadow-sm"
          >
            <Quote className="w-8 h-8 text-accent/60" />
            <blockquote className="mt-3 font-heading text-xl italic leading-snug text-foreground/85">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center justify-between">
              <span className="font-semibold text-foreground">{r.name}</span>
              <Stars />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
