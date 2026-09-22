export type AudienceSlug = "retail" | "institutional" | "b2b";
export type ContentCategorySlug =
  | "narrative"
  | "research"
  | "promotional"
  | "multimedia"
  | "technical";
export type WorkKind = "content" | "brand" | "narrative" | "studio";
export type BrandTreatment =
  | "cut"
  | "wide"
  | "stack"
  | "mono"
  | "condensed"
  | "editorial";

export type Audience = {
  slug: AudienceSlug;
  name: string;
  short: string;
  story: string;
  image: string;
  imageAlt: string;
};

export type ContentCategory = {
  slug: ContentCategorySlug;
  name: string;
  short: string;
  story: string;
  image: string;
  imageAlt: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  note?: string;
  audience: AudienceSlug;
  category: ContentCategorySlug;
  date: string;
  minutes?: number;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  body?: string;
  href?: string;
  source?: string;
  collection?:
    | "d-core"
    | "docs"
    | "7702"
    | "academy"
    | "coalition"
    | "messari"
    | "devs"
    | "papers";
  also?: AudienceSlug[];
  alsoCategory?: ContentCategorySlug[];
  video?: { youtube?: string; src?: string; poster?: string };
  hideFromAudience?: boolean;
};

export type BrandIdentity = {
  wordmark: string;
  treatment: BrandTreatment;
  field: "invert" | "light";
  typeface: string;
  color: string;
};

export type Brand = {
  slug: string;
  name: string;
  dek: string;
  audience: AudienceSlug;
  kind: "brand" | "narrative";
  year: string;
  role: string;
  cover: string;
  coverAlt: string;
  identity: BrandIdentity;
  client?: string;
  featured?: boolean;
  also?: AudienceSlug[];
  problem: string;
  work: string;
  made: string[];
};

export type StudioItem = {
  slug: string;
  title: string;
  dek: string;
  format: "podcast" | "talk" | "film";
  audience: AudienceSlug;
  date: string;
  duration: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  body: string;
  href?: string;
  source?: string;
  youtube?: string;
  featuredPlay?: boolean;
};

export type WorkCard = {
  slug: string;
  title: string;
  dek: string;
  note?: string;
  audience: AudienceSlug;
  kind: WorkKind;
  date: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  identity?: BrandIdentity;
  category?: ContentCategorySlug;
  source?: string;
  external?: string;
  href?: {
    to: "/a/$slug" | "/brands/$slug" | "/studio";
    params?: { slug: string };
  };
};

export const SITE = {
  name: "Carlos Cano",
  role: "Product marketing, branding & research",
  field: "Web3",
  email: "carloscancab@gmail.com",
  x: "https://x.com/WordAbstractor",
  xHandle: "WordAbstractor",
  linkedin: "https://www.linkedin.com/in/carloscancab",
  statement: "Everybody wants to be understood.",
  cycle: ["understood", "believed", "useful"] as const,
  lede: "I build brands, narratives, and content in Web3. For people, not “users.”",
  results: [
    "10+ years of branding and content experience, collaborating on fundraises totaling $75M.",
    "Deep expertise in Web3 and crypto, collaborating on different projects with names like Binance Labs, Circle, and Solana.",
    "Built one of the narratives that dominated Web3 conversations for over a year.",
    "Taken products from idea to top-10 in extremely competitive sectors.",
    "A passion for turning complex ideas into marketable concepts.",
  ],
  reconstruction:
    "I'm still adding content to this site. Some pages may not work yet. Yours truly, Carlos.",
};

export const NOW = {
  updated: "2026-09-04",
  lede: "From Parral, Chihuahua.",
  sections: [
    {
      title: "Location",
      body: "I'm in Parral, Chihuahua, Mexico.",
    },
    {
      title: "Work",
      body: "I spent almost three years at Particle Network, leading ecosystem and strategy. That's done. I'm looking for the next career move. Slowly, on purpose.",
    },
    {
      title: "Music",
      body: "I'm using the time to work on music, as Carlos Maximiliano. The TikTok grew to 1,500. I'm happy with that.",
    },
    {
      title: "This site",
      body: "Rebuilding it. Some pages are empty. If a page isn't ready, it isn't linked.",
    },
  ],
};

const LEGACY_CATEGORY: Record<string, ContentCategorySlug> = {
  essays: "narrative",
  notes: "promotional",
  briefs: "multimedia",
};

export function remapCategory(raw: unknown): ContentCategorySlug | undefined {
  if (typeof raw !== "string") return undefined;
  if (contentCategories.some((c) => c.slug === raw)) {
    return raw as ContentCategorySlug;
  }
  return LEGACY_CATEGORY[raw];
}

export const audiences: Audience[] = [
  {
    slug: "retail",
    name: "Retail",
    short: "Consumers",
    story:
      "For people who will actually touch the product, and tell someone else.",
    image: "/images/retail.jpg",
    imageAlt: "Ink brush drawing of a hand holding a small round object",
  },
  {
    slug: "institutional",
    name: "Institutional",
    short: "Desks & funds",
    story:
      "Identities and research for those with capital at stake.",
    image: "/images/institutional.jpg",
    imageAlt: "Ink brush drawing of a monumental stone gate",
  },
  {
    slug: "b2b",
    name: "B2B",
    short: "Teams",
    story:
      "Tech is extremely high-leverage. But people need to understand it first.",
    image: "/images/b2b.jpg",
    imageAlt: "Ink brush drawing of a low table, a notebook, and a cup",
  },
];

export const contentCategories: ContentCategory[] = [
  {
    slug: "narrative",
    name: "Narrative",
    short: "Argument",
    story:
      "Thought leadership, mostly for an industry that's still discovering itself.",
    image: "/images/narrative.jpg",
    imageAlt: "Ink brush drawing of a hanging scroll with one quiet line",
  },
  {
    slug: "research",
    name: "Research",
    short: "Evidence",
    story:
      "More data-oriented work, often to aid key decision-makers.",
    image: "/images/research.jpg",
    imageAlt: "Ink brush drawing of an ink stone and a resting brush",
  },
  {
    slug: "promotional",
    name: "Promotional",
    short: "In market",
    story:
      "Commercial writing. Launches, campaigns, anything that aims to convert.",
    image: "/images/promotional.jpg",
    imageAlt: "Ink brush drawing of hanging campaign banners",
  },
  {
    slug: "multimedia",
    name: "Multimedia",
    short: "Recorded",
    story:
      "Videos and podcasts I conceptualized, directed, influenced, or participated in.",
    image: "/images/multimedia.jpg",
    imageAlt: "Ink brush drawing of a condenser microphone",
  },
  {
    slug: "technical",
    name: "Technical",
    short: "Mechanism",
    story:
      "Writing for technical audiences. To the point.",
    image: "/images/technical.jpg",
    imageAlt: "Ink brush drawing of a carpenter’s square",
  },
];

