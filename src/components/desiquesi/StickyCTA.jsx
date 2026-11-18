import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";
import { IG_URL } from "@/lib/desi";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="mx-auto max-w-md p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-background via-background/95 to-transparent">
        <div className="flex items-center gap-2.5">
          <Link
            to="/pedir"
            className="flex flex-1 items-center justify-center gap-2 h-14 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.6)] active:scale-[0.98] transition-transform"
          >
            <MessageCircle className="w-5 h-5" /> Pedir por WhatsApp
          </Link>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @desi_quesi"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground active:scale-95 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
