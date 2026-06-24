import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SNEHITHA Jute & Pillow Manzil — Handcrafted Jute Bags & Pillows" },
      { name: "description", content: "Shop handwoven jute bags and cozy pillows from SNEHITHA. Sustainable, handmade, and lovingly crafted." },
    ],
  }),
  component: Storefront,
});

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  quantity: number;
  image_url: string | null;
};

type Contact = {
  shop_name: string;
  tagline: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
};

function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    supabase.from("products").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setProducts(data ?? []));
    supabase.from("contact_info").select("*").limit(1).maybeSingle()
      .then(({ data }) => setContact(data));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {contact?.shop_name ?? "SNEHITHA"}
            </h1>
            <p className="text-xs text-muted-foreground">Jute & Pillow Manzil</p>
          </div>
          <nav className="flex items-center gap-2">
            <a href="#products" className="hidden text-sm font-medium text-foreground/80 hover:text-primary sm:inline-block">Products</a>
            <a href="#contact" className="hidden text-sm font-medium text-foreground/80 hover:text-primary sm:ml-4 sm:inline-block">Contact</a>
            <Link to="/auth" className="ml-4">
              <Button variant="outline" size="sm" className="gap-2">
                <ShieldCheck className="h-4 w-4" /> Admin
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-accent/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground">
              Handcrafted with love
            </span>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Woven jute & dreamy pillows for every home
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              {contact?.tagline ?? "Handcrafted jute bags & cozy pillows"} — sustainably made by skilled artisans, delivered to your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products"><Button size="lg">Shop the collection</Button></a>
              <a href="#contact"><Button variant="outline" size="lg">Get in touch</Button></a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl" />
            <img
              src={heroImg}
              alt="Jute bags and cotton pillows arranged in warm window light"
              width={1024}
              height={1024}
              className="relative aspect-square w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-semibold text-foreground">Our Collection</h3>
              <p className="mt-2 text-muted-foreground">Each piece, lovingly handmade.</p>
            </div>
            <span className="text-sm text-muted-foreground">{products.length} items</span>
          </div>

          {products.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
              No products yet. Sign in as admin to add some.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <Card key={p.id} className="overflow-hidden p-0 transition-shadow hover:shadow-lg">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-accent/20 text-5xl">🧵</div>
                    )}
                  </div>
                  <div className="space-y-2 p-5">
                    {p.category && (
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</p>
                    )}
                    <h4 className="text-lg font-semibold text-foreground">{p.name}</h4>
                    {p.description && <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>}
                    <div className="flex items-end justify-between pt-2">
                      <span className="text-xl font-semibold text-primary">₹{Number(p.price).toFixed(0)}</span>
                      <span className={`text-xs font-medium ${p.quantity > 0 ? "text-foreground/70" : "text-destructive"}`}>
                        {p.quantity > 0 ? `${p.quantity} in stock` : "Out of stock"}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h3 className="text-3xl font-semibold text-foreground">Visit & Contact</h3>
          <p className="mt-2 text-muted-foreground">We'd love to hear from you.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ContactCard icon={<Phone className="h-5 w-5" />} label="Phone" value={contact?.phone} />
            <ContactCard icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value={contact?.whatsapp} />
            <ContactCard icon={<Mail className="h-5 w-5" />} label="Email" value={contact?.email} />
            <ContactCard icon={<MapPin className="h-5 w-5" />} label="Address" value={contact?.address} />
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-secondary/50">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {contact?.shop_name ?? "SNEHITHA Jute & Pillow Manzil"}. Handmade with love.
        </div>
      </footer>
    </div>
  );
}
function ContactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  let href = "#";

  if (label === "WhatsApp" && value) {
    const phone = value.replace(/\D/g, "");
    href =`https://wa.me/${phone}?text=${encodeURIComponent(
  "Hi, I'm interested in your products."
)}`};

  if (label === "Phone" && value) {
    href = `tel:${value}`;
  }

  if (label === "Email" && value) {
    href = `mailto:${value}`;
  }

  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/30 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        {value ? (
          <a
            href={href}
            target={label === "WhatsApp" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-base font-medium text-foreground hover:text-primary hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-base font-medium text-foreground">—</p>
        )}
      </div>
    </Card>
  );
}