import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Image } from "@/components/ui/image";
import { PRODUCT_GROUPS } from "@/lib/desi";

function ProductCard({ item }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/5 shadow-sm transition hover:shadow-xl hover:-translate-y-0.5 duration-300">
      <div className="relative">
        <Image src={item.img} alt={item.name} className="aspect-[4/3] w-full" fittingType="cover" />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-foreground text-background px-3 py-1 text-sm font-semibold shadow-md">
          ${item.price}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-semibold text-foreground">{item.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/65 flex-1">{item.desc}</p>
        <Link
          to="/pedir"
          className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-105 active:scale-[0.98] transition"
        >
          <ShoppingBag className="w-4 h-4" /> Hacer pedido
        </Link>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="productos" className="bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">El menú</p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-foreground sm:text-5xl">Nuestros quesillos</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Dos categorías, un mismo sabor de casa. Arma tu pedido y lo enviamos por WhatsApp.
          </p>
        </div>

        {PRODUCT_GROUPS.map((group) => (
          <div key={group.title} className="mt-12 sm:mt-16">
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="font-heading text-3xl font-semibold text-foreground">{group.title}</h3>
              <p className="text-sm text-foreground/60 max-w-md">{group.note}</p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {group.items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
