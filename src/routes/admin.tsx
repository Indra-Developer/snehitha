import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { LogOut, Plus, Save, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — SNEHITHA" }] }),
  component: AdminPage,
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
  id?: string;
  shop_name: string;
  tagline: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
};

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);

  const reloadProducts = useCallback(async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data ?? []);
  }, []);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      await reloadProducts();
      const { data: c } = await supabase.from("contact_info").select("*").limit(1).maybeSingle();
      setContact(c);
      setReady(true);
    })();
  }, [navigate, reloadProducts]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-md p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">Not an admin</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your account doesn't have admin access.</p>
          <Button onClick={signOut} variant="outline" className="mt-6">Sign out</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">View storefront →</Link>
          </div>
          <Button onClick={signOut} variant="outline" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-6 py-10">
        {contact && <ContactEditor contact={contact} onSaved={setContact} />}
        <ProductsManager products={products} reload={reloadProducts} />
      </main>
    </div>
  );
}

function ContactEditor({ contact, onSaved }: { contact: Contact; onSaved: (c: Contact) => void }) {
  const [form, setForm] = useState<Contact>(contact);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const { data, error } = await supabase
      .from("contact_info")
      .update({
        shop_name: form.shop_name,
        tagline: form.tagline,
        phone: form.phone,
        whatsapp: form.whatsapp,
        email: form.email,
        address: form.address,
      })
      .eq("id", form.id!)
      .select()
      .single();
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Contact details saved");
    onSaved(data as Contact);
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground">Contact Details</h2>
      <p className="text-sm text-muted-foreground">Shown on the public storefront.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Shop name" value={form.shop_name} onChange={(v) => setForm({ ...form, shop_name: v })} />
        <Field label="Tagline" value={form.tagline ?? ""} onChange={(v) => setForm({ ...form, tagline: v })} />
        <Field label="Phone" value={form.phone ?? ""} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="WhatsApp" value={form.whatsapp ?? ""} onChange={(v) => setForm({ ...form, whatsapp: v })} />
        <Field label="Email" value={form.email ?? ""} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Address" value={form.address ?? ""} onChange={(v) => setForm({ ...form, address: v })} />
      </div>
      <Button onClick={save} disabled={saving} className="mt-5 gap-2">
        <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save contact"}
      </Button>
    </Card>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ProductsManager({ products, reload }: { products: Product[]; reload: () => Promise<void> }) {
  const empty = { name: "", description: "", category: "", price: 0, quantity: 0, image_url: "" };
  const [draft, setDraft] = useState(empty);
  const [saving, setSaving] = useState(false);

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("products").insert({
      name: draft.name,
      description: draft.description || null,
      category: draft.category || null,
      price: draft.price,
      quantity: draft.quantity,
      image_url: draft.image_url || null,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Product added");
    setDraft(empty);
    await reload();
  }

  async function updateRow(p: Product, patch: Partial<Product>) {
    const { error } = await supabase.from("products").update(patch).eq("id", p.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Updated");
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    await reload();
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground">Products</h2>
      <p className="text-sm text-muted-foreground">Add, edit, or remove items from the storefront.</p>

      <form onSubmit={addProduct} className="mt-5 grid gap-3 rounded-xl border border-dashed border-border bg-secondary/40 p-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <Label>Name</Label>
          <Input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <Label>Category</Label>
          <Input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
        </div>
        <div>
          <Label>Price (₹)</Label>
          <Input type="number" min={0} step="0.01" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
        </div>
        <div>
          <Label>Qty</Label>
          <Input type="number" min={0} value={draft.quantity} onChange={(e) => setDraft({ ...draft, quantity: Number(e.target.value) })} />
        </div>
        <div className="sm:col-span-4">
          <Label>Image URL</Label>
          <Input value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} placeholder="https://..." />
        </div>
        <div className="sm:col-span-6">
          <Label>Description</Label>
          <Textarea rows={2} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        </div>
        <Button type="submit" disabled={saving} className="gap-2 sm:col-span-2">
          <Plus className="h-4 w-4" /> {saving ? "Adding..." : "Add product"}
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        {products.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">No products yet.</p>
        )}
        {products.map((p) => (
          <ProductRow key={p.id} product={p} onUpdate={(patch) => updateRow(p, patch)} onDelete={() => remove(p.id)} />
        ))}
      </div>
    </Card>
  );
}

function ProductRow({
  product,
  onUpdate,
  onDelete,
}: {
  product: Product;
  onUpdate: (patch: Partial<Product>) => void;
  onDelete: () => void;
}) {
  const [p, setP] = useState(product);
  useEffect(() => setP(product), [product]);

  return (
    <div className="grid items-end gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-12">
      <div className="sm:col-span-3">
        <Label className="text-xs">Name</Label>
        <Input value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs">Category</Label>
        <Input value={p.category ?? ""} onChange={(e) => setP({ ...p, category: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs">Price (₹)</Label>
        <Input type="number" min={0} step="0.01" value={p.price} onChange={(e) => setP({ ...p, price: Number(e.target.value) })} />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs">Quantity</Label>
        <Input type="number" min={0} value={p.quantity} onChange={(e) => setP({ ...p, quantity: Number(e.target.value) })} />
      </div>
      <div className="flex gap-2 sm:col-span-3">
        <Button
          size="sm"
          className="flex-1 gap-1"
          onClick={() => onUpdate({ name: p.name, category: p.category, price: p.price, quantity: p.quantity })}
        >
          <Save className="h-3 w-3" /> Save
        </Button>
        <Button size="sm" variant="outline" onClick={onDelete} className="gap-1">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}