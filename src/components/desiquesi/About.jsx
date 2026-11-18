import React from "react";
import { Image } from "@/components/ui/image";

const ABOUT_IMG = "https://media.base44.com/images/public/user_6ac53815d6dfec4581b91faf/6e68aa34d_QuesilloconOreo.jpg";

export default function About() {
  return (
    <section id="historia" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
        <div className="relative order-2 sm:order-1">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent/15 blur-xl" />
          <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-black/5 shadow-lg">
            <Image
              src={ABOUT_IMG}
              alt="Quesillo decorado con galletas y dulce de leche sobre una mesa de madera"
              className="aspect-square w-full"
              fittingType="cover"
            />
          </div>
        </div>

        <div className="order-1 sm:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Nuestra historia</p>
          <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Hecho en casa, con la receta de la abuela
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/75">
            <p>
              DesiQuesi nació del amor por un postre que sabe a infancia: el quesillo venezolano. Cada uno se prepara a mano, lentamente, con huevos, leche condensada y un caramelo que se cocina al punto justo.
            </p>
            <p>
              Desde nuestra cocina en Montgomery County, Maryland, llevamos este pedacito de Venezuela a tu mesa — tradicional, con decorado, y siempre con el mismo sabor de casa.
            </p>
          </div>
          <p className="mt-6 font-heading text-2xl italic text-primary">— Desi, la que hornea con cariño</p>
        </div>
      </div>
    </section>
  );
}