export const articles: Article[] = [
  {
    slug: "what-is-chain-abstraction",
    title: "What is chain abstraction?",
    dek: "A formal definition of chain abstraction.",
    audience: "b2b",
    category: "narrative",
    date: "2024-06-12",
    cover: "/images/cases/particle/definition.jpg",
    coverAlt: "What is chain abstraction?",
    featured: true,
    href: "https://blog.particle.network/what-is-chain-abstraction-a-formal-definition/",
    source: "Particle Network",
    also: ["retail", "institutional"],
  },
  {
    slug: "lessons-from-a-chain-agnostic-app",
    title: "Lessons from a chain-agnostic app",
    dek: "Standing out is easy. Making it stick is the work.",
    audience: "retail",
    category: "narrative",
    date: "2025-07-15",
    cover: "/images/cases/universalx/og-lessons.png",
    coverAlt: "Lessons from a chain-agnostic app",
    featured: true,
    href: "https://blog.particle.network/universalx-2/",
    source: "Particle Network",
    also: ["b2b"],
  },
  {
    slug: "state-of-web3-fragmentation",
    title: "State of Web3 fragmentation",
    dek: "Addressing Web3’s biggest problem, and its solution.",
    audience: "b2b",
    category: "research",
    date: "2024-06-20",
    cover: "/images/cases/particle/frag-hero.jpg",
    coverAlt: "Web3 fragmentation report",
    featured: true,
    href: "https://blog.particle.network/quantifying-the-impact-of-chain-abstraction-exposing-web3s-inefficiencies/",
    source: "Particle Network",
    also: ["retail", "institutional"],
  },
  {
    slug: "mapping-the-territory",
    title: "Mapping the territory",
    dek: "A map of projects working on chain abstraction.",
    audience: "b2b",
    category: "research",
    date: "2024-04-18",
    cover: "/images/cases/particle/landscape.jpg",
    coverAlt: "Chain abstraction landscape",
    href: "https://blog.particle.network/chain-abstraction-landscape-report/",
    source: "Particle Network",
    also: ["institutional"],
  },
  {
    slug: "the-limits-and-the-core",
    title: "The limits and the core",
    dek: "Blockchain-level, account-level, application-level.",
    audience: "b2b",
    category: "research",
    date: "2024-05-16",
    cover: "/images/cases/particle/levels-hero.jpg",
    coverAlt: "Multi-level chain abstraction",
    href: "https://blog.particle.network/chain-abstraction-levels-user-experience/",
    source: "Particle Network",
  },
  {
    slug: "welcome-to-universalx",
    title: "Welcome to UniversalX",
    dek: "The first chain-agnostic, 100% non-custodial trading platform.",
    audience: "retail",
    category: "promotional",
    date: "2024-12-03",
    cover: "/images/cases/universalx/og-launch.png",
    coverAlt: "Welcome to UniversalX",
    featured: true,
    href: "https://blog.particle.network/universalx/",
    source: "Particle Network",
    also: ["b2b"],
  },
  {
    slug: "universalx-v2",
    title: "UniversalX V2",
    dek: "Trade like a pro. Never bridge again.",
    audience: "retail",
    category: "promotional",
    date: "2025-01-15",
    cover: "/images/cases/universalx/og-v2.png",
    coverAlt: "UniversalX V2",
    featured: true,
    href: "https://blog.particle.network/universalx-v2/",
    source: "Particle Network",
  },
  {
    slug: "universalx-v3",
    title: "UniversalX V3",
    dek: "Diamonds. Cash for trading. Cabals.",
    audience: "retail",
    category: "promotional",
    date: "2025-06-10",
    cover: "/images/cases/universalx/og-v3.png",
    coverAlt: "UniversalX V3",
    featured: true,
    href: "https://blog.particle.network/universalx-v3/",
    source: "Particle Network",
  },
  {
    slug: "the-chain-abstraction-coalition",
    title: "The Chain Abstraction Coalition",
    dek: "An ecosystem initiative. Get projects in the room, talking about the same problem.",
    audience: "b2b",
    category: "promotional",
    date: "2024-07-04",
    cover: "/images/cases/particle/coalition.png",
    coverAlt: "The Chain Abstraction Coalition",
    featured: true,
    href: "https://blog.particle.network/many-blockchains-one-mission-introducing-the-chain-abstraction-coalition/",
    source: "Particle Network",
    collection: "coalition",
    also: ["institutional"],
  },
  {
    slug: "particle-25m-raise",
    title: "Raised to unify all chains",
    dek: "Brand and investor materials for a $25M raise. Alibaba Group, Binance Labs, Avalanche, Spartan.",
    audience: "institutional",
    category: "promotional",
    date: "2024-03-01",
    cover: "/images/cases/particle/raise.png",
    coverAlt: "Particle Network $25M raise",
    featured: true,
    href: "https://blog.particle.network/25-million-funding/",
    source: "Particle Network",
    also: ["b2b"],
  },
  {
    slug: "universal-accounts",
    title: "Universal Accounts",
    dek: "One account. One balance. Any chain. Account-level chain abstraction, shipped.",
    audience: "b2b",
    category: "technical",
    date: "2024-08-01",
    cover: "/images/cases/particle/ua-hero.png",
    coverAlt: "Universal Accounts",
    featured: true,
    href: "https://blog.particle.network/universal-accounts/",
    source: "Particle Network",
    also: ["retail"],
  },
  {
    slug: "universalx-launch-film",
    title: "UniversalX launch film",
    dek: "Launch film. Under a minute.",
    audience: "retail",
    category: "multimedia",
    date: "2024-12-03",
    cover: "/images/cases/universalx/launch-hero.png",
    coverAlt: "UniversalX launch film",
    featured: true,
    href: "/brands/universal-x#the-film",
    source: "On this site",
    alsoCategory: ["promotional"],
    video: {
      src: "/videos/particle/universalx-launch.mp4",
      poster: "/images/cases/universalx/launch-hero.png",
    },
  },
  {
    slug: "opensea-any-chain",
    title: "OpenSea, any chain",
    dek: "OpenSea in the same account. Any chain.",
    audience: "retail",
    category: "multimedia",
    date: "2024-12-10",
    cover: "/images/cases/universalx/opensea.jpg",
    coverAlt: "OpenSea in UniversalX",
    href: "/brands/universal-x#the-film",
    source: "On this site",
    alsoCategory: ["promotional"],
    video: {
      src: "/videos/particle/opensea-demo.mp4",
      poster: "/images/cases/universalx/opensea.jpg",
    },
  },
  {
    slug: "institutional-crypto-guide",
    title: "Institutional crypto guide",
    dek: "A primer for desks and funds entering digital assets.",
    audience: "institutional",
    category: "research",
    date: "2023-02-16",
    cover: "/images/cases/dcore/guide.jpg",
    coverAlt: "Institutional crypto guide",
    featured: true,
    href: "https://d-core.net/wp-content/uploads/2020/08/Market-Outlook-2023-BGM-and-DCore.pdf",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-ordinals",
    title: "Ordinals: Bitcoin artifacts",
    dek: "The controversial new use case on Bitcoin. A public D-Core briefing.",
    audience: "institutional",
    category: "research",
    date: "2023-03-01",
    cover: "/images/research.jpg",
    coverAlt: "Ordinals: Bitcoin artifacts",
    href: "https://d-core.net/wp-content/uploads/2020/08/Ordinals-Bitcoin-Artifacts-by-D-Core.pdf",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-exponent",
    title: "Exponent",
    dek: "Capital-as-a-Service for DAOs. Vaults, yield, risk monitoring.",
    audience: "institutional",
    category: "research",
    date: "2023-03-21",
    cover: "/images/research.jpg",
    coverAlt: "Exponent institutional report",
    href: "https://d-core.net/exponent-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-tenderize",
    title: "Tenderize",
    dek: "Liquid staking without the lockup tax.",
    audience: "institutional",
    category: "research",
    date: "2023-03-16",
    cover: "/images/research.jpg",
    coverAlt: "Tenderize institutional report",
    href: "https://d-core.net/tenderize-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-espresso",
    title: "Espresso Systems",
    dek: "Configurable asset privacy. Cheaper, more private Web3 apps.",
    audience: "institutional",
    category: "research",
    date: "2023-03-14",
    cover: "/images/research.jpg",
    coverAlt: "Espresso Systems institutional report",
    href: "https://d-core.net/espresso-systems-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-shutter",
    title: "Shutter Network",
    dek: "Threshold cryptography against MEV and frontrunning.",
    audience: "institutional",
    category: "research",
    date: "2023-03-10",
    cover: "/images/research.jpg",
    coverAlt: "Shutter Network institutional report",
    href: "https://d-core.net/shutter-network-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-nftperp",
    title: "nftperp",
    dek: "Long or short the floor. Perps on blue-chip NFT collections.",
    audience: "institutional",
    category: "research",
    date: "2023-03-07",
    cover: "/images/research.jpg",
    coverAlt: "nftperp institutional report",
    href: "https://d-core.net/nftperp-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-diva",
    title: "Diva",
    dek: "Distributed validation. Liquid staking without a single key-holder.",
    audience: "institutional",
    category: "research",
    date: "2023-03-01",
    cover: "/images/research.jpg",
    coverAlt: "Diva institutional report",
    href: "https://d-core.net/diva-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-knn3",
    title: "KNN3 Network",
    dek: "On-chain topology for developers. Relationships as data.",
    audience: "institutional",
    category: "research",
    date: "2023-02-24",
    cover: "/images/research.jpg",
    coverAlt: "KNN3 Network institutional report",
    href: "https://d-core.net/knn3-network-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-risc-zero",
    title: "RISC Zero",
    dek: "Zero-knowledge general compute. A VM that does not need a trusted third party.",
    audience: "institutional",
    category: "research",
    date: "2023-02-23",
    cover: "/images/research.jpg",
    coverAlt: "RISC Zero institutional report",
    href: "https://d-core.net/risc-zero-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "particle-docs",
    title: "Particle Network documentation",
    dek: "Universal Accounts, account abstraction, social login.",
    audience: "b2b",
    category: "technical",
    date: "2025-05-26",
    cover: "/images/docs/particle-docs.jpg",
    coverAlt: "Particle Network documentation",
    featured: true,
    href: "https://developers.particle.network/intro/introduction",
    source: "Particle Network",
    collection: "docs",
  },
  {
    slug: "panther-docs",
    title: "Panther Protocol documentation",
    dek: "Zero-knowledge, regulated Zones, shielded pools.",
    audience: "b2b",
    category: "technical",
    date: "2024-05-29",
    cover: "/images/docs/panther-docs.png",
    coverAlt: "Panther Protocol documentation",
    featured: true,
    href: "https://docs.pantherprotocol.io/docs",
    source: "Panther Protocol",
    collection: "docs",
  },
  {
    slug: "7702-collective",
    title: "The 7702 Collective",
    dek: "Co-founded with leading teams. EIP-7702, accounts people already have, infrastructure that consolidates.",
    audience: "institutional",
    category: "promotional",
    date: "2026-04-15",
    cover: "/images/cases/7702/collective.jpg",
    coverAlt: "The 7702 Collective",
    featured: true,
    href: "https://7702collective.com/",
    source: "7702 Collective",
    collection: "7702",
    also: ["b2b"],
  },
  {
    slug: "state-of-crypto-innovation",
    title: "The State of Crypto Innovation",
    dek: "The Collective’s first report. Infrastructure that is actually shipping.",
    audience: "institutional",
    category: "research",
    date: "2026-04-15",
    cover: "/images/cases/7702/collective.jpg",
    coverAlt: "The State of Crypto Innovation",
    featured: true,
    href: "https://7702collective.com/report.html",
    source: "7702 Collective",
    collection: "7702",
    also: ["b2b"],
  },
  {
    slug: "how-to-trade-universalx",
    title: "How to trade on UniversalX",
    dek: "Buy any token, any chain, no bridge. The first session, written down.",
    audience: "retail",
    category: "promotional",
    date: "2024-12-10",
    cover: "/images/cases/universalx/howto-1.png",
    coverAlt: "How to trade on UniversalX",
    featured: true,
    href: "https://blog.particle.network/how-to-trade-on-universalx-the-first-chain-agnostic-trading-platform/",
    source: "Particle Network",
  },
  {
    slug: "universalx-spot-opportunities",
    title: "Spotting trades on every chain",
    dek: "Radar, New, Blooming, Thriving. How to watch a fragmented market from one desk.",
    audience: "retail",
    category: "promotional",
    date: "2025-02-20",
    cover: "/images/cases/universalx/radar.png",
    coverAlt: "UniversalX Radar",
    href: "https://blog.particle.network/guide-using-universalx-to-spot-trading-opportunities-on-all-chains/",
    source: "Particle Network",
  },
  {
    slug: "bitcoin-101",
    title: "Bitcoin 101",
    dek: "From zero to holding BTC in one sitting. A public D-Core primer.",
    audience: "retail",
    category: "research",
    date: "2020-07-29",
    cover: "/images/cases/dcore/bitcoin-101.png",
    coverAlt: "Bitcoin 101",
    featured: true,
    href: "https://d-core.net/bitcoin-101-from-0-to-investing-in-one-sitting/",
    source: "D-Core",
  },
  {
    slug: "spotting-red-flags",
    title: "Spotting red flags in crypto",
    dek: "Tokenomics, teams, and the things that look obvious only after they blow up.",
    audience: "retail",
    category: "research",
    date: "2021-08-20",
    cover: "/images/research.jpg",
    coverAlt: "Spotting red flags in crypto",
    href: "https://d-core.net/spotting-red-flags-in-crypto-what-are-they-and-how-can-you-avoid-them/",
    source: "D-Core",
    also: ["institutional"],
  },
  {
    slug: "blockchain-thought-leaders",
    title: "Six blockchain thought leaders",
    dek: "A short list of people to follow.",
    audience: "retail",
    category: "narrative",
    date: "2021-07-22",
    cover: "/images/narrative.jpg",
    coverAlt: "Six blockchain thought leaders",
    href: "https://d-core.net/6-blockchain-thought-leaders-that-every-crypto-investor-should-follow-in-2022/",
    source: "D-Core",
  },
  {
    slug: "universal-sdk-public",
    title: "The Universal SDK is now public",
    dek: "Build chain-agnostic apps. No waitlist. No cost. The infra that already runs UniversalX.",
    audience: "b2b",
    category: "technical",
    date: "2025-07-23",
    cover: "/images/docs/particle-docs.jpg",
    coverAlt: "The Universal SDK is now public",
    featured: true,
    href: "https://blog.particle.network/the-universal-sdk-is-now-public-get-building-chain-agnostic-apps-today/",
    source: "Particle Network",
    collection: "devs",
  },
  {
    slug: "eip-7702-universal-accounts",
    title: "EIP-7702: Supercharging Universal Accounts",
    dek: "Any existing account, upgraded in place. Privy, Dynamic, Magic. No migration.",
    audience: "b2b",
    category: "technical",
    date: "2026-03-24",
    cover: "/images/cases/7702/video.jpg",
    coverAlt: "EIP-7702 Supercharging Universal Accounts",
    featured: true,
    href: "https://blog.particle.network/eip-7702/",
    source: "Particle Network",
    also: ["retail"],
    alsoCategory: ["multimedia", "promotional"],
    video: { youtube: "JmEcDiZnsGo", poster: "/images/cases/7702/video.jpg" },
  },
  {
    slug: "universal-accounts-deep-dive",
    title: "Universal Accounts: a deep dive",
    dek: "UX, DevX, and the implementation.",
    audience: "b2b",
    category: "technical",
    date: "2024-05-17",
    cover: "/images/cases/particle/ua-deep.jpg",
    coverAlt: "Universal Accounts deep dive",
    href: "https://blog.particle.network/universal-accounts-ux-devx-and-technical-impementation/",
    source: "Particle Network",
    collection: "devs",
  },
  {
    slug: "developer-overhaul-1",
    title: "Developer overhaul #1",
    dek: "SDK progress, a new site, guides. Transaction history across every chain in one call.",
    audience: "b2b",
    category: "technical",
    date: "2025-11-03",
    cover: "/images/docs/particle-docs.jpg",
    coverAlt: "Developer overhaul",
    href: "https://blog.particle.network/developer-overhaul-1/",
    source: "Particle Network",
    collection: "devs",
  },
  {
    slug: "berachain-chain-abstracted-app",
    title: "Build a chain-abstracted app on Berachain",
    dek: "A walkthrough. Universal Accounts in a live chain, start to finish.",
    audience: "b2b",
    category: "multimedia",
    date: "2025-04-01",
    cover: "/images/cases/particle/berachain-app.jpg",
    coverAlt: "Build a chain-abstracted app on Berachain",
    href: "https://www.youtube.com/watch?v=IFNRGIdkDto",
    source: "Particle Network",
    video: {
      youtube: "IFNRGIdkDto",
      poster: "/images/cases/particle/berachain-app.jpg",
    },
  },
  {
    slug: "modular-l1-chain-abstraction",
    title: "The modular L1 powering chain abstraction",
    dek: "One address, one balance, coordination underneath. The L1 pitch, written for teams.",
    audience: "b2b",
    category: "narrative",
    date: "2024-03-20",
    cover: "/images/cases/particle/l1.jpg",
    coverAlt: "Particle Network modular L1",
    featured: true,
    href: "https://blog.particle.network/particle-network-modular-l1-chain-abstraction-announcement/",
    source: "Particle Network",
    also: ["institutional"],
  },
  {
    slug: "panther-privacy-suite",
    title: "A DeFi privacy suite",
    dek: "PriFi: a DeFi privacy suite.",
    audience: "b2b",
    category: "narrative",
    date: "2022-04-06",
    cover: "/images/og/panther-suite.png",
    coverAlt: "A DeFi privacy suite",
    href: "https://blog.pantherprotocol.io/a-defi-privacy-suite-why-panther-is-different-and-necessary/",
    source: "Panther Protocol",
    also: ["institutional"],
  },
  {
    slug: "panther-open-source",
    title: "Panther’s codebase is now open-source",
    dek: "The architecture, after a Veridise audit.",
    audience: "b2b",
    category: "technical",
    date: "2025-06-01",
    cover: "/images/docs/panther-docs.png",
    coverAlt: "Panther codebase open-source",
    href: "https://blog.pantherprotocol.io/panther-protocols-codebase-is-now-open-source/",
    source: "Panther Protocol",
    collection: "devs",
  },
  {
    slug: "panther-programmable-privacy",
    title: "Programmable privacy is live",
    dek: "Deployed on Polygon. Confidential on-chain interactions with zero-knowledge credentials.",
    audience: "b2b",
    category: "promotional",
    date: "2025-03-31",
    cover: "/images/panther-protocol.jpg",
    coverAlt: "Programmable privacy is live",
    href: "https://blog.pantherprotocol.io/programmable-privacy-is-live-panther-protocol-deploys-on-polygon/",
    source: "Panther Protocol",
    also: ["institutional"],
  },
  {
    slug: "academy-zkp",
    title: "What is a zero-knowledge proof?",
    dek: "Explained at a few levels of difficulty.",
    audience: "retail",
    category: "narrative",
    date: "2022-08-10",
    cover: "/images/og/academy-zkp.png",
    coverAlt: "What is a zero-knowledge proof?",
    href: "https://blog.pantherprotocol.io/what-is-a-zero-knowledge-proof-example-explaining-zkps/",
    source: "Panther Academy",
    collection: "academy",
  },
  {
    slug: "academy-snarks-starks",
    title: "zk-SNARKs vs zk-STARKs",
    dek: "The two proof systems everything zero-knowledge sits on. How they differ.",
    audience: "b2b",
    category: "technical",
    date: "2022-09-02",
    cover: "/images/og/academy-snarks.png",
    coverAlt: "zk-SNARKs vs zk-STARKs",
    href: "https://blog.pantherprotocol.io/zk-snarks-vs-zk-starks-differences-in-zero-knowledge-technologies/",
    source: "Panther Academy",
    collection: "academy",
    also: ["retail"],
  },
  {
    slug: "academy-account-abstraction",
    title: "Ethereum account abstraction",
    dek: "What it is, how it works, and why a user should care.",
    audience: "b2b",
    category: "technical",
    date: "2022-11-16",
    cover: "/images/og/academy-aa.png",
    coverAlt: "Ethereum account abstraction",
    href: "https://blog.pantherprotocol.io/ethereum-account-abstraction-everything-you-need-to-know/",
    source: "Panther Academy",
    collection: "academy",
    also: ["retail"],
  },
  {
    slug: "academy-mev",
    title: "What is MEV in crypto?",
    dek: "Miner extractable value, explained.",
    audience: "retail",
    category: "narrative",
    date: "2022-10-01",
    cover: "/images/og/academy-mev.png",
    coverAlt: "What is MEV in crypto?",
    href: "https://blog.pantherprotocol.io/miner-extractable-value-the-good-the-bad-the-ugly/",
    source: "Panther Academy",
    collection: "academy",
  },
  {
    slug: "academy-staking",
    title: "Crypto staking",
    dek: "Misconceptions, benefits, risks, tax. What staking actually is.",
    audience: "retail",
    category: "narrative",
    date: "2022-09-20",
    cover: "/images/og/academy-zkp.png",
    coverAlt: "Crypto staking",
    href: "https://blog.pantherprotocol.io/crypto-staking-misconceptions-benefits-risks-taxation/",
    source: "Panther Academy",
    collection: "academy",
  },
  {
    slug: "academy-dark-pools",
    title: "On-chain dark pools",
    dek: "How institutions trade in size without showing the order.",
    audience: "institutional",
    category: "research",
    date: "2023-04-10",
    cover: "/images/og/academy-dark.png",
    coverAlt: "On-chain dark pools",
    href: "https://blog.pantherprotocol.io/on-chain-dark-pools-the-missing-piece-to-bridge-enterprise-capital-to-defi/",
    source: "Panther Academy",
    collection: "academy",
  },
  {
    slug: "academy-zkevm",
    title: "What is a zkEVM?",
    dek: "From smart contracts to rollups. The race to make Ethereum scale without giving up the EVM.",
    audience: "b2b",
    category: "technical",
    date: "2022-08-30",
    cover: "/images/og/academy-zkevm.png",
    coverAlt: "What is a zkEVM?",
    href: "https://blog.pantherprotocol.io/what-is-a-zkevm-heres-everything-you-need-to-know/",
    source: "Panther Academy",
    collection: "academy",
    also: ["retail"],
  },
  {
    slug: "academy-trusted-setups",
    title: "A guide to trusted setups",
    dek: "The ceremony behind several proof systems. Why it exists, and what replaced it.",
    audience: "b2b",
    category: "technical",
    date: "2022-09-13",
    cover: "/images/og/academy-trusted.png",
    coverAlt: "A guide to trusted setups",
    href: "https://blog.pantherprotocol.io/a-guide-to-understanding-trusted-setups/",
    source: "Panther Academy",
    collection: "academy",
    also: ["retail"],
  },
  {
    slug: "academy-zk-rollups",
    title: "ZK-rollup projects",
    dek: "Inner workings, why they matter, and who is actually shipping.",
    audience: "b2b",
    category: "technical",
    date: "2022-08-26",
    cover: "/images/og/academy-rollups.jpg",
    coverAlt: "ZK-rollup projects",
    href: "https://blog.pantherprotocol.io/zk-rollup-projects-inner-workings-importance-analysis/",
    source: "Panther Academy",
    collection: "academy",
    also: ["retail"],
  },
  {
    slug: "particle-explained",
    title: "Particle Network, in five minutes",
    dek: "Particle Network explained in five minutes.",
    audience: "retail",
    category: "multimedia",
    date: "2024-06-01",
    cover: "/images/cases/particle/ua-hero.png",
    coverAlt: "Particle Network explained",
    featured: true,
    href: "https://www.youtube.com/watch?v=j9sVJkxzoVU",
    source: "Particle Network",
    also: ["b2b"],
    alsoCategory: ["promotional"],
    video: {
      youtube: "j9sVJkxzoVU",
      poster: "/images/cases/particle/ua-hero.png",
    },
  },
  {
    slug: "supercharge-onboarding",
    title: "Supercharge onboarding",
    dek: "Wallet-as-a-Service, explained.",
    audience: "b2b",
    category: "multimedia",
    date: "2023-11-01",
    cover: "/images/docs/particle-docs.jpg",
    coverAlt: "Supercharge onboarding with Particle Network",
    href: "https://www.youtube.com/watch?v=PIorEfDWRiE",
    source: "Particle Network",
    video: {
      youtube: "PIorEfDWRiE",
      poster: "/images/docs/particle-docs.jpg",
    },
  },
  {
    slug: "parti-diamonds",
    title: "Time to trade: $PARTI Diamonds",
    dek: "A season of rewards on UniversalX. Trade, refer, the booster for people who were already there.",
    audience: "retail",
    category: "promotional",
    date: "2025-03-11",
    cover: "/images/cases/universalx/og-v3.png",
    coverAlt: "PARTI Diamonds on UniversalX",
    href: "https://blog.particle.network/time-to-trade-on-universalx-introducing-parti-diamonds/",
    source: "Particle Network",
  },
  {
    slug: "cha-relevant-2025",
    title: "Is chain abstraction still relevant in 2025?",
    dek: "What shipped, and what didn’t, a year later.",
    audience: "b2b",
    category: "narrative",
    date: "2025-06-19",
    cover: "/images/cases/particle/frag-hero.jpg",
    coverAlt: "Is chain abstraction still relevant in 2025?",
    featured: true,
    href: "https://blog.particle.network/is-chain-abstraction-relevant-in-2025/",
    source: "Particle Network",
    also: ["institutional", "retail"],
  },
  {
    slug: "transcending-onchain",
    title: "Transcending onchain",
    dek: "A universal layer for RWAs, stablecoins, and digital assets. Retail-ready, still non-custodial.",
    audience: "b2b",
    category: "narrative",
    date: "2025-08-04",
    cover: "/images/cases/particle/ua-hero.png",
    coverAlt: "Transcending onchain",
    href: "https://blog.particle.network/transcending-onchain-announcing-the-universal-layer-for-rwas-stablecoins-digital-assets/",
    source: "Particle Network",
    also: ["retail", "institutional"],
  },
  {
    slug: "chain-abstract-everything",
    title: "Chain-abstract everything",
    dek: "EIP-7702 in production, then two products. Deposit widget. The rest of the stack.",
    audience: "b2b",
    category: "promotional",
    date: "2026-05-03",
    cover: "/images/cases/7702/video.jpg",
    coverAlt: "Chain-abstract everything",
    href: "https://blog.particle.network/chain-abstract-everything-announcing-2-upcoming-products/",
    source: "Particle Network",
  },
  {
    slug: "messari-understanding-particle",
    title: "Understanding Particle Network",
    dek: "Messari’s primer. Universal Accounts, Universal Liquidity, Universal Gas.",
    note: "I helped write it.",
    audience: "institutional",
    category: "research",
    date: "2024-06-21",
    cover: "/images/og/messari-understanding.png",
    coverAlt: "Understanding Particle Network, Messari",
    featured: true,
    href: "https://messari.io/report/understanding-particle-network",
    source: "Messari",
    collection: "messari",
    also: ["b2b"],
  },
  {
    slug: "messari-particle-q1-2025",
    title: "State of Particle Network Q1 2025",
    dek: "110,900 Universal Accounts. +557.6% QoQ. UniversalX volume, the TGE.",
    note: "I helped write it.",
    audience: "institutional",
    category: "research",
    date: "2025-05-29",
    cover: "/images/cases/particle/messari.jpg",
    coverAlt: "State of Particle Network Q1 2025, Messari",
    featured: true,
    href: "https://messari.io/report/state-of-particle-network-q1-2025",
    source: "Messari",
    collection: "messari",
    also: ["b2b"],
  },
  {
    slug: "fragmentation-2025",
    title: "Web3 fragmentation report (vol. 2)",
    dek: "TVL, users, and fragmentation a year later. New numbers.",
    audience: "b2b",
    category: "research",
    date: "2025-07-03",
    cover: "/images/og/frag2.png",
    coverAlt: "Web3 fragmentation report, volume 2",
    featured: true,
    href: "https://blog.particle.network/web3-fragmentation-report-2025/",
    source: "Particle Network",
    also: ["retail", "institutional"],
  },
  {
    slug: "panther-public-sale",
    title: "$22M public sale, ninety minutes",
    dek: "Panther’s public sale of $ZKP. Registrations, KYC, tokenomics.",
    audience: "institutional",
    category: "promotional",
    date: "2021-11-16",
    cover: "/images/og/panther-sale.png",
    coverAlt: "Panther Protocol public sale",
    featured: true,
    href: "https://blog.pantherprotocol.io/community-update-7-d3289cec4a5f/",
    source: "Panther Protocol",
    also: ["retail", "b2b"],
  },
  {
    slug: "particle-whitepaper",
    title: "Particle Network whitepaper",
    dek: "Universal Accounts, Universal Liquidity, Universal Gas.",
    audience: "b2b",
    category: "technical",
    date: "2024-05-02",
    cover: "/images/docs/particle-docs.jpg",
    coverAlt: "Particle Network whitepaper",
    featured: true,
    href: "https://whitepaper.particle.network",
    source: "Particle Network",
    collection: "papers",
    also: ["institutional"],
    alsoCategory: ["research"],
  },
  {
    slug: "panther-whitepaper",
    title: "Panther Protocol whitepaper",
    dek: "End-to-end privacy for DeFi. zkSNARKs, zAssets, the architecture.",
    audience: "b2b",
    category: "technical",
    date: "2021-07-19",
    cover: "/images/docs/panther-docs.png",
    coverAlt: "Panther Protocol whitepaper",
    featured: true,
    href: "https://www.pantherprotocol.io/resources/panther-protocol-v-1-0-1.pdf",
    source: "Panther Protocol",
    collection: "papers",
    also: ["institutional"],
    alsoCategory: ["research"],
  },
  {
    slug: "panther-litepaper",
    title: "Panther Protocol litepaper",
    dek: "The short version. Why private DeFi, why now, why this protocol.",
    audience: "institutional",
    category: "technical",
    date: "2021-06-01",
    cover: "/images/docs/panther-docs.png",
    coverAlt: "Panther Protocol litepaper",
    href: "https://www.pantherprotocol.io/resources/Panther_Litepaper_v1_0.pdf",
    source: "Panther Protocol",
    collection: "papers",
    also: ["b2b"],
    alsoCategory: ["research"],
  },
  {
    slug: "panther-onepager",
    title: "Panther one-pager",
    dek: "Compliant privacy, on one page.",
    audience: "institutional",
    category: "technical",
    date: "2021-11-01",
    cover: "/images/panther-protocol.jpg",
    coverAlt: "Panther Protocol one-pager",
    href: "https://blog.pantherprotocol.io/about/",
    source: "Panther Protocol",
    collection: "papers",
    also: ["b2b"],
    alsoCategory: ["research"],
  },
  {
    slug: "introducing-parti",
    title: "Introducing $PARTI",
    dek: "Tokenomics and utility. The economic layer under chain abstraction.",
    note: "A $1.26M Binance IDO, 160× oversubscribed.",
    audience: "retail",
    category: "promotional",
    date: "2025-03-28",
    cover: "/images/og/parti.jpg",
    coverAlt: "Introducing $PARTI",
    featured: true,
    href: "https://blog.particle.network/introducing-parti/",
    source: "Particle Network",
    also: ["institutional"],
  },
  {
    slug: "particle-chain-avalanche",
    title: "The Particle Chain, on Avalanche",
    dek: "The coordination layer under Universal Accounts, launching as an Avalanche L1.",
    audience: "b2b",
    category: "narrative",
    date: "2025-09-03",
    cover: "/images/og/particle-avax.png",
    coverAlt: "The Particle Chain is launching on Avalanche",
    featured: true,
    href: "https://blog.particle.network/the-particle-chain-is-launching-on-avalanche/",
    source: "Particle Network",
    also: ["institutional"],
  },
  {
    slug: "avalanche-stablecoins",
    title: "Stablecoins from any chain",
    dek: "Accept deposits from Ethereum, Base, or Solana. Spend them on Avalanche.",
    audience: "b2b",
    category: "promotional",
    date: "2025-10-16",
    cover: "/images/og/avax-ux.jpg",
    coverAlt: "Retail-friendly UX on Avalanche dApps",
    href: "https://blog.particle.network/retail-friendly-ux-accepting-stablecoins-from-any-chain-on-avalanche-dapps/",
    source: "Particle Network",
    also: ["retail"],
  },
  {
    slug: "particle-2025-review",
    title: "2025 in review",
    dek: "UniversalX, the SDK, the TGE, the Avalanche L1.",
    audience: "b2b",
    category: "narrative",
    date: "2026-01-08",
    cover: "/images/og/2025-review.jpg",
    coverAlt: "Particle Network 2025 in review",
    featured: true,
    href: "https://blog.particle.network/2025-review/",
    source: "Particle Network",
    also: ["retail", "institutional"],
  },
  {
    slug: "fringe-v3",
    title: "Fringe v3: a comprehensive overview",
    dek: "The lending stack, rewritten. Collateral, risk, the model a developer can actually integrate.",
    audience: "b2b",
    category: "technical",
    date: "2024-11-01",
    cover: "/images/og/fringe-v3.jpg",
    coverAlt: "Fringe v3 overview",
    href: "https://fringefinance.medium.com/fringe-v3-a-comprehensive-overview-c61ce0b824d1",
    source: "Fringe Finance",
    also: ["retail"],
  },
  {
    slug: "fringe-non-rehypothecation",
    title: "Fringe’s non-rehypothecating model",
    dek: "Borrower collateral stays locked.",
    audience: "b2b",
    category: "narrative",
    date: "2024-01-18",
    cover: "/images/og/fringe-logo.png",
    coverAlt: "Fringe Finance",
    href: "https://fringefinance.medium.com/fringes-non-rehypothecating-model-6fd4c3ace2c8",
    source: "Fringe Finance",
    also: ["institutional", "retail"],
  },
  {
    slug: "fringe-after-v2",
    title: "What happens after v2",
    dek: "Margin, Amplify, USB. The roadmap after the platform shipped.",
    audience: "b2b",
    category: "narrative",
    date: "2023-05-19",
    cover: "/images/og/fringe-logo.png",
    coverAlt: "Fringe Finance after v2",
    href: "https://fringefinance.medium.com/what-happens-after-v2-breaking-down-our-roadmap-for-the-years-to-come-95ae33fc2e3e",
    source: "Fringe Finance",
    also: ["retail"],
  },
  {
    slug: "fringe-lp-tokens",
    title: "How LP tokens enter a lending system",
    dek: "DEX liquidity, locked. The argument for listing LP tokens as collateral.",
    audience: "b2b",
    category: "technical",
    date: "2022-10-22",
    cover: "/images/og/fringe-logo.png",
    coverAlt: "LP tokens in a lending system",
    href: "https://fringefinance.medium.com/how-lp-tokens-can-be-integrated-into-a-lending-system-592c7bfbe92b",
    source: "Fringe Finance",
  },
  {
    slug: "fringe-road-to-v2",
    title: "Road to v2",
    dek: "Partial liquidations, atomic repayments, multi-asset lender tokens. The upgrade, named in public.",
    audience: "b2b",
    category: "narrative",
    date: "2023-03-08",
    cover: "/images/og/fringe-logo.png",
    coverAlt: "Fringe Finance road to v2",
    href: "https://fringefinance.medium.com/road-to-v2-an-updated-fringe-finance-roadmap-b242b3eaa85a",
    source: "Fringe Finance",
    also: ["institutional", "retail"],
  },
  {
    slug: "academy-prifi",
    title: "Coin tumblers, privacy coins, and PriFi",
    dek: "Before private DeFi. What the old tools were, and why they were not enough.",
    audience: "retail",
    category: "narrative",
    date: "2022-06-24",
    cover: "/images/og/academy-prifi.png",
    coverAlt: "Privacy coins, tumblers, and PriFi",
    href: "https://blog.pantherprotocol.io/bitcoin-tumblers-prifi",
    source: "Panther Academy",
    collection: "academy",
  },
  {
    slug: "parti-airdrop",
    title: "$PARTI is here. Claim the airdrop",
    dek: "Season 0 claim guide. Diamonds, Pioneer, the People’s Launchpad. 9% of supply.",
    audience: "retail",
    category: "promotional",
    date: "2025-03-25",
    cover: "/images/og/parti-airdrop.png",
    coverAlt: "$PARTI airdrop claiming guide",
    featured: true,
    href: "https://blog.particle.network/parti-airdrop/",
    source: "Particle Network",
    also: ["b2b"],
  },
  {
    slug: "new-universalx",
    title: "The new UniversalX is live",
    dek: "Rebuilt from the ground up. Faster fills, zero-latency charts, still one balance.",
    audience: "retail",
    category: "promotional",
    date: "2026-07-13",
    cover: "/images/og/new-universalx.jpg",
    coverAlt: "The new UniversalX is live",
    featured: true,
    href: "https://blog.particle.network/the-new-universalx-is-live-and-free/",
    source: "Particle Network",
    also: ["b2b"],
    alsoCategory: ["multimedia"],
  },
  {
    slug: "ua-going-live",
    title: "Universal Accounts are going live",
    dek: "Early access, then public beta. What to do if you had been on Pioneer.",
    audience: "retail",
    category: "promotional",
    date: "2024-09-09",
    cover: "/images/og/ua-going-live.png",
    coverAlt: "Universal Accounts are going live",
    featured: true,
    href: "https://blog.particle.network/universal-accounts-are-going-live/",
    source: "Particle Network",
    also: ["b2b"],
  },
  {
    slug: "particle-testnet",
    title: "Testnet is live. Earn $PARTI points",
    dek: "Particle Pioneer. Universal Accounts and Universal Gas, on testnet, with a points program attached.",
    audience: "retail",
    category: "promotional",
    date: "2024-05-02",
    cover: "/images/og/particle-testnet.jpg",
    coverAlt: "Particle Network testnet guide",
    featured: true,
    href: "https://blog.particle.network/particle-network-testnet-guide-airdrop/",
    source: "Particle Network",
    also: ["b2b"],
  },
  {
    slug: "testnet-phase-2",
    title: "Testnet phase 2",
    dek: "1.3M Universal Accounts. Cross-chain sends, Universal Liquidity, still earning points.",
    audience: "retail",
    category: "promotional",
    date: "2024-06-21",
    cover: "/images/og/testnet-phase-2.png",
    coverAlt: "Particle Network testnet phase 2",
    href: "https://blog.particle.network/testnet-phase-2/",
    source: "Particle Network",
    also: ["b2b"],
  },
  {
    slug: "cha-educate",
    title: "Account-level chain abstraction",
    dek: "One account. One balance. Any chain.",
    audience: "b2b",
    category: "multimedia",
    date: "2024-08-13",
    cover: "/images/studio/yt-7KqxCeWbq0E.jpg",
    coverAlt: "Account-level chain abstraction, educate",
    featured: true,
    href: "https://www.youtube.com/watch?v=7KqxCeWbq0E",
    source: "Particle Network",
    also: ["retail"],
    alsoCategory: ["promotional"],
    video: {
      youtube: "7KqxCeWbq0E",
      poster: "/images/studio/yt-7KqxCeWbq0E.jpg",
    },
  },
  {
    slug: "crypto-crowdfunding",
    title: "Crypto crowdfunding",
    dek: "ICOs, STOs, IEOs, ITOs, and fair launches.",
    audience: "retail",
    category: "research",
    date: "2021-06-25",
    cover: "/images/research.jpg",
    coverAlt: "Crypto crowdfunding",
    href: "https://d-core.net/crypto-crowdfunding-icos-stos-ieos-itos-and-everything-in-between/",
    source: "D-Core",
    also: ["institutional"],
  },
  {
    slug: "defi-non-dummies",
    title: "DeFi for non-dummies",
    dek: "Decentralized finance, explained for people who already know finance.",
    audience: "retail",
    category: "research",
    date: "2021-06-30",
    cover: "/images/research.jpg",
    coverAlt: "DeFi for non-dummies",
    featured: true,
    href: "https://d-core.net/defi-for-non-dummies-decentralized-finance-explained-for-finance-professionals/",
    source: "D-Core",
    also: ["institutional"],
  },
  {
    slug: "ethereum-2",
    title: "Ethereum 2.0: why it matters",
    dek: "The upgrade, written before it shipped.",
    audience: "retail",
    category: "research",
    date: "2020-08-03",
    cover: "/images/research.jpg",
    coverAlt: "Ethereum 2.0",
    href: "https://d-core.net/ethereum-2-0-why-is-it-so-important/",
    source: "D-Core",
  },
  {
    slug: "dcore-taiko",
    title: "Taiko",
    dek: "A Type-1 zkEVM. Ethereum-equivalent, cheaper, still the same contracts.",
    audience: "institutional",
    category: "research",
    date: "2023-02-08",
    cover: "/images/research.jpg",
    coverAlt: "Taiko institutional report",
    href: "https://d-core.net/taiko-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "dcore-quai",
    title: "Quai Network",
    dek: "Proof-of-Work, parallelized. A hierarchy of merged-mined chains.",
    audience: "institutional",
    category: "research",
    date: "2022-11-04",
    cover: "/images/research.jpg",
    coverAlt: "Quai Network institutional report",
    href: "https://d-core.net/quai-network-institutional-report/",
    source: "D-Core",
    collection: "d-core",
  },
  {
    slug: "cm-album-soon",
    title: "The new album. For real this time",
    dek: "A TikTok. Thirteen years of saying the record is almost out.",
    audience: "retail",
    category: "multimedia",
    date: "2026-03-01",
    cover: "/images/studio/yt-4urDmdlAvdk.jpg",
    coverAlt: "Carlos Maximiliano on TikTok",
    href: "https://www.tiktok.com/@carlosmxml",
    source: "Carlos Maximiliano",
    hideFromAudience: true,
    video: { youtube: "4urDmdlAvdk", poster: "/images/studio/yt-4urDmdlAvdk.jpg" },
  },
  {
    slug: "cm-salto",
    title: "Every beginning is a jump",
    dek: "Short-form. Parral, the next record, the jump.",
    audience: "retail",
    category: "multimedia",
    date: "2026-02-01",
    cover: "/images/studio/yt--SsEKkOsOVg.jpg",
    coverAlt: "Carlos Maximiliano on TikTok",
    href: "https://www.tiktok.com/@carlosmxml",
    source: "Carlos Maximiliano",
    hideFromAudience: true,
    video: { youtube: "-SsEKkOsOVg", poster: "/images/studio/yt--SsEKkOsOVg.jpg" },
  },
  {
    slug: "cm-alistando",
    title: "Alistando el primer álbum en 13 años",
    dek: "The studio, on TikTok. Not a single. The work around the songs.",
    audience: "retail",
    category: "multimedia",
    date: "2026-01-15",
    cover: "/images/studio/yt-5yUMEM8lfAc.jpg",
    coverAlt: "Carlos Maximiliano on TikTok",
    href: "https://www.tiktok.com/@carlosmxml",
    source: "Carlos Maximiliano",
    hideFromAudience: true,
    video: { youtube: "5yUMEM8lfAc", poster: "/images/studio/yt-5yUMEM8lfAc.jpg" },
  },
  {
    slug: "cm-vaiven",
    title: "Álbumes que me marcaron",
    dek: "Jorge Drexler, Vaivén. A TikTok, not a cover.",
    audience: "retail",
    category: "multimedia",
    date: "2025-12-01",
    cover: "/images/studio/yt-5yUMEM8lfAc.jpg",
    coverAlt: "Carlos Maximiliano on TikTok",
    href: "https://www.tiktok.com/@carlosmxml",
    source: "Carlos Maximiliano",
    hideFromAudience: true,
    video: { youtube: "VnYqlE11prk", poster: "/images/studio/yt-5yUMEM8lfAc.jpg" },
  },
];

