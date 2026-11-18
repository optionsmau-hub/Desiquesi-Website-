import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, RefreshCw, MapPin, Phone, Calendar, Clock, Package } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ORDER_STATUSES } from "@/lib/desi";

const statusStyles = {
  Pendiente: "bg-amber-100 text-amber-800",
  Confirmado: "bg-sky-100 text-sky-800",
  Entregado: "bg-emerald-100 text-emerald-800",
};

export default function Admin() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me && me.role === "admin") {
          await loadOrders();
        }
      } catch {
        setUser(null);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const page = await base44.entities.Order.filter({}, { sort: "-created_date", limit: 50 });
      setOrders(page.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await base44.entities.Order.update(id, { status });
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-secondary border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <ShieldAlert className="mx-auto w-12 h-12 text-primary" />
        <h1 className="mt-4 font-heading text-3xl font-semibold">Acceso restringido</h1>
        <p className="mt-2 text-foreground/70">Esta página es solo para el administrador de DesiQuesi.</p>
        <Link to="/" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 font-semibold text-primary-foreground">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold">Pedidos</h1>
          <p className="text-foreground/60">Gestiona los pedidos y su estado.</p>
        </div>
        <button onClick={loadOrders} disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium hover:bg-secondary transition">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Actualizar
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center text-foreground/60">
          {loading ? "Cargando pedidos..." : "Aún no hay pedidos."}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <article key={o.id} className="rounded-2xl bg-card p-5 ring-1 ring-black/5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-xl font-semibold">{o.customer_name}</p>
                  <p className="text-sm text-foreground/60">{new Date(o.created_date).toLocaleString("es-VE")}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[o.status] || "bg-secondary"}`}>{o.status}</span>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-foreground/75 sm:grid-cols-2">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {o.phone}</p>
                {o.email && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {o.email}</p>}
                <p className="flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> {o.delivery_type}</p>
                {o.desired_datetime && <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {o.desired_datetime}</p>}
              </div>

              {o.delivery_type === "Entrega a domicilio" && o.address && (
                <p className="mt-2 flex items-start gap-2 text-sm text-foreground/75">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary" /> {o.address}, {o.city}, {o.state} {o.zip}
                </p>
              )}

              <div className="mt-4 rounded-xl bg-secondary/50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Productos</p>
                <ul className="mt-1 space-y-0.5 text-sm">
                  {(o.items || []).map((it, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{it.qty}x {it.name}</span>
                      <span className="font-medium">${it.subtotal}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
                  <span>Total</span><span>${o.total}</span>
                </p>
              </div>

              {o.notes && <p className="mt-2 text-sm text-foreground/70"><span className="font-medium">Notas:</span> {o.notes}</p>}

              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm font-medium text-foreground/70">Cambiar estado:</span>
                <Select value={o.status} onValueChange={(v) => handleStatus(o.id, v)} disabled={updatingId === o.id}>
                  <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
