import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-qRqn0_S-.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as Card, r as cn, t as Button } from "./card-DUIXOEMB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, r as Toaster$1, t as Input } from "./sonner-CP-KvUtk.mjs";
import { M as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Plus, l as LogOut, r as Save, t as Trash2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CXiNmmq6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function AdminPage() {
	const navigate = useNavigate();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [contact, setContact] = (0, import_react.useState)(null);
	const reloadProducts = (0, import_react.useCallback)(async () => {
		const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
		setProducts(data ?? []);
	}, []);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data: sess } = await supabase.auth.getSession();
			if (!sess.session) {
				navigate({ to: "/auth" });
				return;
			}
			const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", sess.session.user.id);
			setIsAdmin(!!roles?.some((r) => r.role === "admin"));
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
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center text-muted-foreground",
		children: "Loading..."
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-md p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-foreground",
					children: "Not an admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your account doesn't have admin access."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: signOut,
					variant: "outline",
					className: "mt-6",
					children: "Sign out"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold text-foreground",
						children: "Admin Panel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs text-muted-foreground hover:text-primary",
						children: "View storefront →"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: signOut,
						variant: "outline",
						size: "sm",
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-5xl space-y-10 px-6 py-10",
				children: [contact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactEditor, {
					contact,
					onSaved: setContact
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsManager, {
					products,
					reload: reloadProducts
				})]
			})
		]
	});
}
function ContactEditor({ contact, onSaved }) {
	const [form, setForm] = (0, import_react.useState)(contact);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function save() {
		setSaving(true);
		const { data, error } = await supabase.from("contact_info").update({
			shop_name: form.shop_name,
			tagline: form.tagline,
			phone: form.phone,
			whatsapp: form.whatsapp,
			email: form.email,
			address: form.address
		}).eq("id", form.id).select().single();
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Contact details saved");
		onSaved(data);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground",
				children: "Contact Details"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Shown on the public storefront."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Shop name",
						value: form.shop_name,
						onChange: (v) => setForm({
							...form,
							shop_name: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tagline",
						value: form.tagline ?? "",
						onChange: (v) => setForm({
							...form,
							tagline: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone",
						value: form.phone ?? "",
						onChange: (v) => setForm({
							...form,
							phone: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "WhatsApp",
						value: form.whatsapp ?? "",
						onChange: (v) => setForm({
							...form,
							whatsapp: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						value: form.email ?? "",
						onChange: (v) => setForm({
							...form,
							email: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Address",
						value: form.address ?? "",
						onChange: (v) => setForm({
							...form,
							address: v
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: save,
				disabled: saving,
				className: "mt-5 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
					" ",
					saving ? "Saving..." : "Save contact"
				]
			})
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		value,
		onChange: (e) => onChange(e.target.value)
	})] });
}
function ProductsManager({ products, reload }) {
	const empty = {
		name: "",
		description: "",
		category: "",
		price: 0,
		quantity: 0,
		image_url: ""
	};
	const [draft, setDraft] = (0, import_react.useState)(empty);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function addProduct(e) {
		e.preventDefault();
		setSaving(true);
		const { error } = await supabase.from("products").insert({
			name: draft.name,
			description: draft.description || null,
			category: draft.category || null,
			price: draft.price,
			quantity: draft.quantity,
			image_url: draft.image_url || null
		});
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Product added");
		setDraft(empty);
		await reload();
	}
	async function updateRow(p, patch) {
		const { error } = await supabase.from("products").update(patch).eq("id", p.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Updated");
		await reload();
	}
	async function remove(id) {
		if (!confirm("Delete this product?")) return;
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Deleted");
		await reload();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground",
				children: "Products"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Add, edit, or remove items from the storefront."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: addProduct,
				className: "mt-5 grid gap-3 rounded-xl border border-dashed border-border bg-secondary/40 p-4 sm:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							value: draft.name,
							onChange: (e) => setDraft({
								...draft,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.category,
							onChange: (e) => setDraft({
								...draft,
								category: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Price (₹)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						step: "0.01",
						value: draft.price,
						onChange: (e) => setDraft({
							...draft,
							price: Number(e.target.value)
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Qty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						value: draft.quantity,
						onChange: (e) => setDraft({
							...draft,
							quantity: Number(e.target.value)
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Image URL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.image_url,
							onChange: (e) => setDraft({
								...draft,
								image_url: e.target.value
							}),
							placeholder: "https://..."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: draft.description,
							onChange: (e) => setDraft({
								...draft,
								description: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: saving,
						className: "gap-2 sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
							" ",
							saving ? "Adding..." : "Add product"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [products.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground",
					children: "No products yet."
				}), products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRow, {
					product: p,
					onUpdate: (patch) => updateRow(p, patch),
					onDelete: () => remove(p.id)
				}, p.id))]
			})
		]
	});
}
function ProductRow({ product, onUpdate, onDelete }) {
	const [p, setP] = (0, import_react.useState)(product);
	(0, import_react.useEffect)(() => setP(product), [product]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-end gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs",
					children: "Name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: p.name,
					onChange: (e) => setP({
						...p,
						name: e.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs",
					children: "Category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: p.category ?? "",
					onChange: (e) => setP({
						...p,
						category: e.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs",
					children: "Price (₹)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					step: "0.01",
					value: p.price,
					onChange: (e) => setP({
						...p,
						price: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs",
					children: "Quantity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: p.quantity,
					onChange: (e) => setP({
						...p,
						quantity: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 sm:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "flex-1 gap-1",
					onClick: () => onUpdate({
						name: p.name,
						category: p.category,
						price: p.price,
						quantity: p.quantity
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3 w-3" }), " Save"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onDelete,
					className: "gap-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
				})]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
