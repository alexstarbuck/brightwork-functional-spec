const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');
const { execSync } = require('child_process');

// === CONFIGURATION ===
const OBSIDIAN_VAULT_PATH = path.resolve(process.env.HOME, 'Documents/cicely_ak/zeraxo/brightwork/docs');
const ATTACHMENTS_FOLDER_NAME = 'attachments';
const PROJECT_ROOT = process.cwd();

const VAULT_TARGET = path.join(PROJECT_ROOT, 'vault');
const DOCS_TARGET = path.join(PROJECT_ROOT, 'docs');
const STATIC_ATTACHMENTS_TARGET = path.join(PROJECT_ROOT, 'static', ATTACHMENTS_FOLDER_NAME);

// === HELPERS ===
function cleanFolder(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// === STEP 1: Copy source Obsidian vault (.md files + attachments) to project/vault ===
console.log('📁 Copying Obsidian vault...');
cleanFolder(VAULT_TARGET);
copyRecursive(OBSIDIAN_VAULT_PATH, VAULT_TARGET);

// === STEP 2: Copy .md files to /docs and attachments to /static/attachments ===
console.log('📁 Preparing Docusaurus content...');
cleanFolder(DOCS_TARGET);
cleanFolder(STATIC_ATTACHMENTS_TARGET);
copyRecursive(OBSIDIAN_VAULT_PATH, DOCS_TARGET);

// Copy attachments into static folder
copyRecursive(path.join(OBSIDIAN_VAULT_PATH, ATTACHMENTS_FOLDER_NAME), STATIC_ATTACHMENTS_TARGET);

// === STEP 3: Parse slugs ===
console.log('🔍 Reading slugs...');
const slugMap = {};
const mdFiles = fs.readdirSync(DOCS_TARGET).filter(file => file.endsWith('.md'));

for (const file of mdFiles) {
  const filePath = path.join(DOCS_TARGET, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  const slug = data.slug || slugify(path.basename(file, '.md'), { lower: true });
  slugMap[file] = slug;
}

// === STEP 4: Rewrite links inside /docs/ .md files ===
console.log('✏️ Rewriting internal links...');
function rewriteMarkdownLinks(content) {
  // Rewrite internal .md links to use slugs
  content = content.replace(/\[([^\]]+)\]\((\.\/)?([\w\-\/]+)\.md\)/g, (match, label, _ignore, target) => {
    const filename = `${target}.md`;
    const slug = slugMap[filename];
    return slug ? `[${label}](/docs/${slug})` : match;
  });

  // Fix links to attachments (pointing to attachments folder)
  content = content.replace(/\[([^\]]+)\]\((\.\/)?attachments\/([^)]+)\)/gi, (_, label, _ignore, filename) => {
    return `[${label}](/attachments/${filename})`;
  });

  // Fix Back to MoC double-slash bug
  content = content.replace(/\]\(\/docs\/\/\)/g, '](\/docs\/)');

  return content;
}

for (const file of mdFiles) {
  const filePath = path.join(DOCS_TARGET, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(raw);
  const updated = rewriteMarkdownLinks(content);
  const newContent = matter.stringify(updated, data);
  fs.writeFileSync(filePath, newContent, 'utf8');
}

// === STEP 5: Build Docusaurus site ===
console.log('🛠️  Building Docusaurus site...\n');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build complete.');
} catch (err) {
  console.error('❌ Build failed.');
}

