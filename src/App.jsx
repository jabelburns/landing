import React, { useMemo, useState } from "react";

const APPS = [
  { name: "Billwise", slug: "billwise", status: "Alpha",
    short: "Plain-English bill summaries (federal + states), daily refresh, search, and shareable briefs.",
    long: "Billwise ingests new legislation daily, translates legalese into plain English, and lets people follow, search, and share the parts that matter. State data via OpenStates; federal via GovInfo. Add alerts and district-aware views next.",
    url: "https://billwise.org", tags: ["Legislation","Summaries","Civic Tech"] },
  { name: "Follow the Funds", slug: "follow-the-funds", status: "Beta",
    short: "Campaign finance & lobbying, explained. See donors, bundles, and influence in plain English.",
    long: "Follow the Funds aggregates campaign finance and lobbying databases, then uses AI to explain donor influence in human terms. Explore candidate profiles, entity networks, and timeline views.",
    url: "https://followthefunds.clarityforus.org", tags: ["Money in Politics","Transparency"] },
  { name: "VoterMatch GPT+", slug: "votermatch", status: "Concept",
    short: "Match your values to candidates, with donor transparency and local ballot context.",
    long: "VoterMatch helps voters discover candidates beyond the usual headlines. Answer a few questions and compare alignment, records, and influence signals.",
    url: "https://votermatch.clarityforus.org", tags: ["Elections","Civic Engagement"] },
  { name: "Ask the LawBot", slug: "ask-the-lawbot", status: "Concept",
    short: "Legalese â†’ human. Simplify documents and draft common forms step-by-step.",
    long: "Upload or paste text and get a plain-language explanation, issue spotting, and starter language for common filings. Educational use; not legal advice.",
    url: "https://lawbot.clarityforus.org", tags: ["Access to Justice","Docs"] },
  { name: "AI Bureaucracy Buster", slug: "bureaucracy-buster", status: "Concept",
    short: "Guided walkthroughs that pre-fill government forms and track steps to done.",
    long: "Turn confusing workflows into checklists with auto-filled fields, document collection, and deadline reminders. Exports to official PDFs.",
    url: "https://buster.clarityforus.org", tags: ["Gov Services","Automation"] },
  { name: "CivicBot", slug: "civicbot", status: "Prototype",
    short: "A friendly chatbot that teaches civic skillsâ€”public records, town halls, and more.",
    long: "Learn how to file records requests, testify effectively, read agendas, and track outcomes. Scenario practice included.",
    url: "https://civicbot.clarityforus.org", tags: ["Civic Education"] },
    short: "Content filter/replacement profiles for research on information bubbles.",
    long: "Swap vocabulary via profiles (e.g., Conspiracy / Hyper-Patriot / Post-Truth) to study framing effects. Extension + demo playground.",
    short: "A tongue-in-cheek landing for civic crowdfunding tropesâ€”with working UI bits.",
    long: "A parody page exploring the aesthetics of crowdfunding in civic spaces. Useful for UX tests and demo talks.",
  { name: "Outdated Facts", slug: "outdated-facts", status: "Alpha",
    short: "A living museum of facts that used to be trueâ€”until they werenâ€™t.",
    long: "Crowd-curated timelines, citations, and explainers for fast-changing knowledge. Educational + meme-ready.",
    url: "https://outdatedfacts.org", tags: ["Education","Culture"] },
  { name: "We the Data (Suite)", slug: "we-the-data", status: "Umbrella",
    short: "The shared design system, data model, and principles behind all our apps.",
    long: "Open tools for open government: interoperability, transparency by default, and docs for contributors.",
    url: "https://wethedata.clarityforus.org", tags: ["Design System","Principles"] }];

function classNames(...xs) { return xs.filter(Boolean).join(" "); }

const StatusDot = ({ label }) => {
  const color = label==="Beta" ? "bg-blue-500"
              : label==="Alpha" ? "bg-amber-500"
              : label==="Dev" ? "bg-fuchsia-500"
              : label==="Prototype" ? "bg-emerald-500"
              : label==="Concept" ? "bg-slate-400" : "bg-zinc-500";
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-200">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}
    </span>
  );
};

const AppCard = ({ app }) => {
  const disabled = !app.url;
  return (
    <article className="group relative rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{app.name}</h3>
        <StatusDot label={app.status} />
      </header>
      <p className="text-sm text-zinc-600 dark:text-zinc-300">{app.short}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {app.tags?.map((t) => (
          <span key={t} className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">{t}</span>
        ))}
      </div>
      <footer className="mt-4 flex items-center gap-3">
        <a href={app.url || "#"} aria-disabled={disabled}
           className={classNames("inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
             disabled ? "cursor-not-allowed border border-zinc-200 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200")}>
          {disabled ? "Link coming soon" : "Open app"}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M13 5h6a1 1 0 0 1 1 1v6h-2V8.414l-9.293 9.293-1.414-1.414L16.586 7H13V5Z" />
          </svg>
        </a>
        <details>
          <summary className="cursor-pointer text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">More</summary>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{app.long}</p>
        </details>
      </footer>
    </article>
  );
};

