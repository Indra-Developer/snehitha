import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-qRqn0_S-.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as Card, t as Button } from "./card-DUIXOEMB.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Phone, c as Mail, n as ShieldCheck, o as MessageCircle, s as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-1ge-kEWE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-BiXQjI5q.jpg";
function Storefront() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [contact, setContact] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("products").select("*").order("created_at", { ascending: false }).then(({ data }) => setProducts(data ?? []));
		supabase.from("contact_info").select("*").limit(1).maybeSingle().then(({ data }) => setContact(data));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-semibold text-foreground",
						children: contact?.shop_name ?? "SNEHITHA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Jute & Pillow Manzil"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#products",
								className: "hidden text-sm font-medium text-foreground/80 hover:text-primary sm:inline-block",
								children: "Products"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								className: "hidden text-sm font-medium text-foreground/80 hover:text-primary sm:ml-4 sm:inline-block",
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "ml-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Admin"]
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-accent/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground",
							children: "Handcrafted with love"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-4xl font-semibold leading-tight text-foreground md:text-5xl",
							children: "Woven jute & dreamy pillows for every home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-base text-muted-foreground md:text-lg",
							children: [contact?.tagline ?? "Handcrafted jute bags & cozy pillows", " — sustainably made by skilled artisans, delivered to your doorstep."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#products",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									children: "Shop the collection"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "lg",
									children: "Get in touch"
								})
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_default,
							alt: "Jute bags and cotton pillows arranged in warm window light",
							width: 1024,
							height: 1024,
							className: "relative aspect-square w-full rounded-3xl object-cover shadow-2xl"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "products",
				className: "border-t border-border/60 bg-secondary/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-3xl font-semibold text-foreground",
							children: "Our Collection"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Each piece, lovingly handmade."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground",
							children: [products.length, " items"]
						})]
					}), products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
						children: "No products yet. Sign in as admin to add some."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "overflow-hidden p-0 transition-shadow hover:shadow-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/3] w-full overflow-hidden bg-muted",
								children: p.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image_url,
									alt: p.name,
									className: "h-full w-full object-cover",
									loading: "lazy"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full w-full items-center justify-center bg-accent/20 text-5xl",
									children: "🧵"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 p-5",
								children: [
									p.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: p.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-lg font-semibold text-foreground",
										children: p.name
									}),
									p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "line-clamp-2 text-sm text-muted-foreground",
										children: p.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end justify-between pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xl font-semibold text-primary",
											children: ["₹", Number(p.price).toFixed(0)]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs font-medium ${p.quantity > 0 ? "text-foreground/70" : "text-destructive"}`,
											children: p.quantity > 0 ? `${p.quantity} in stock` : "Out of stock"
										})]
									})
								]
							})]
						}, p.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "contact",
				className: "border-t border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6 py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-3xl font-semibold text-foreground",
							children: "Visit & Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "We'd love to hear from you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" }),
									label: "Phone",
									value: contact?.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }),
									label: "WhatsApp",
									value: contact?.whatsapp
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" }),
									label: "Email",
									value: contact?.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }),
									label: "Address",
									value: contact?.address
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/60 bg-secondary/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6 py-6 text-center text-sm text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						contact?.shop_name ?? "SNEHITHA Jute & Pillow Manzil",
						". Handmade with love."
					]
				})
			})
		]
	});
}
function ContactCard({ icon, label, value }) {
	let href = "#";
	if (label === "WhatsApp" && value) href = `https://wa.me/${value.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'm interested in your products.")}`;
	if (label === "Phone" && value) href = `tel:${value}`;
	if (label === "Email" && value) href = `mailto:${value}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex items-center gap-4 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/30 text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href,
			target: label === "WhatsApp" ? "_blank" : void 0,
			rel: "noopener noreferrer",
			className: "text-base font-medium text-foreground hover:text-primary hover:underline",
			children: value
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-base font-medium text-foreground",
			children: "—"
		})] })]
	});
}
//#endregion
export { Storefront as component };
