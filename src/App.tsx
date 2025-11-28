import React, { useMemo, useState } from "react";

// Junto Single-Page Website (React + Tailwind)
// Notes for integration:
// - Replace the placeholder links in DOWNLOAD_LINKS with your App Store / Play links.
// - This form saves to localStorage (browser memory) for now.

const DOWNLOAD_LINKS = {
  ios: "#", // e.g., TestFlight invite link
  android: "#", // e.g., Play Store / APK link
};

export default function App() {
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [wlSubmitting, setWlSubmitting] = useState(false);
  const [wlSuccess, setWlSuccess] = useState<string | null>(null);
  const [cpSubmitting, setCpSubmitting] = useState(false);
  const [cpSuccess, setCpSuccess] = useState<string | null>(null);

  // Simple ID generator for client-side confirmations
  const id = () => Math.random().toString(36).slice(2, 8).toUpperCase();

  const Year = useMemo(() => new Date().getFullYear(), []);

  function handleWaitlistSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const uni = String(data.get("university") || "");
    const city = String(data.get("city") || "");
    const consent = data.get("gdpr") === "on";

    if (!fullName || !email || !consent) {
      alert("Please complete required fields and accept GDPR consent.");
      return;
    }

    // Simulate API call
    setWlSubmitting(true);
    setTimeout(() => {
      const entry = {
        id: `WL-${id()}`,
        fullName,
        email,
        university: uni,
        city,
        marketing: data.get("marketing") === "on",
        createdAt: new Date().toISOString(),
      };
      try {
        const existing = JSON.parse(localStorage.getItem("junto_waitlist") || "[]");
        existing.push(entry);
        localStorage.setItem("junto_waitlist", JSON.stringify(existing));
        setWlSuccess(entry.id);
        (form as HTMLFormElement).reset();
      } catch (err) {
        console.error(err);
        alert("Saved locally only. Please try again later.");
      } finally {
        setWlSubmitting(false);
      }
    }, 600);
  }

  function handleComplaintSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const category = String(data.get("category") || "");
    const subject = String(data.get("subject") || "").trim();
    const details = String(data.get("details") || "").trim();
    const consent = data.get("consent") === "on";

    if (!category || !subject || !details || !consent) {
      alert("Please fill in all required fields and accept the consent checkbox.");
      return;
    }

    setCpSubmitting(true);
    setTimeout(() => {
      const entry = {
        id: `CP-${id()}`,
        category,
        subject,
        details,
        email: String(data.get("email") || ""),
        createdAt: new Date().toISOString(),
      };
      try {
        const existing = JSON.parse(localStorage.getItem("junto_complaints") || "[]");
        existing.push(entry);
        localStorage.setItem("junto_complaints", JSON.stringify(existing));
        setCpSuccess(entry.id);
        (form as HTMLFormElement).reset();
      } catch (err) {
        console.error(err);
        alert("Saved locally only. Please try again later.");
      } finally {
        setCpSubmitting(false);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top Download Banner */}
      {showTopBanner && (
        <div className="w-full bg-neutral-900 text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Download Junto</span>
              <span className="opacity-80">(Alpha)</span>
              <a
                href={DOWNLOAD_LINKS.ios}
                className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
              >
                iOS
              </a>
              <a
                href={DOWNLOAD_LINKS.android}
                className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
              >
                Android
              </a>
            </div>
            <button
              aria-label="Close banner"
              onClick={() => setShowTopBanner(false)}
              className="rounded-full bg-white/10 px-2 py-1 hover:bg-white/20"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2">
            {/* LOGO PLACEHOLDER: To use an image, replace this div with: <img src="/logo.png" className="h-8 w-8 rounded-2xl" /> */}
            <div className="h-8 w-8 rounded-2xl bg-neutral-900"></div>
            <span className="text-lg font-semibold">Junto</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#how" className="hover:opacity-80">How it works</a>
            <a href="#privacy" className="hover:opacity-80">Privacy</a>
            <a href="#waitlist" className="hover:opacity-80">Waiting list</a>
            <a href="#complaints" className="hover:opacity-80">Complaints</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={DOWNLOAD_LINKS.ios} className="rounded-xl border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-100">iOS</a>
            <a href={DOWNLOAD_LINKS.android} className="rounded-xl bg-neutral-900 px-3 py-1.5 text-sm text-white hover:bg-neutral-800">Android</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-neutral-100" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:pt-20">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Less doomscrolling. More real life.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-neutral-600">
              Junto is the privacy‑first meetup app for friends. Post a plan, your friends tap <span className="font-medium">Join</span>, and you meet IRL. No background location. No endless feed. Just spontaneous time together.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StoreBadge type="ios" href={DOWNLOAD_LINKS.ios} />
              <StoreBadge type="android" href={DOWNLOAD_LINKS.android} />
              <a href="#waitlist" className="rounded-xl border border-neutral-300 px-4 py-3 text-sm font-medium hover:bg-neutral-100">
                Join the waiting list
              </a>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-neutral-600">
              <li>• Location shared only when you post</li>
              <li>• Time‑boxed invites that auto‑expire</li>
              <li>• One tap to join, optional ETA, Maps deep‑link</li>
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            {/* Phone mock */}
            <div className="relative mx-auto aspect-[9/19] w-64 rounded-[2rem] border border-neutral-200 bg-white shadow-2xl md:w-72">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
              <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-neutral-200/60" />
              <div className="absolute inset-0 rounded-[2rem] p-4">
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-500">Junto</span>
                    <span className="text-[10px] text-neutral-400">Alpha</span>
                  </div>
                  <div className="space-y-3">
                    <Card title="Coffee @ Flagey" time="Today • 17:00–19:00" people="Rose, Sean, Enzo" cta="Join" />
                    <Card title="Climbing • BLOCBX" time="Sat • 14:30–16:00" people="Gilles, Emma" cta="Join" />
                    <Card title="After‑work drinks" time="Fri • 18:30–late" people="ULB friends" cta="Join" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -left-20 -top-16 h-40 w-40 rounded-full bg-neutral-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-neutral-300/40 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">Why Junto?</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Feature
              title="Privacy‑first by design"
              desc="No background tracking. Location is shared only in a time‑boxed post you create. Posts auto‑expire and disappear."
            />
            <Feature
              title="Spontaneous, not stressful"
              desc="No feeds, no follower counts, no addictive loops. Junto nudges you off‑screen and into the real world."
            />
            <Feature
              title="Simple and clear"
              desc="Create a plan, tag a venue, set an expiry. Friends tap Join and get a Maps deep‑link, with optional ETA."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Step n={1} title="Post a plan" desc="Pick a place, set a window, and share with friends." />
            <Step n={2} title="Friends tap Join" desc="They see your plan, choose to join, and optionally share ETA." />
            <Step n={3} title="Meet IRL" desc="Maps opens with the venue. No chat chaos. No FOMO, just people." />
          </ol>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">Privacy & Safety</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-medium">Your data, under your control</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-600">
                <li>No background location: we access location only when you post.</li>
                <li>Time‑boxed sharing: each post auto‑expires.</li>
                <li>Clear visibility controls: friends and chosen circles only.</li>
                <li>No infinite feeds. No ads. No dark patterns.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-medium">Safety tools</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-600">
                <li>Easy reporting for content or user behavior.</li>
                <li>Block and remove features to keep your space safe.</li>
                <li>Venue‑partner escalation for onsite incidents.</li>
                <li>We review safety reports with care and urgency.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waiting List */}
      <section id="waitlist" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Join the waiting list</h2>
              <p className="mt-3 max-w-prose text-neutral-600">
                We’re rolling out first at universities in Brussels (ULB, VUB, USL‑B), then expanding. Add your details and we’ll notify you when Junto opens in your area.
              </p>
              {wlSuccess && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  Thanks! You’re on the list. Confirmation ID: <span className="font-mono">{wlSuccess}</span>
                </div>
              )}
            </div>
            <form onSubmit={handleWaitlistSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Full name *</label>
                  <input name="fullName" required className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300" placeholder="Alex Example" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Email *</label>
                  <input type="email" name="email" required className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300" placeholder="you@university.be" />
                </div>
                <div>
                  <label className="text-sm font-medium">University</label>
                  <select name="university" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2">
                    <option value="ULB">ULB</option>
                    <option value="VUB">VUB</option>
                    <option value="USaint‑Louis">USaint‑Louis</option>
                    <option value="KU Leuven">KU Leuven</option>
                    <option value="UCLouvain">UCLouvain</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input name="city" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" defaultValue="Brussels" />
                </div>
                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" name="marketing" className="h-4 w-4" />
                    I’d like occasional updates (product tips, launch info)
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="inline-flex items-start gap-2 text-sm">
                    <input type="checkbox" name="gdpr" required className="mt-0.5 h-4 w-4" />
                    <span>
                      I consent to the storage and processing of my data for the purpose of receiving Junto updates. See our
                      {" "}
                      <a href="#" className="underline">Privacy Policy</a>.
                    </span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={wlSubmitting}
                className="mt-6 w-full rounded-xl bg-neutral-900 px-4 py-3 font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
              >
                {wlSubmitting ? "Adding…" : "Join the waiting list"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Complaints & Safety Reports */}
      <section id="complaints" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Complaints & Safety reports</h2>
              <p className="mt-3 max-w-prose text-neutral-600">
                Tell us if something’s wrong: bugs, privacy concerns, harassment, venue issues, or anything else. For emergencies or danger, contact local authorities first.
              </p>
              {cpSuccess && (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                  We’ve received your report. Reference ID: <span className="font-mono">{cpSuccess}</span>
                </div>
              )}
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <strong>Immediate danger?</strong> Call local emergency services. We can’t provide emergency assistance through this form.
              </div>
            </div>
            <form onSubmit={handleComplaintSubmit} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium">Category *</label>
                  <select name="category" required className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2">
                    <option value="">Select…</option>
                    <option>Bug</option>
                    <option>Privacy</option>
                    <option>Safety / Harassment</option>
                    <option>Content / Abuse</option>
                    <option>Venue partner issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject *</label>
                  <input name="subject" required className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" placeholder="Short summary" />
                </div>
                <div>
                  <label className="text-sm font-medium">Details *</label>
                  <textarea name="details" required rows={5} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" placeholder="Describe what happened, where, and when…" />
                </div>
                <div>
                  <label className="text-sm font-medium">Your email (optional)</label>
                  <input type="email" name="email" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" placeholder="For follow‑up only" />
                </div>
                <div>
                  <label className="text-sm font-medium">Attachment (optional)</label>
                  <input type="file" name="attachment" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" />
                </div>
                <div>
                  <label className="inline-flex items-start gap-2 text-sm">
                    <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4" />
                    <span>
                      I consent to Junto processing this information to address my report, according to the{ " "}
                      <a href="#" className="underline">Privacy Policy</a>.
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={cpSubmitting}
                  className="mt-2 w-full rounded-xl bg-neutral-900 px-4 py-3 font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
                >
                  {cpSubmitting ? "Sending…" : "Send report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Faq q="Is Junto free?" a="Yes during the alpha. We’re exploring fair, transparent pricing for future venue‑powered perks—never pay‑to‑be‑seen social feeds." />
            <Faq q="Do you track my location in the background?" a="No. We only get location when you choose to post a plan. After expiry, it’s gone from your feed." />
            <Faq q="Who can see my posts?" a="Only your chosen circles—friends and the people you share with. Junto avoids public feeds by default." />
            <Faq q="Where will you launch first?" a="We’re starting at Brussels universities, then expanding city by city based on demand." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-2xl bg-neutral-900"></div>
                <span className="text-lg font-semibold">Junto</span>
              </div>
              <p className="mt-3 text-sm text-neutral-600 max-w-xs">
                The anti‑social social app. Less screen time, more real time.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li><a className="hover:underline" href="#features">Features</a></li>
                <li><a className="hover:underline" href="#how">How it works</a></li>
                <li><a className="hover:underline" href="#privacy">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li><a className="hover:underline" href="#waitlist">Waiting list</a></li>
                <li><a className="hover:underline" href="#complaints">Complaints</a></li>
                <li><a className="hover:underline" href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li><a className="hover:underline" href="#">Privacy Policy</a></li>
                <li><a className="hover:underline" href="#">Terms of Use</a></li>
                <li><a className="hover:underline" href="#">Safety & reporting</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
            <span>© {Year} Junto. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <a href={DOWNLOAD_LINKS.ios} className="rounded-lg border border-neutral-200 px-3 py-1.5 hover:bg-neutral-100">iOS</a>
              <a href={DOWNLOAD_LINKS.android} className="rounded-lg border border-neutral-200 px-3 py-1.5 hover:bg-neutral-100">Android</a>
              <a href="#waitlist" className="rounded-lg bg-neutral-900 px-3 py-1.5 text-white hover:bg-neutral-800">Join waitlist</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StoreBadge({ type, href }: { type: "ios" | "android"; href: string }) {
  const isIOS = type === "ios";
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-2xl border border-neutral-300 px-4 py-3 text-left hover:bg-neutral-100"
    >
      <div className="grid h-8 w-8 place-items-center rounded-xl border border-neutral-200">
        {isIOS ? (
          // Apple logo (minimal)
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M16.365 1.43c0 1.14-.47 2.23-1.22 3.04-.78.84-2.06 1.5-3.12 1.44-.12-1.07.5-2.2 1.26-3.02.83-.88 2.27-1.54 3.08-1.46zM20.71 17.07c-.55 1.26-1.2 2.51-2.16 3.68-.82 1.01-1.82 2.25-3.16 2.27-1.33.03-1.75-.73-3.26-.73-1.51 0-1.97.7-3.28.76-1.35.06-2.38-1.1-3.2-2.1C3.36 19.14 1.5 14.61 3.4 11.3c.87-1.51 2.42-2.47 4.1-2.5 1.29-.03 2.5.86 3.26.86.76 0 2.25-1.06 3.81-.9.65.03 2.49.26 3.67 2.01-3.12 1.68-2.6 6.1.47 6.3z" fill="currentColor" />
          </svg>
        ) : (
          // Play triangle
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M3 2l18 10-18 10V2z" fill="currentColor" />
          </svg>
        )}
      </div>
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-wide text-neutral-500">
          {isIOS ? "Download on the" : "Get it on"}
        </div>
        <div className="text-sm font-semibold">{isIOS ? "App Store" : "Google Play"}</div>
      </div>
    </a>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-neutral-900 text-sm font-semibold text-white">{n}</span>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-neutral-600">{desc}</p>
    </li>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <span className="text-xl" aria-hidden>{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-neutral-600">{a}</div>}
    </div>
  );
}

function Card({ title, time, people, cta }: { title: string; time: string; people: string; cta: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-neutral-500">{time}</div>
          <div className="mt-2 text-xs text-neutral-600">{people}</div>
        </div>
        <button className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white">{cta}</button>
      </div>
    </div>
  );
}