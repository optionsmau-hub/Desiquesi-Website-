import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, MessageCircle, Clock, Shield } from "lucide-react";
import { IG_URL, WA_URL, DELIVERY_TEXT } from "@/lib/desi";

export default function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <span className="font-heading text-3xl font-semibold">
              Desi<span className="text-accent">Quesi</span>
            </span>
            <p className="mt-3 text-background/70 leading-relaxed max-w-xs">
              Quesillo venezolano hecho en casa, con el sabor de siempre. {DELIVERY_TEXT}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">Contacto</p>
            <ul className="mt-4 space-y-3 text-background/85">
              <li>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                  <MessageCircle className="w-5 h-5" /> WhatsApp: (954) 381-9451
                </a>
              </li>
              <li>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                  <Instagram className="w-5 h-5" /> @desi_quesi
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5" /> {DELIVERY_TEXT}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-5 h-5" /> Sábado y domingo, 11:00 a.m. – 7:00 p.m.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">Pide ahora</p>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/pedir" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-6 hover:brightness-105 transition">
                <MessageCircle className="w-4 h-4" /> Armar pedido
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-background/20 px-6 font-medium hover:bg-background/10 transition">
                <MessageCircle className="w-4 h-4" /> WhatsApp directo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-background/55">
          <p>© {new Date().getFullYear()} DesiQuesi. Hecho con cariño en casa.</p>
          <div className="flex items-center gap-4">
            <span>Quesillo venezolano · DMV</span>
            <Link to="/admin" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <Shield className="w-3.5 h-3.5" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
