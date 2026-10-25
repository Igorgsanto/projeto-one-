# NØVA® Studio — Design sem gravidade

Portfólio/estúdio de web design em uma única página, concebido como uma narrativa cinematográfica controlada pelo scroll. A direção visual combina preto profundo, off-white, violeta elétrico, tipografia editorial e uma escultura 3D reativa.

> NØVA, os projetos e os depoimentos são conceituais e foram criados para esta demonstração. Substitua textos, contatos e links antes de usar como portfólio real.

## Experiência

- Loader com contador e saída em cortina.
- Hero com React Three Fiber, partículas, parallax de mouse e resposta ao scroll.
- Manifesto sticky com palavras iluminadas progressivamente via scrub.
- Projetos em scroll horizontal pinado, displacement no hover e modais de detalhes.
- Accordion de serviços, timeline de processo e carrossel com drag/inércia.
- Formulário com campos animados e botões magnéticos.
- Menu fullscreen com stagger, cursor customizado, marquees e relógio local de São Paulo.
- Fallbacks para mobile, ausência de WebGL e `prefers-reduced-motion`.

## Stack

React 19 · Vite 6 · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Three.js + React Three Fiber · Framer Motion

## Rodar localmente

Requisitos: **Node.js 20.19+ ou 22.12+** e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

### Build de produção

```bash
npm run build
npm run preview
```

O build é gerado em `dist/`. O projeto inclui `vercel.json` com framework, output, rewrites e cache de assets já configurados.

## Estrutura

```text
public/
  fonts/                 # Fontes locais, preload e licenças OFL
  images/                # WebP original + variantes responsivas de 768 px
  favicon.svg
  robots.txt
src/
  components/
    hero/                # Hero e cena 3D
    layout/              # Loader, navegação, smooth scroll e footer
    projects/            # Cards, galeria horizontal e modal
    sections/            # Manifesto, serviços, processo, depoimentos e contato
    ui/                  # Cursor, ícones, magnetismo, marquee e headings
  data/content.js        # Projetos, serviços, etapas, depoimentos e links
  hooks/                 # Media query e narrativa de scroll
  lib/animation.js       # Tokens globais de duração e stagger
  styles/global.css      # Tailwind, tema, layout e responsividade
  App.jsx
  main.jsx
```

## Como personalizar

### Cores e tipografia

- Edite os tokens em `@theme` e `:root` dentro de `src/styles/global.css`.
- As cores de cada capítulo estão nos atributos `data-bg` das seções; o hook `useNarrative` faz a transição gradual entre elas.
- A escultura usa materiais/luzes próprios em `src/components/hero/HeroScene.jsx`.
- Space Grotesk e Inter estão hospedadas localmente em `public/fonts/`. Se trocar os arquivos, atualize os `@font-face` e os preloads em `index.html`.

### Textos e projetos

- A maior parte do conteúdo está centralizada em `src/data/content.js`.
- O título e a chamada do hero estão em `src/components/hero/Hero.jsx`.
- Para trocar um projeto, substitua os dois WebP correspondentes em `public/images/` e mantenha os nomes definidos no data file. A versão `-768.webp` é servida em telas menores.
- Troque os links sociais em `socialLinks` e os textos de disponibilidade em `Navigation`, `Contact` e `Footer`.

### Animações

- `src/lib/animation.js` concentra duração do loader, reveal do hero, stagger dos títulos e velocidade do Lenis.
- Cada cena mais específica está comentada junto ao componente: manifesto, horizontal pinado, timeline e displacement.
- Para reduzir a intensidade, comece diminuindo `stagger`, distâncias de `y` e o valor `scale` do displacement. Não remova as regras de `prefers-reduced-motion`.

### Formulário e contato

Copie `.env.example` para `.env.local`:

```bash
VITE_CONTACT_EMAIL=seu@email.com
```

Sem endpoint, o formulário **não simula envio**: ele prepara a mensagem e oferece abrir no aplicativo de e-mail ou copiar o texto.

Para envio direto, configure também:

```bash
VITE_CONTACT_ENDPOINT=https://sua-api.com/contato
```

O endpoint deve aceitar `POST` em JSON com `name`, `email`, `company`, `budget` e `message`, e retornar um status HTTP 2xx. Em produção, cadastre essas variáveis no painel da Vercel.

## Acessibilidade e performance

- HTML semântico, skip link, foco visível, modais/menu com foco contido e Escape.
- Navegação por teclado nos accordions, controles e formulário.
- WebGL desativado em telas até 768 px, em dispositivos sem suporte e com movimento reduzido.
- Canvas pausado fora do viewport, partículas reduzidas em telas menores e imagens lazy-loaded/responsivas.
- Fontes locais com preload, Three.js separado do bundle principal e cache imutável de assets.

Última auditoria Lighthouse local do build de produção (perfil mobile, 25/10/2026):

| Performance | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- |
| **93** | **100** | **100** | **100** |

Métricas: LCP 2,8 s · TBT 40 ms · CLS 0. Resultados podem variar conforme dispositivo, rede e extensões do navegador.

## Deploy na Vercel

Para um novo deploy pelo Git, importe o repositório na Vercel e use:

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

Essas opções também já estão no `vercel.json`. Não é necessário backend para o modo de contato por e-mail.
