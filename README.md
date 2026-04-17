# 📺 TV Cultura Mineira — Guia de Publicação

## Como seu pai publica uma notícia

1. Acesse: **seusite.netlify.app/admin**
2. Faça login com o e-mail cadastrado
3. Clique em **"Notícias"** no menu lateral
4. Clique em **"Nova Notícia"**
5. Preencha:
   - **Título** — o título da notícia
   - **Resumo** — 2 ou 3 linhas que aparecem na capa
   - **Categoria** — selecione na lista
   - **Data** — data de publicação
   - **Imagem de capa** — clique em "Choose an image" para fazer upload
   - **Texto completo** — o texto da notícia
6. Clique em **"Publish"** (publicar)
7. Aguarde ~40 segundos e a notícia aparece no site ✅

---

## Configuração inicial (feita uma única vez pelo técnico)

### Passo 1 — Criar conta no GitHub
1. Acesse https://github.com e crie uma conta gratuita
2. Clique em **"New repository"**
3. Nome: `tv-cultura-mineira`
4. Marque **"Public"**
5. Clique em **"Create repository"**

### Passo 2 — Fazer upload dos arquivos
1. Na página do repositório, clique em **"uploading an existing file"**
2. Arraste TODOS os arquivos desta pasta para a área de upload
3. Clique em **"Commit changes"**

### Passo 3 — Conectar ao Netlify
1. Acesse https://netlify.com e crie uma conta gratuita
2. Clique em **"Add new site" → "Import an existing project"**
3. Escolha **GitHub** e autorize
4. Selecione o repositório `tv-cultura-mineira`
5. Em **Build command**: `node build.js`
6. Em **Publish directory**: `.` (apenas um ponto)
7. Clique em **"Deploy site"**

### Passo 4 — Ativar o painel de admin (Netlify Identity)
1. No painel do Netlify, vá em **"Identity"** no menu superior
2. Clique em **"Enable Identity"**
3. Em **"Registration preferences"** selecione **"Invite only"**
4. Vá em **"Git Gateway"** e clique em **"Enable Git Gateway"**
5. Volte em **"Identity"** e clique em **"Invite users"**
6. Digite o e-mail do seu pai e clique em **"Send"**
7. Seu pai receberá um e-mail — ele deve clicar no link e criar uma senha

### Passo 5 — Acessar o painel
- URL do painel: **seusite.netlify.app/admin**
- Login: e-mail e senha criados no passo anterior

---

## Como adicionar o link do Ao Vivo

No arquivo `index.html`, procure por:
```
SEU_LINK_AO_VIVO_AQUI
```
(aparece 4 vezes no arquivo)

Substitua todas as ocorrências pelo link real do stream,
por exemplo: `https://www.youtube.com/watch?v=xxxx`

---

## Estrutura de arquivos

```
/
├── index.html          ← O site principal
├── noticias.json       ← Gerado automaticamente (não edite)
├── build.js            ← Script que gera o noticias.json
├── netlify.toml        ← Configurações do Netlify
├── package.json        ← Informações do projeto
├── admin/
│   ├── index.html      ← Painel de administração
│   └── config.yml      ← Configuração do painel
├── content/
│   └── noticias/       ← Cada notícia é um arquivo .md aqui
└── imagens/            ← Fotos enviadas pelo painel
```
