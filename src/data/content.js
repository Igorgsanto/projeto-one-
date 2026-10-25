export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'oi@novastudio.design';

export const navigation = [
  { label: 'Manifesto', href: '#manifesto', number: '01' },
  { label: 'Projetos', href: '#projetos', number: '02' },
  { label: 'Serviços', href: '#servicos', number: '03' },
  { label: 'Processo', href: '#processo', number: '04' },
  { label: 'Contato', href: '#contato', number: '05' },
];

export const projects = [
  {
    id: 'aura',
    number: '01',
    title: 'AURA',
    subtitle: 'Beleza em outra frequência.',
    year: '2026',
    category: 'E-commerce · Direção de arte',
    image: '/images/aura.webp',
    alt: 'Frasco de perfume escultural em vidro violeta com um anel de luz ao redor',
    description: 'Uma flagship digital para uma marca de perfumaria experimental. Luz, matéria e movimento se encontram em uma jornada de compra que parece mais uma instalação do que uma loja.',
    services: ['Estratégia digital', 'Direção de arte', 'E-commerce', 'Motion'],
    color: '#9f88ff',
  },
  {
    id: 'kyn',
    number: '02',
    title: 'KYN',
    subtitle: 'Arquitetura para o amanhã.',
    year: '2026',
    category: 'Identidade digital · WebGL',
    image: '/images/kyn.webp',
    alt: 'Pavilhão brutalista futurista iluminado ao anoitecer',
    description: 'Um arquivo vivo para um estúdio de arquitetura que projeta espaços impossíveis. A navegação espacial e os contrastes cinematográficos colocam cada obra no centro da experiência.',
    services: ['Identidade digital', 'UX/UI', 'WebGL', 'Desenvolvimento'],
    color: '#ffb873',
  },
  {
    id: 'sona',
    number: '03',
    title: 'SØNA',
    subtitle: 'O som ganha forma.',
    year: '2025',
    category: 'Produto digital · Motion',
    image: '/images/sona.webp',
    alt: 'Escultura abstrata de som em metal líquido violeta e coral',
    description: 'Uma plataforma de descoberta sonora que transforma frequências em paisagens visuais. O sistema reage ao ritmo e dá a cada artista uma presença digital singular.',
    services: ['Produto digital', 'Design system', 'Motion', 'Creative coding'],
    color: '#ff927d',
  },
  {
    id: 'pulso',
    number: '04',
    title: 'PULSO',
    subtitle: 'Dados com pulso humano.',
    year: '2025',
    category: 'Fintech · Experiência',
    image: '/images/pulso.webp',
    alt: 'Paisagem de dados com uma onda luminosa violeta e um monolito de vidro',
    description: 'Uma nova linguagem para tornar finanças mais intuitivas. Visualizações fluidas e uma interface precisa transformam informação complexa em decisões claras.',
    services: ['Pesquisa', 'UX/UI', 'Data visualization', 'Front-end'],
    color: '#8e7dff',
  },
];

export const services = [
  {
    number: '01',
    title: 'Estratégia & Direção',
    description: 'Encontramos a ideia que torna tudo inevitável. Pesquisa, posicionamento e direção criativa para construir experiências com propósito — não apenas presença.',
    tags: ['Imersão', 'Estratégia digital', 'Direção criativa', 'Narrativa'],
  },
  {
    number: '02',
    title: 'Design de Experiências',
    description: 'Desenhamos jornadas intuitivas com uma estética que pertence só à sua marca. Cada tela, transição e detalhe trabalha na mesma direção.',
    tags: ['UX/UI', 'Websites', 'E-commerce', 'Design systems'],
  },
  {
    number: '03',
    title: 'Movimento & 3D',
    description: 'Criamos profundidade, ritmo e resposta. Do microdetalhe à cena imersiva, usamos movimento para contar histórias e orientar a atenção.',
    tags: ['Motion design', 'WebGL', '3D', 'Interações'],
  },
  {
    number: '04',
    title: 'Código Criativo',
    description: 'Transformamos o conceito em uma experiência rápida, acessível e robusta. Design e desenvolvimento evoluem juntos, sem perder nada pelo caminho.',
    tags: ['React', 'Creative development', 'Performance', 'Acessibilidade'],
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Imersão',
    duration: '01—02 semanas',
    description: 'Escutamos, questionamos e mergulhamos no universo da marca. Mapeamos o desafio e alinhamos uma ambição comum.',
  },
  {
    number: '02',
    title: 'Direção',
    duration: '02—03 semanas',
    description: 'Transformamos estratégia em um território visual. Narrativa, referências e protótipos tornam a ideia tangível.',
  },
  {
    number: '03',
    title: 'Construção',
    duration: '04—08 semanas',
    description: 'Design, movimento e código avançam em ciclos curtos. Você acompanha tudo de perto, sem grandes revelações no escuro.',
  },
  {
    number: '04',
    title: 'Órbita',
    duration: 'Contínuo',
    description: 'Lançamos, medimos e refinamos. O projeto sai para o mundo com documentação, autonomia e espaço para evoluir.',
  },
];

export const testimonials = [
  {
    quote: 'A NØVA não entregou apenas um site. Encontrou uma linguagem que a gente ainda não sabia procurar — e que agora atravessa toda a marca.',
    name: 'Marina Costa',
    role: 'Co-fundadora, AURA',
    initials: 'MC',
  },
  {
    quote: 'Eles equilibram ousadia e clareza de um jeito raro. Cada decisão visual tinha intenção, e cada interação fazia a experiência ficar mais simples.',
    name: 'Rafael Kim',
    role: 'Diretor criativo, KYN',
    initials: 'RK',
  },
  {
    quote: 'Pela primeira vez, tecnologia e identidade pareceram a mesma conversa. O processo foi próximo, preciso e genuinamente transformador.',
    name: 'Luiza Sørensen',
    role: 'Head de produto, SØNA',
    initials: 'LS',
  },
  {
    quote: 'O projeto mudou a forma como as pessoas entendem nosso produto. Complexidade virou uma experiência fluida, bonita e humana.',
    name: 'Caio Mendes',
    role: 'Co-fundador, PULSO',
    initials: 'CM',
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Behance', href: 'https://www.behance.net/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];