export default function App() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return APPS;
    return APPS.filter((a) =>
      [a.name, a.short, a.long, ...(a.tags || [])].join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-white text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-50">
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/70 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">CF</span>
            <span>ClarityForUs</span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#apps" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Apps</a>
            <a href="#roadmap" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Roadmap</a>
            <a href="#about" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">About</a>
            <a href="#contact" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-5xl px-4 pb-8 pt-10 md:pb-12 md:pt-14">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Open tools for open government
        </p>
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          ClarityForUs â€” civic tech apps that turn complexity into clarity.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">
          A unified home for Billwise, Follow the Funds, VoterMatch, and more. This page is a ready-to-ship scaffoldâ€”swap links when apps go live.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="#apps" className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">Explore apps</a>
          <a href="#contact" className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">Get in touch</a>
        </div>
      </header>

      {/* Apps */}
      <section id="apps" className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold">Apps</h2>
          <label className="relative block w-full sm:w-80">
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search apps, features, or tagsâ€¦"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500" />
            <span className="pointer-events-none absolute right-3 top-2.5 text-zinc-400">âŒ˜K</span>
          </label>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (<AppCard key={app.slug} app={app} />))}
        </div>
        {filtered.length === 0 && (<p className="mt-6 text-sm text-zinc-500">No matches. Try a different term.</p>)}
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold">Roadmap & Status</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-1 font-medium">Now</h3>
            <ul className="list-inside list-disc text-sm text-zinc-600 dark:text-zinc-300">
              <li>Billwise: daily pipelines, state selector, shareable links</li>
              <li>Follow the Funds: org/candidate pages, network view</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-1 font-medium">Next</h3>
            <ul className="list-inside list-disc text-sm text-zinc-600 dark:text-zinc-300">
              <li>VoterMatch: Q&A flow, local ballot import</li>
              <li>LawBot: form library + explainer templates</li>
              <li>Outdated Facts: submission + moderation</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-1 font-medium">Later</h3>
            <ul className="list-inside list-disc text-sm text-zinc-600 dark:text-zinc-300">
              <li>â€œWe the Dataâ€ docs & design tokens</li>
              <li>Unified account & notifications</li>
              <li>Public API & contributor portal</li>
            </ul>
          </div>
        </div>
      </section>

      {/* About (Mission + Vision) */}
      <section id="about" className="mx-auto max-w-5xl px-4 pb-10">
        <h2 className="text-xl font-semibold">About ClarityForUs</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">We build small, sharp tools that make public information actually usable. Our principles:</p>
        <ul className="mt-3 grid grid-cols-1 gap-3 text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-2">
          <li className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><b>Plain language</b> over jargon.</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><b>Transparency</b> by default.</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><b>Open standards</b> and exportable data.</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><b>Small, fast</b> apps with clear outcomes.</li>
        </ul>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Our Mission</h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            At ClarityForUs, our mission is to make democracy more accessible, understandable, and actionable for everyone. We believe civic information should empowerâ€”not overwhelmâ€”citizens. By turning dense data and confusing processes into clear, open tools, we help communities:
          </p>
          <ul className="mt-3 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-300">
            <li>Understand the laws and policies that affect their daily lives.</li>
            <li>Follow the flow of money and influence in politics with transparency.</li>
            <li>Engage confidently in civic processes, from petitions to town halls.</li>
            <li>Access plain-language explanations of government forms and legal texts.</li>
            <li>Contribute to open data and collaborative solutions that strengthen accountability.</li>
          </ul>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            We are committed to building with openness, designing for clarity, and collaborating across communities to create tools that bring people closer to the decisions that shape their world.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Our Vision</h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            We envision a future where civic knowledge flows as freely and clearly as everyday conversation. A future where citizens donâ€™t just observe government from a distance, but participate with confidence and understanding. In this world:
          </p>
          <ul className="mt-3 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-300">
            <li>Every person can see, in plain terms, how policies, money, and power connect.</li>
            <li>Communities use shared, open tools to organize and collaborate on issues that matter most to them.</li>
            <li>Technology bridges divides rather than widening themâ€”making civic processes faster, fairer, and more transparent.</li>
            <li>Public trust grows because information is accessible, accurate, and designed for people, not gatekeepers.</li>
          </ul>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Our long-term vision is a civic ecosystem where clarity, openness, and accountability are the defaultâ€”not the exception. ClarityForUs will be a catalyst for this shift, demonstrating how simple, well-designed tools can strengthen democracy at every level.
          </p>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="mx-auto max-w-5xl px-4 pb-10">
        <h2 className="text-xl font-semibold">Our Values</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-medium">Integrity</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">We publish methods, cite sources, and separate facts from opinions. Our code and decisions are open to scrutiny.</p></article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-medium">Accessibility</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Plain language, inclusive design, and mobile-first performance so anyone can participate.</p></article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-medium">Transparency</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Data lineage, clear provenance, and exportable formats. No dark patterns.</p></article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-medium">Collaboration</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">We co-create with communities, researchers, journalists, and officials. Good ideas win, not egos.</p></article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-medium">Security & Privacy</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Minimize data collection, protect user info, and build threat-aware systems from day one.</p></article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-medium">Simplicity</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Small, sharp tools that solve real problems and get out of the way.</p></article>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Have feedback or want to collaborate? Drop your email and weâ€™ll reach out.</p>
        <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]"
              onSubmit={(e)=>{e.preventDefault(); alert("Thanks! Weâ€™ll be in touch.");}}>
          <input type="email" required placeholder="you@domain.com"
                 className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500" />
          <button type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
            Notify me
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white/60 px-4 py-8 text-sm text-zinc-500 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p>Â© {new Date().getFullYear()} ClarityForUs. Built under the â€œWe the Dataâ€ project.</p>
          <div className="flex items-center gap-4">
            <a href="https://clarityforus.org" className="hover:text-zinc-700 dark:hover:text-zinc-200">clarityforus.org</a>
            <span>Â·</span>
            <a href="https://clarityforus.com" className="hover:text-zinc-700 dark:hover:text-zinc-200">clarityforus.com</a>
          </div>
        </div>
      </footer>
    </main>
  );
}