export const brands: Brand[] = [
  {
    slug: "chain-abstraction",
    name: "Chain Abstraction",
    dek: "How we crafted a narrative that dominated Web3 infra conversations in 2024-2025.",
    audience: "b2b",
    kind: "narrative",
    year: "2022–2025",
    role: "Ecosystem narrative, positioning, GTM",
    cover: "/images/chain-abstraction.jpg",
    coverAlt: "Ink restyle of the Particle Network spiral mark",
    identity: {
      wordmark: "PARTICLE",
      treatment: "wide",
      field: "light",
      typeface: "Shippori Mincho",
      color: "Ink / paper",
    },
    client: "Particle Network",
    featured: true,
    also: ["retail", "institutional"],
    problem:
      "Web3 asked people to be their own infrastructure team. Bridge, switch networks, hold five gas tokens, then maybe use the product. The market needed a name for the thing that makes that disappear, and a layer teams could actually ship with.",
    work: "The narrative for Particle Network as the chain abstraction layer: Universal Accounts, a single balance, any chain. Language for the teams who integrate it, and for people who should never have to say “which network.”",
    made: [
      "Category definition",
      "Investor materials",
      "Coalition",
      "Universal Accounts",
    ],
  },
  {
    slug: "universal-x",
    name: "Universal X",
    dek: "The most competitive market of 2025-2026, and how we managed to stand out.",
    audience: "retail",
    kind: "brand",
    year: "2024–2026",
    role: "Product marketing, launch narrative, retail language",
    cover: "/images/universal-x.jpg",
    coverAlt: "Ink restyle of the Universal X radiating mark",
    identity: {
      wordmark: "UNIVERSAL X",
      treatment: "cut",
      field: "light",
      typeface: "Shippori Mincho",
      color: "Ink / paper",
    },
    featured: true,
    client: "Particle Network",
    problem:
      "Trading in web3 was a chain problem pretending to be a user problem. People were asked to bridge, gas, and keep a mental map of networks before they could make a trade. The product that would win was the one that made the chain disappear.",
    work: "A retail brand and launch narrative for Universal X: trade any token on any chain, 100% non-custodial, without bridging. Language for the first session.",
    made: [
      "Product positioning",
      "Launch narrative",
      "Retail voice",
      "Campaign system",
    ],
  },
  {
    slug: "panther-protocol",
    name: "Panther Protocol",
    dek: "From raising $22M to surviving the most complex panorama in crypto’s history.",
    audience: "institutional",
    kind: "brand",
    year: "2025",
    role: "Brand, institutional narrative, positioning",
    cover: "/images/panther-protocol.jpg",
    coverAlt: "Ink restyle of the Panther Protocol panther-in-circle mark",
    identity: {
      wordmark: "Panther",
      treatment: "editorial",
      field: "light",
      typeface: "Shippori Mincho",
      color: "Ink / paper",
    },
    featured: true,
    problem:
      "Privacy in DeFi arrived sounding like a feature for insiders. Institutions needed confidential trading zones with programmable rules, and a face that could survive a due-diligence pack.",
    work: "Positioning and narrative for Panther as infrastructure for confidential on-chain finance. Language for desks and funds.",
    made: [
      "Positioning",
      "Institutional language",
      "Narrative system",
      "Mark restyle",
    ],
  },
];

