// migrate.mjs
import "dotenv/config";
import * as prismic from "@prismicio/client";
import readline from "readline";
import config from "./slicemachine.config.json" assert { type: "json" };

// ===== BASIC CONFIG =====
const NEW_REPO_NAME = config.repositoryName;
const SOURCE_REPO = "tax-zero-landing"; // old repo
const SOURCE_TYPE = "landing";          // custom type in old repo
const TARGET_NAME = "LandingPage";      // custom type in new repo

// ===== SETUP CLIENTS =====
const writeClient = prismic.createWriteClient(NEW_REPO_NAME, {
  writeToken: process.env.PRISMIC_WRITE_TOKEN || "",
});
const sourceClient = prismic.createClient(SOURCE_REPO);

// ===== FETCH SOURCE DOCS =====
console.log(`\n🔍 Fetching "${SOURCE_TYPE}" from ${SOURCE_REPO}...`);
const docs = await sourceClient.getAllByType(SOURCE_TYPE);

if (!docs.length) {
  console.log("❌ No documents found.");
  process.exit(0);
}

// show list
console.log(`\n📄 Found ${docs.length} document(s):`);
docs.forEach((d, i) => console.log(`${i + 1}. ID: ${d.id}, UID: ${d.uid}`));

// ===== ASK USER WHICH TO MIGRATE =====
const ask = (q) => new Promise((r) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question(q, (a) => { rl.close(); r(a.trim()); });
});

const answer = await ask(
  "\n👉 Enter ID(s) to migrate (comma separated), or type 'all' to migrate everything: "
);

// ===== SELECT DOCUMENTS =====
let selectedDocs;
if (answer.toLowerCase() === "all") {
  selectedDocs = docs;
  console.log("✅ Selected: all documents.");
} else {
  const ids = answer.split(",").map((x) => x.trim());
  selectedDocs = docs.filter((d) => ids.includes(d.id));
  console.log(`✅ Selected ${selectedDocs.length} document(s).`);
}

if (!selectedDocs.length) {
  console.log("⚠️ No matching documents found.");
  process.exit(0);
}

// ===== CREATE MIGRATION =====
const migration = prismic.createMigration();

for (const doc of selectedDocs) {
  const fullDoc = await sourceClient.getByID(doc.id);
  migration.createDocumentFromPrismic(fullDoc, TARGET_NAME + " - " + doc.uid);
}

console.log(`\n🚀 Migrating ${selectedDocs.length} document(s)...`);

// ===== RUN MIGRATION =====
await writeClient.migrate(migration, {
  reporter: (e) => {
    if (e.type === "start") console.log("⏳ Starting migration...");
    console.log(e);
    if (e.type === "end") console.log("✅ Migration complete!");
  },
});

console.log("\n🎉 Done! Check Migration Release in your new repo.");
