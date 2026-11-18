// Shared constants for the DesiQuesi site
export const IG_URL = "https://instagram.com/desi_quesi";
export const WA_NUMBER = "19543819451";
export const WA_MSG = "Hola, quiero hacer un pedido de DesiQuesi";
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

export const DELIVERY_TEXT = "Entregas en todo el DMV: Maryland, Virginia y Washington DC.";

const IMG = {
  tradicionalCompleto: "https://media.base44.com/images/public/user_6ac53815d6dfec4581b91faf/33f059d29_Quesillo.jpg",
  tradicionalPequeno: "https://media.base44.com/images/public/6ad14e5df91bbfdf24f0ccab/81e11e10a_PQ.jpg",
  decoradoCompleto: "https://media.base44.com/images/public/user_6ac53815d6dfec4581b91faf/4a3e5d80f_b89d3ce2-3466-4377-8c3b-37045cfb28bc.jpg",
  decoradoPequeno: "https://media.base44.com/images/public/user_6ac53815d6dfec4581b91faf/6e68aa34d_QuesilloconOreo.jpg",
};

export const PRODUCT_GROUPS = [
  {
    title: "Tradicional",
    note: "El clásico de siempre — suave, cremoso y bañado en caramelo.",
    items: [
      { id: "trad-completo", name: "Quesillo Tradicional Completo", desc: "Para compartir en familia. Rinde de 8 a 10 porciones.", price: 20, img: IMG.tradicionalCompleto },
      { id: "trad-pequeno", name: "Quesillo Tradicional Pequeño", desc: "Ideal para dos. Mismo sabor, tamaño perfecto.", price: 12, img: IMG.tradicionalPequeno },
    ],
  },
  {
    title: "Con decorado",
    note: "El tradicional que amas, con toppings de fresa, Oreo, dulce de leche y pirulín.",
    items: [
      { id: "dec-completo", name: "Quesillo con Decorado Completo", desc: "Decorado a mano con tus toppings favoritos.", price: 25, img: IMG.decoradoCompleto },
      { id: "dec-pequeno", name: "Quesillo con Decorado Pequeño", desc: "Versión pequeña, decorada con el mismo cariño.", price: 15, img: IMG.decoradoPequeno },
    ],
  },
];

export const ALL_PRODUCTS = PRODUCT_GROUPS.flatMap((g) => g.items);

export const ORDER_STATUSES = ["Pendiente", "Confirmado", "Entregado"];