export const studio: StudioItem[] = [
  {
    slug: "real-world-value",
    title: "Real-World Value",
    dek: "A Particle Network podcast. Hosted by Carlos Cano. Builders, funds, RWAs.",
    format: "podcast",
    audience: "b2b",
    date: "2026-01-22",
    duration: "Series",
    cover: "/images/studio/rwv-8.jpg",
    coverAlt: "Real-World Value, a Particle Network podcast",
    featured: true,
    href: "https://www.youtube.com/@ParticleNtwrk",
    source: "Particle Network",
    body: "Published through Particle Network. Conversations with funds, infrastructure teams, and people working on RWAs.",
  },
  {
    slug: "rwv-8",
    title: "Real-World Value 8: Solana, all-encompassing",
    dek: "Solana wants to be the settlement layer for everything. Head of Engineering Jon Wong on Visa, builders, and why the chain stays at the top.",
    format: "podcast",
    audience: "institutional",
    date: "2025-12-18",
    duration: "60 min",
    cover: "/images/studio/rwv-8.jpg",
    coverAlt: "Real-World Value episode 8, Solana",
    href: "https://www.youtube.com/watch?v=0k_VZvNmv-M",
    source: "Particle Network",
    youtube: "0k_VZvNmv-M",
    featuredPlay: true,
    body: "Onboarding giants, enterprise adoption, memecoin shame, RWAs, the Seeker phone.",
  },
  {
    slug: "rwv-9",
    title: "Real-World Value 9: The narrative game",
    dek: "Deep Ventures was early to the revenue meta. Winners, losers, and what is left when the story cools.",
    format: "podcast",
    audience: "institutional",
    date: "2026-01-22",
    duration: "52 min",
    cover: "/images/studio/rwv-9.jpg",
    coverAlt: "Real-World Value episode 9",
    href: "https://www.youtube.com/watch?v=mmJTUqNb5cc",
    source: "Particle Network",
    youtube: "mmJTUqNb5cc",
    body: "With Mike Chan / Deep Ventures. Pre-seed, BTC L2s, restaking, FDV, founder-market fit.",
  },
  {
    slug: "rwv-7",
    title: "Real-World Value 7: The revenue narrative",
    dek: "Did chain abstraction fade. Did the cycle deliver. Particle’s 2026 plans, said in public.",
    format: "podcast",
    audience: "b2b",
    date: "2025-12-11",
    duration: "36 min",
    cover: "/images/studio/rwv-7.jpg",
    coverAlt: "Real-World Value episode 7",
    href: "https://www.youtube.com/watch?v=ALctDXwA0CU",
    source: "Particle Network",
    youtube: "ALctDXwA0CU",
    body: "With Ethan Francis. Infra vs apps, Universal Accounts’ moat, RWAs and stablecoins.",
  },
  {
    slug: "rwv-6",
    title: "Real-World Value 6: Chainlink, trillions onchain",
    dek: "From oracles to cross-chain. JP Morgan, RWAs, and a compliance engine.",
    format: "podcast",
    audience: "institutional",
    date: "2025-12-04",
    duration: "45 min",
    cover: "/images/studio/rwv-6.jpg",
    coverAlt: "Real-World Value episode 6",
    href: "https://www.youtube.com/watch?v=N8mvWdfIW0o",
    source: "Particle Network",
    youtube: "N8mvWdfIW0o",
    body: "With Luke from Chainlink. Oracles, RWAs, and compliance.",
  },
  {
    slug: "rwv-5",
    title: "Real-World Value 5: Multi-billion tokenization",
    dek: "Polymath and Polymesh. Brokering deals at the size institutions actually care about.",
    format: "podcast",
    audience: "institutional",
    date: "2025-11-27",
    duration: "48 min",
    cover: "/images/studio/rwv-5.jpg",
    coverAlt: "Real-World Value episode 5",
    href: "https://www.youtube.com/watch?v=W-Q4TvEXuSI",
    source: "Particle Network",
    youtube: "W-Q4TvEXuSI",
    body: "Tokenization at institutional scale.",
  },
  {
    slug: "rwv-4",
    title: "Real-World Value 4: AI and banking on crypto rails",
    dek: "Minara putting AI onchain. Helix making RWAs chain-agnostic.",
    format: "podcast",
    audience: "institutional",
    date: "2025-11-20",
    duration: "39 min",
    cover: "/images/studio/rwv-4.jpg",
    coverAlt: "Real-World Value episode 4",
    href: "https://www.youtube.com/watch?v=kVMkteDboF8",
    source: "Particle Network",
    youtube: "kVMkteDboF8",
    body: "Minara putting AI onchain. Helix making RWAs chain-agnostic.",
  },
  {
    slug: "rwv-3",
    title: "Real-World Value 3: Noble, branded dollars",
    dek: "Noble’s founder on the issuance layer stablecoins actually need.",
    format: "podcast",
    audience: "institutional",
    date: "2025-11-06",
    duration: "42 min",
    cover: "/images/studio/rwv-3.jpg",
    coverAlt: "Real-World Value episode 3",
    href: "https://www.youtube.com/watch?v=gmGhQM6Iiyk",
    source: "Particle Network",
    youtube: "gmGhQM6Iiyk",
    body: "Branded dollars, issuance, the chain under the dollar.",
  },
  {
    slug: "rwv-2",
    title: "Real-World Value 2: Why only AI and RWAs matter",
    dek: "Tokenization is crypto’s job. AI is the world’s. Plume, GAIB, RedStone.",
    format: "podcast",
    audience: "institutional",
    date: "2025-10-30",
    duration: "52 min",
    cover: "/images/studio/rwv-2.jpg",
    coverAlt: "Real-World Value episode 2",
    href: "https://www.youtube.com/watch?v=hyeZjpXGQtQ",
    source: "Particle Network",
    youtube: "hyeZjpXGQtQ",
    body: "Hype cycles, T-bills, and the assets young people might actually care about.",
  },
  {
    slug: "rwv-1",
    title: "Real-World Value 1: Centrifuge, trillions onchain",
    dek: "Centrifuge’s CLO on how real-world assets actually get there.",
    format: "podcast",
    audience: "institutional",
    date: "2025-10-16",
    duration: "50 min",
    cover: "/images/studio/rwv-1.jpg",
    coverAlt: "Real-World Value episode 1",
    href: "https://www.youtube.com/watch?v=rFpeDwHb_xc",
    source: "Particle Network",
    youtube: "rFpeDwHb_xc",
    body: "The first episode. How real-world assets actually get onchain.",
  },
];

