// build.js — lê as notícias em markdown e gera noticias.json
const fs = require('fs');
const path = require('path');

const dir = './content/noticias';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, body: content };

  const data = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = val;
  });

  const body = content.slice(match[0].length).trim();
  return { data, body };
}

const noticias = files.map(file => {
  const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
  const { data, body } = parseFrontmatter(raw);

  return {
    titulo:    data.title    || data.titulo    || 'Sem título',
    resumo:    data.resumo   || body.slice(0, 180).replace(/[#*]/g, '') + '...',
    categoria: data.categoria || 'Notícias',
    data:      data.date     || data.data      || '',
    imagem:    data.imagem   || '',
    link:      data.link     || '',
    slug:      file.replace('.md', '')
  };
}).filter(Boolean);

// Ordena da mais recente para a mais antiga
noticias.sort((a, b) => new Date(b.data) - new Date(a.data));

fs.writeFileSync('./noticias.json', JSON.stringify(noticias, null, 2), 'utf-8');
console.log(`✅ noticias.json gerado com ${noticias.length} notícia(s).`);
