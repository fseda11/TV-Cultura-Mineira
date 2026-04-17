// build.js — lê os arquivos .md de content/noticias/ e gera noticias.json
const fs   = require('fs');
const path = require('path');

const dir = './content/noticias';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)/);
  if (!match) return { data: {}, body: content };
  const data = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = val;
  });
  return { data, body: (match[2] || '').trim() };
}

// Converte markdown simples em HTML para o campo corpo
function mdToHtml(md) {
  if (!md) return '';
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
    .replace(/^# (.+)$/gm,   '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,    '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => p.startsWith('<h') ? p : `<p>${p.replace(/\n/g,' ')}</p>`)
    .join('\n');
}

const noticias = files.map(file => {
  const raw  = fs.readFileSync(path.join(dir, file), 'utf-8');
  const { data, body } = parseFrontmatter(raw);
  return {
    slug:      file.replace('.md',''),
    titulo:    data.title    || data.titulo    || 'Sem título',
    resumo:    data.resumo   || body.slice(0,180).replace(/[#*\[\]]/g,'') + '...',
    categoria: data.categoria || 'Notícias',
    data:      data.date     || data.data      || '',
    imagem:    data.imagem   || '',
    link:      data.link     || '',
    corpo:     mdToHtml(body) || `<p>${data.resumo || ''}</p>`
  };
}).filter(Boolean);

noticias.sort((a,b) => new Date(b.data) - new Date(a.data));
fs.writeFileSync('./noticias.json', JSON.stringify(noticias, null, 2), 'utf-8');
console.log(`✅  noticias.json gerado com ${noticias.length} notícia(s).`);