export function getAudience(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug);
}

export function getCategory(slug: string): ContentCategory | undefined {
  return contentCategories.find((c) => c.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getStudio(slug: string): StudioItem | undefined {
  return studio.find((s) => s.slug === slug);
}

export function audienceLabel(slug: AudienceSlug): string {
  return getAudience(slug)?.name ?? slug;
}

export function categoryLabel(slug: ContentCategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}

export function kindLabel(kind: WorkKind): string {
  if (kind === "content") return "Content";
  if (kind === "brand") return "Brand";
  if (kind === "narrative") return "Narrative";
  return "Creative";
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function articleCard(a: Article): WorkCard {
  return {
    slug: a.slug,
    title: a.title,
    dek: a.dek,
    note: a.note,
    audience: a.audience,
    kind: "content",
    date: a.date,
    cover: a.cover,
    coverAlt: a.coverAlt,
    featured: a.featured,
    category: a.category,
    source: a.source,
    external: a.href,
    href: a.href
      ? undefined
      : { to: "/a/$slug", params: { slug: a.slug } },
  };
}

function brandCard(b: Brand): WorkCard {
  return {
    slug: b.slug,
    title: b.name,
    dek: b.dek,
    audience: b.audience,
    kind: b.kind,
    date: `${b.year.replace("–", "").slice(0, 4)}-01-01`,
    cover: b.cover,
    coverAlt: b.coverAlt,
    featured: b.featured,
    identity: b.identity,
    href: { to: "/brands/$slug", params: { slug: b.slug } },
  };
}

function studioCard(s: StudioItem): WorkCard {
  return {
    slug: s.slug,
    title: s.title,
    dek: s.dek,
    audience: s.audience,
    kind: "studio",
    date: s.date,
    cover: s.cover,
    coverAlt: s.coverAlt,
    featured: s.featured,
    source: s.source,
    external: s.href,
    href: s.href ? undefined : { to: "/studio" },
  };
}

export function allWork(): WorkCard[] {
  return [
    ...articles.map(articleCard),
    ...brands.map(brandCard),
    ...studio.map(studioCard),
  ].sort((a, b) => b.date.localeCompare(a.date));
}

export function featuredWork(): WorkCard[] {
  const rank = (k: WorkKind) =>
    k === "brand" ? 0 : k === "narrative" ? 1 : k === "studio" ? 2 : 3;
  return allWork()
    .filter((w) => w.featured)
    .sort((a, b) => rank(a.kind) - rank(b.kind) || b.date.localeCompare(a.date));
}

const FEATURED_CASE_ORDER = [
  "chain-abstraction",
  "universal-x",
  "panther-protocol",
] as const;

export function featuredCases(): Brand[] {
  return FEATURED_CASE_ORDER.map((slug) => brands.find((b) => b.slug === slug)).filter(
    (b): b is Brand => Boolean(b),
  );
}

export function workForAudience(slug: AudienceSlug): WorkCard[] {
  return [
    ...brandsFor(slug).map(brandCard),
    ...articlesFor(slug).map(articleCard),
  ];
}

export function articlesFor(slug: AudienceSlug): Article[] {
  return articles
    .filter(
      (a) =>
        !a.collection &&
        !a.hideFromAudience &&
        (a.audience === slug || a.also?.includes(slug)),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function collectionFor(
  slug: AudienceSlug,
  collection: NonNullable<Article["collection"]>,
): Article[] {
  return articles
    .filter((a) => a.audience === slug && a.collection === collection)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const VIDEO_LEAD = [
  "eip-7702-universal-accounts",
  "universalx-launch-film",
  "particle-explained",
  "cha-educate",
] as const;

export function sortVideos<T extends { slug: string; date: string }>(list: T[]): T[] {
  const rank = (slug: string) => {
    const i = VIDEO_LEAD.indexOf(slug as (typeof VIDEO_LEAD)[number]);
    return i === -1 ? VIDEO_LEAD.length : i;
  };
  return [...list].sort(
    (a, b) => rank(a.slug) - rank(b.slug) || b.date.localeCompare(a.date),
  );
}

export function articlesForCategory(slug: ContentCategorySlug): Article[] {
  return articles
    .filter((a) => a.category === slug || a.alsoCategory?.includes(slug))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const SOURCE_ORDER = [
  "Particle Network",
  "Panther Protocol",
  "Panther Academy",
  "7702 Collective",
  "Messari",
  "D-Core",
  "Fringe Finance",
  "On this site",
  "Carlos Maximiliano",
] as const;

export function articlesBySource(list: Article[]): { source: string; items: Article[] }[] {
  const groups = new Map<string, Article[]>();
  for (const a of list) {
    const key = a.source ?? "Other";
    const arr = groups.get(key) ?? [];
    arr.push(a);
    groups.set(key, arr);
  }
  const rank = (s: string) => {
    const i = SOURCE_ORDER.indexOf(s as (typeof SOURCE_ORDER)[number]);
    return i === -1 ? SOURCE_ORDER.length : i;
  };
  return [...groups.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
    .map(([source, items]) => ({
      source,
      items: items.sort((a, b) => b.date.localeCompare(a.date)),
    }));
}

export const CATEGORY_BANDS: Record<
  ContentCategorySlug,
  NonNullable<Article["collection"]>[]
> = {
  narrative: ["academy"],
  research: ["7702", "papers", "messari", "d-core"],
  promotional: ["7702", "coalition"],
  multimedia: [],
  technical: ["papers", "docs", "devs", "academy"],
};

export function collectionAll(
  collection: NonNullable<Article["collection"]>,
  audience?: AudienceSlug,
): Article[] {
  return articles
    .filter(
      (a) =>
        a.collection === collection &&
        (!audience || a.audience === audience || a.also?.includes(audience)),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function collectionsForCategory(slug: ContentCategorySlug) {
  return COLLECTION_META.filter((c) => c.categories.includes(slug));
}

export function studioFor(slug: AudienceSlug): StudioItem[] {
  return studio
    .filter((s) => s.audience === slug || slug === "institutional" || slug === "b2b")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const COLLECTIVE_MEMBERS = [
  { slug: "particle", name: "Particle Network", desc: "Chain abstraction", href: "https://particle.network" },
  { slug: "biconomy", name: "Biconomy", desc: "Account abstraction", href: "https://biconomy.io" },
  { slug: "lifi", name: "Li.Fi", desc: "DEX & bridge aggregator", href: "https://li.fi" },
  { slug: "openfort", name: "Openfort", desc: "Account abstraction", href: "https://openfort.io" },
  { slug: "avail", name: "Avail", desc: "Chain abstraction", href: "https://availproject.org" },
  { slug: "rhinestone", name: "Rhinestone", desc: "Chain abstraction", href: "https://rhinestone.dev" },
  { slug: "zerodev", name: "ZeroDev", desc: "Account abstraction", href: "https://zerodev.app" },
  { slug: "everclear", name: "Everclear", desc: "Cross-chain clearing", href: "https://www.everclear.org/" },
  { slug: "magic", name: "Magic", desc: "Wallet infrastructure", href: "https://magic.link" },
  { slug: "etherspot", name: "Etherspot", desc: "Account abstraction", href: "https://etherspot.io" },
  { slug: "push", name: "Push Chain", desc: "Universal L1 blockchain", href: "https://push.org" },
  { slug: "across", name: "Across", desc: "Cross-chain bridge", href: "https://across.to" },
  { slug: "apechain", name: "ApeChain", desc: "Gaming & culture L2", href: "https://apechain.com" },
  { slug: "centrifuge", name: "Centrifuge", desc: "Real-world assets", href: "https://centrifuge.io" },
  { slug: "noble", name: "Noble", desc: "Stablecoin issuance", href: "https://www.noble.xyz" },
  { slug: "arbitrum", name: "Arbitrum", desc: "Ethereum L2", href: "https://arbitrum.io" },
  { slug: "metamask", name: "MetaMask", desc: "Wallet infrastructure", href: "https://metamask.io" },
  { slug: "avalanche", name: "Avalanche", desc: "L1 blockchain", href: "https://www.avax.network" },
  { slug: "gaib", name: "GAIB", desc: "AI infrastructure economy", href: "https://gaib.ai" },
  { slug: "near", name: "NEAR", desc: "Chain abstraction", href: "https://near.org" },
  { slug: "virtuals", name: "Virtuals", desc: "AI agent protocol", href: "https://virtuals.io" },
  { slug: "asi", name: "ASI Alliance", desc: "Decentralized AI", href: "https://superintelligence.io" },
  { slug: "supra", name: "Supra", desc: "Oracles & L1", href: "https://supra.com" },
] as const;

export const COALITION_MEMBERS = [
  { slug: "arbitrum", name: "Arbitrum", desc: "Ethereum L2", href: "https://arbitrum.io" },
  { slug: "avalanche", name: "Avalanche", desc: "L1 blockchain", href: "https://www.avax.network" },
  { slug: "berachain", name: "Berachain", desc: "Proof of liquidity L1", href: "https://www.berachain.com" },
  { slug: "bnb", name: "BNB Chain", desc: "L1 blockchain", href: "https://www.bnbchain.org" },
  { slug: "linea", name: "Linea", desc: "zkEVM L2", href: "https://linea.build" },
  { slug: "polygon", name: "Polygon", desc: "Ethereum scaling", href: "https://polygon.technology" },
  { slug: "base", name: "Base", desc: "Coinbase L2", href: "https://base.org" },
  { slug: "sei", name: "Sei", desc: "Parallelized EVM", href: "https://www.sei.io" },
  { slug: "taiko", name: "Taiko", desc: "Based rollup", href: "https://taiko.xyz" },
  { slug: "botanix", name: "Botanix", desc: "Bitcoin L2", href: "https://botanixlabs.xyz" },
  { slug: "zircuit", name: "Zircuit", desc: "AI-secured L2", href: "https://www.zircuit.com" },
] as const;

export const COLLECTION_META = [
  {
    slug: "7702" as const,
    kicker: "Initiative",
    title: "The 7702 Collective",
    dek: "Co-founded with leading teams. Builders shipping EIP-7702: accounts people already have, upgraded in place.",
    audience: "institutional" as const,
    categories: ["promotional", "research"] as ContentCategorySlug[],
  },
  {
    slug: "coalition" as const,
    kicker: "Initiative",
    title: "The Chain Abstraction Coalition",
    dek: "Sixty-plus networks working on chain abstraction.",
    audience: "b2b" as const,
    categories: ["promotional"] as ContentCategorySlug[],
  },
  {
    slug: "messari" as const,
    kicker: "Messari",
    title: "Reports I helped write",
    dek: "Messari’s public reports on Particle Network. I also helped write them.",
    audience: "institutional" as const,
    categories: ["research"] as ContentCategorySlug[],
  },
  {
    slug: "d-core" as const,
    kicker: "D-Core",
    title: "Institutional research",
    dek: "Public reports from D-Core, an institutional crypto research desk.",
    audience: "institutional" as const,
    categories: ["research"] as ContentCategorySlug[],
  },
  {
    slug: "docs" as const,
    kicker: "Documentation",
    title: "Documentation",
    dek: "Product documentation for Particle Network and Panther Protocol.",
    audience: "b2b" as const,
    categories: ["technical"] as ContentCategorySlug[],
  },
  {
    slug: "devs" as const,
    kicker: "For developers",
    title: "Protocol writing for developers",
    dek: "Technical posts for developers. SDKs, deep dives, protocol architecture.",
    audience: "b2b" as const,
    categories: ["technical"] as ContentCategorySlug[],
  },
  {
    slug: "papers" as const,
    kicker: "Papers",
    title: "Whitepapers, litepapers, one-pagers",
    dek: "Whitepapers, litepapers, and one-pagers for Particle Network and Panther Protocol.",
    audience: "institutional" as const,
    categories: ["technical", "research"] as ContentCategorySlug[],
  },
  {
    slug: "academy" as const,
    kicker: "Panther Academy",
    title: "Learn blockchain, DeFi, and privacy",
    dek: "An education series from Panther Protocol. Zero-knowledge, staking, MEV.",
    audience: "retail" as const,
    categories: ["narrative", "technical", "research"] as ContentCategorySlug[],
  },
];

export function brandsFor(slug: AudienceSlug): Brand[] {
  return brands
    .filter((b) => b.audience === slug || b.also?.includes(slug))
    .sort((a, b) => Number(a.audience !== slug) - Number(b.audience !== slug));
}

export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  return articles
    .filter((a) => a.audience === current.audience && a.slug !== slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
