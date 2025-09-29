import fs from "fs";
import path from "path";

const roadmapBlocks = [
  {
    phase: "Phase 1 – Foundations",
    status: "✅ Complete",
    items: [
      "Landing site & mission/vision/values live",
      "Billwise (Alpha), Follow the Funds (Beta)",
      "Initial GitHub + Vercel deployment pipeline"]},
  {
    phase: "Phase 2 – Core Civic Tools",
    status: "🟡 In Progress",
    items: [
      "Billwise: add state-level bills, daily refresh",
      "Follow the Funds: candidate profiles, donor timelines",
      "CivicBot: prototype conversational interface",
      "Outdated Facts: Alpha expansion"]},
  {
    phase: "Phase 3 – Engagement & Education",
    status: "🔜 Planned",
    items: [
      "VoterMatch GPT+: candidate matching + donor transparency",
      "Ask the LawBot: simplify docs, generate common forms",
      "AI Bureaucracy Buster: guided government workflows",
      "EchoChamber+: profile-based replacement DB + extension"]},
  {
    phase: "Phase 4 – Integration & Scale",
    status: "🚀 Future",
    items: [
      "Shared We the Data design system",
      "Unified dashboards (Billwise + Follow the Funds + VoterMatch)",
      "Contributor documentation & open APIs"]}];

const roadmapSection = `
<section id="roadmap" className="mx-auto max-w-5xl px-4 py-12">
  <h2 className="text-2xl font-bold mb-6">Roadmap & Status</h2>
  <div className="space-y-8">
    {${JSON.stringify(roadmapBlocks)}.map((block) => (
      <div
        key={block.phase}
        className="rounded-2xl border border-zinc-200 bg-white/60 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
      >
        <header className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">{block.phase}</h3>
          <span className="text-sm text-zinc-500">{block.status}</span>
        </header>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-1">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
`;

const filePath = path.resolve("src", "App.jsx");
let content = fs.readFileSync(filePath, "utf8");

if (!content.includes("id=\"roadmap\"")) {
  content = content.replace("</main>", `${roadmapSection}\n</main>`);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✅ Roadmap section added to App.jsx");
} else {
  console.log("ℹ️ Roadmap section already present in App.jsx");
}

