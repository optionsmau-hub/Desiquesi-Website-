import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image } from "@/components/ui/image";
import { ALL_PRODUCTS, IG_URL, WA_NUMBER } from "@/lib/desi";

const emptyForm = {
  customer_name: "",
  phone: "",
  email: "",
  delivery_type: "Recoger",
  address: "",
  city: "",
  state: "Maryland",
  zip: "",
  desired_datetime: "",
  notes: "",
};

export default function Pedir() {
  const [quantities, setQuantities] = useState({});
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const items = ALL_PRODUCTS.map((p) => ({
    ...p,
    qty: quantities[p.id] || 0,
    subtotal: (quantities[p.id] || 0) * p.price,
  })).filter((i) => i.qty > 0);

  const total = items.reduce((sum, i) => sum + i.subtotal, 0);

  const setQty = (id, qty) => {
    const q = Math.max(0, Math.min(20, Number(qty) || 0));
    setQuantities((prev) => ({ ...prev, [id]: q }));
  };

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (items.length === 0) e.cart = "Agrega al menos un producto.";
    if (!form.customer_name.trim()) e.customer_name = "Ingresa tu nombre.";
    if (!form.phone.trim()) e.phone = "Ingresa tu teléfono.";
    if (form.delivery_type === "Entrega a domicilio") {
      if (!form.address.trim()) e.address = "Ingresa la dirección.";
      if (!form.city.trim()) e.city = "Ingresa la ciudad.";
      if (!form.zip.trim()) e.zip = "Ingresa el código postal.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = (order) => {
    const lines = ["*Nuevo pedido — DesiQuesi*", ""];
    lines.push("*Productos:*");
    order.items.forEach((it) => {
      lines.push(`• ${it.qty}x ${it.name} — $${it.subtotal}`);
    });
    lines.push(`*Total: $${order.total}*`, "");
    lines.push("*Datos del cliente:*");
    lines.push(`Nombre: ${form.customer_name}`);
    lines.push(`Teléfono: ${form.phone}`);
    if (form.email.trim()) lines.push(`Email: ${form.email}`);
    lines.push(`Entrega: ${form.delivery_type}`);
    if (form.delivery_type === "Entrega a domicilio") {
      lines.push(`Dirección: ${form.address}, ${form.city}, ${form.state} ${form.zip}`);
    }
    if (form.desired_datetime.trim()) lines.push(`Fecha/hora deseada: ${form.desired_datetime}`);
    if (form.notes.trim()) lines.push(`Notas: ${form.notes}`);
    lines.push("", "El pago se coordina por WhatsApp o Zelle.");
    return lines.join("\n");
  };

  const [igNotice, setIgNotice] = useState(false);

  const saveOrder = async () => {
    const orderData = {
      customer_name: form.customer_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      delivery_type: form.delivery_type,
      address: form.delivery_type === "Entrega a domicilio" ? form.address.trim() : null,
      city: form.delivery_type === "Entrega a domicilio" ? form.city.trim() : null,
      state: form.delivery_type === "Entrega a domicilio" ? form.state : null,
      zip: form.delivery_type === "Entrega a domicilio" ? form.zip.trim() : null,
      desired_datetime: form.desired_datetime.trim() || null,
      notes: form.notes.trim() || null,
      items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price, subtotal: i.subtotal })),
      total,
      status: "Pendiente",
    };
    const created = await base44.entities.Order.create(orderData);
    const msg = buildMessage({ ...orderData, items });
    return { created, msg };
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { created, msg } = await saveOrder();
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setSubmitted(created);
    } catch (err) {
      setErrors({ cart: "No se pudo guardar el pedido. Intenta de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInstagram = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { created, msg } = await saveOrder();
      await navigator.clipboard.writeText(msg);
      window.open(IG_URL, "_blank", "noopener,noreferrer");
      setIgNotice(true);
      setSubmitted(created);
    } catch (err) {
      setErrors({ cart: "No se pudo guardar el pedido. Intenta de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="w-9 h-9 text-primary" />
        </div>
        <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground">¡Pedido enviado!</h1>
        <p className="mt-3 text-lg text-foreground/70">
          {igNotice
            ? "Abrimos Instagram y copiamos tu pedido al portapapeles. Pégalo en el chat de @desi_quesi para enviárnoslo."
            : "Abrimos WhatsApp con tu pedido. Si no se abrió, toca el botón para enviarlo. Te confirmamos en breve."}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMessage({ items, total }))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-6"
          >
            <MessageCircle className="w-5 h-5" /> Reenviar por WhatsApp
          </a>
          <Link to="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 font-medium">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 pb-28 md:pb-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver
      </Link>

      <header className="mt-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Carrito</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-foreground sm:text-5xl">Arma tu pedido</h1>
        <p className="mt-3 text-lg text-foreground/70">Elige cuántos quieres de cada uno. El total se actualiza al momento.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Cart */}
        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Productos</h2>
          <div className="mt-4 space-y-3">
            {ALL_PRODUCTS.map((p) => {
              const qty = quantities[p.id] || 0;
              return (
                <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-black/5">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={p.img} alt={p.name} className="h-full w-full" fittingType="cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground leading-tight truncate">{p.name}</p>
                    <p className="text-sm text-primary font-semibold">${p.price}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => setQty(p.id, qty - 1)} disabled={qty === 0} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground disabled:opacity-40 active:scale-95 transition">
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={qty}
                      onChange={(e) => setQty(p.id, e.target.value)}
                      className="h-9 w-12 rounded-lg border border-border bg-background text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button type="button" onClick={() => setQty(p.id, qty + 1)} disabled={qty >= 20} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 active:scale-95 transition">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-foreground text-background px-5 py-4">
            <span className="font-heading text-xl">Total</span>
            <span className="font-heading text-3xl font-semibold">${total}</span>
          </div>
          {errors.cart && <p className="mt-2 text-sm text-destructive">{errors.cart}</p>}
          <p className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
            <ShoppingBag className="w-4 h-4" /> Sin cargo por entrega. El pago se coordina por WhatsApp o Zelle.
          </p>
        </section>

        {/* Form */}
        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Tus datos</h2>
          <div className="mt-4 space-y-4">
            <Field label="Nombre completo" error={errors.customer_name} required>
              <Input value={form.customer_name} onChange={(e) => setField("customer_name", e.target.value)} placeholder="Tu nombre" />
            </Field>
            <Field label="Teléfono" error={errors.phone} required>
              <Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="Tu teléfono" inputMode="tel" />
            </Field>
            <Field label="Email (opcional)">
              <Input value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="tu@email.com" type="email" />
            </Field>
            <Field label="Tipo de entrega" required>
              <Select value={form.delivery_type} onValueChange={(v) => setField("delivery_type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recoger">Recoger</SelectItem>
                  <SelectItem value="Entrega a domicilio">Entrega a domicilio</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {form.delivery_type === "Entrega a domicilio" && (
              <div className="space-y-4 rounded-2xl bg-secondary/50 p-4">
                <Field label="Dirección" error={errors.address} required>
                  <Input value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder="Calle y número" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Ciudad" error={errors.city} required>
                    <Input value={form.city} onChange={(e) => setField("city", e.target.value)} placeholder="Ciudad" />
                  </Field>
                  <Field label="Código postal" error={errors.zip} required>
                    <Input value={form.zip} onChange={(e) => setField("zip", e.target.value)} placeholder="ZIP" inputMode="numeric" />
                  </Field>
                </div>
                <Field label="Estado">
                  <Select value={form.state} onValueChange={(v) => setField("state", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maryland">Maryland</SelectItem>
                      <SelectItem value="Virginia">Virginia</SelectItem>
                      <SelectItem value="Washington DC">Washington DC</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            )}

            <Field label="Fecha y hora deseada">
              <Input value={form.desired_datetime} onChange={(e) => setField("desired_datetime", e.target.value)} placeholder="Ej. Sábado 5 p.m." />
            </Field>
            <Field label="Notas especiales">
              <Textarea value={form.notes} onChange={(e) => setField("notes", e.target.value)} placeholder="Alergias, mensaje en el decorado, etc." rows={3} />
            </Field>

            <div className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-foreground/70">
              El pago se coordina por WhatsApp o Zelle.
            </div>

            <Button onClick={handleSubmit} disabled={submitting} className="h-14 w-full rounded-full bg-primary text-primary-foreground text-base font-semibold">
              <MessageCircle className="w-5 h-5 mr-2" /> {submitting ? "Enviando..." : "Enviar pedido por WhatsApp"}
            </Button>

            <button type="button" onClick={handleInstagram} disabled={submitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card font-medium text-foreground hover:bg-secondary transition disabled:opacity-50">
              <Instagram className="w-4 h-4" /> {submitting ? "Enviando..." : "También por Instagram @desi_quesi"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children, error, required }) {
  return (
    <div>
      <Label className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
