export type CaseFigure = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseLink = {
  label: string;
  href: string;
};

export type CaseBlock =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | { type: "figures"; items: CaseFigure[] }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "links"; items: CaseLink[] };

const img = "/images/cases/particle";
const vid = "/videos/particle";

export const chainAbstractionStory: CaseBlock[] = [
  {
    type: "h",
    text: "The problem we already knew",
  },
  {
    type: "p",
    text: "Web3 was hard to use. Seed phrases. Gas tokens. A new wallet for every app.",
  },
  {
    type: "p",
    text: "We started there.",
  },
  {
    type: "p",
    text: "Particle launched in 2022 as Wallet-as-a-Service. Social login. Embedded wallet. MPC keys. Open a dApp with Google, get a real onchain account. No extension. No seed-phrase lecture.",
  },
  {
    type: "figure",
    src: `${img}/waas.jpg`,
    alt: "Celebrating 15 million end-users on Particle Wallet-as-a-Service",
    caption: "October 2023. WaaS had already onboarded millions. The account existed. Using every chain still did not.",
  },
  {
    type: "p",
    text: "That worked. Developers shipped it. Hundreds of apps, then thousands. Millions of activations.",
  },
  {
    type: "p",
    text: "Then ERC-4337. Account abstraction became the next layer. Gas sponsorship. Smart accounts. We built the AA stack on the same WaaS. BTC Connect took it into Bitcoin L2s.",
  },
  {
    type: "figure",
    src: `${img}/aa.jpg`,
    alt: "Announcing Smart Wallet-as-a-Service",
    caption: "Smart WaaS. The same account, now programmable.",
  },
  {
    type: "p",
    text: "By early 2024: wallet abstraction, then account abstraction, live across dozens of chains. Tens of millions of activations. Serious assets in those accounts.",
  },
  {
    type: "quote",
    text: "We had solved onboarding on a chain. We had not solved using all of them.",
  },

  {
    type: "h",
    text: "The next problem was not wallets. It was fragmentation.",
  },
  {
    type: "p",
    text: "Every year more chains shipped. Liquidity split. Users split. Apps split.",
  },
  {
    type: "p",
    text: "USDC on Base, ETH on Arbitrum, a position on Solana. To do one thing: bridge, switch networks, hold three gas tokens. Account abstraction made a single chain nicer. It left the multi-chain mess intact.",
  },
  {
    type: "p",
    text: "We already lived at the account layer. That is where the user sits. That is where the balance sits. That is where the signature happens.",
  },
  {
    type: "quote",
    text: "Fix fragmentation at the account. One account. One balance. Any chain.",
  },
  {
    type: "p",
    text: "Not a new bridge to learn. Not “please deploy on our L1.” An account that makes the chain disappear. Universal Accounts, with Universal Liquidity and Universal Gas, coordinated by the Particle Chain.",
  },
  {
    type: "figure",
    src: `${img}/l1.jpg`,
    alt: "Particle Network modular L1 announcement card",
    caption: "March 2024. The modular L1 as the coordination layer.",
  },

  {
    type: "h",
    text: "Why we named the category",
  },
  {
    type: "p",
    text: "A product needs a name. A movement needs a sentence other people can steal.",
  },
  {
    type: "p",
    text: "“Omnichain smart accounts” is a spec. “Our L1” is a sales pitch. Neither travels. “Chain abstraction” did. It described the outcome, not our stack.",
  },
  {
    type: "figure",
    src: `${img}/definition.jpg`,
    alt: "Formally defining chain abstraction",
    caption: "June 2024. The definition, published so the industry could argue about implementations instead of vocabulary.",
  },
  {
    type: "quote",
    text: "Chain abstraction: a user experience exempt from the manual processes required to interact with multiple chains.",
  },
  {
    type: "p",
    text: "If chain abstraction meant Particle’s product, we would own a feature. If it meant a user experience anyone could build toward, we would own the category. Other teams could arrive from messaging, solvers, aggregation, or wallets. They would still be walking into a room we had framed.",
  },
  {
    type: "p",
    text: "Account-level abstraction was the version that fit us. We already had WaaS and AA. We could upgrade the account instead of asking the world to migrate.",
  },
  {
    type: "figure",
    src: `${img}/levels.png`,
    alt: "Three levels of chain abstraction: blockchain, account, application",
    caption: "Blockchain-level, account-level, application-level. We put ourselves in the account-level lane on purpose.",
  },

  {
    type: "h",
    text: "We did the launch work before the launch",
  },
  {
    type: "p",
    text: "Universal Accounts were not going to win as a silent SDK. The industry had to believe fragmentation was the problem, account-level unification was the fix, and Particle was the team that had already lived through two abstraction cycles.",
  },
  {
    type: "p",
    text: "March: the modular L1, tied to the WaaS and AA we already had. May: the stack map. June: the formal definition. June: the first Web3 Fragmentation Report. Data first, slogan second. July: Universal Accounts, in plain language.",
  },
  {
    type: "figure",
    src: `${img}/raise.png`,
    alt: "We've raised $25M to unify all chains",
    caption: "$25M. Alibaba Group, Binance Labs, Avalanche, and others. The three-era line in public: wallet abstraction, account abstraction, chain abstraction.",
  },
  {
    type: "figure",
    src: `${img}/ua-hero.png`,
    alt: "One account, 1000 chains",
    caption: "One account. One balance. Any chain.",
  },
  {
    type: "figures",
    items: [
      {
        src: `${img}/ua-balance.png`,
        alt: "Universal Account unified balance in Pioneer",
        caption: "A single balance, even when the assets sit on different chains.",
      },
      {
        src: `${img}/ua-liquidity.png`,
        alt: "Universal Liquidity flow diagram",
        caption: "Universal Liquidity. The chain does the routing. The user does not.",
      },
    ],
  },

  {
    type: "h",
    text: "A room, not a stunt",
  },
  {
    type: "p",
    text: "We co-wrote the stack with peers. The point was not to be the only voice. The point was to make the category too big for one company to look like a marketing campaign.",
  },
  {
    type: "figure",
    src: `${img}/coalition.png`,
    alt: "Introducing the Chain Abstraction Coalition",
    caption: "Chain Abstraction Coalition. Sixty-plus networks in the room.",
  },
  {
    type: "figure",
    src: `${img}/coalition-wall.png`,
    alt: "Chain Abstraction Coalition member networks",
    caption: "Co-Testnets on Pioneer. Users could feel the thesis instead of only reading it.",
  },

  {
    type: "h",
    text: "If we said it was ready, we should spend through it first",
  },
  {
    type: "p",
    text: "UniversalX existed for a selfish reason. If chain abstraction was real, we should be the first ones to put money through it.",
  },
  {
    type: "figure",
    src: `${img}/universalx.png`,
    alt: "Welcome to UniversalX",
    caption: "December 2024. A chain-agnostic trading terminal.",
  },
  {
    type: "video",
    src: `${vid}/universalx-launch.mp4`,
    poster: `${img}/universalx.png`,
    caption: "UniversalX launch film. The product as the proof.",
  },
  {
    type: "video",
    src: `${vid}/opensea-demo.mp4`,
    poster: `${img}/opensea.jpg`,
    caption: "One account, one balance, any chain. Buying an NFT on OpenSea without the chain as a chore.",
  },
  {
    type: "p",
    text: "Then the SDK, so other apps could adopt the account without waiting for every chain to merge. 2025 was execution on the same line. Accounts in production. A chain-agnostic app doing volume. Integrations lining up.",
  },

  {
    type: "h",
    text: "The lesson, short",
  },
  {
    type: "p",
    text: "We did not jump from wallets to a slogan. We followed the user.",
  },
  {
    type: "p",
    text: "First they could not get an account. We built WaaS. Then the account was dumb. We built AA. Then the account was trapped on one chain. We built Universal Accounts and called the result chain abstraction.",
  },
  {
    type: "figure",
    src: `${img}/messari.jpg`,
    alt: "Messari chart of Universal Account growth in Q1 2025",
    caption: "Messari, Q1 2025. Universal Accounts in the wild.",
  },
  {
    type: "quote",
    text: "We defined the category in public because a movement scales faster than a feature list. Then we shipped the account that made the definition real.",
  },
  {
    type: "p",
    text: "One account. One balance. Any chain.",
  },
  {
    type: "links",
    items: [
      {
        label: "Formal definition",
        href: "https://blog.particle.network/what-is-chain-abstraction-a-formal-definition/",
      },
      {
        label: "$25M raise",
        href: "https://blog.particle.network/25-million-funding/",
      },
      {
        label: "Universal Accounts",
        href: "https://blog.particle.network/universal-accounts/",
      },
      {
        label: "Coalition",
        href: "https://blog.particle.network/many-blockchains-one-mission-introducing-the-chain-abstraction-coalition/",
      },
      {
        label: "UniversalX",
        href: "https://blog.particle.network/universalx/",
      },
      {
        label: "Messari Q1 2025",
        href: "https://messari.io/report/state-of-particle-network-q1-2025",
      },
      {
        label: "State of chain abstraction, 2025",
        href: "https://blog.particle.network/is-chain-abstraction-relevant-in-2025/",
      },
      {
        label: "Particle Network",
        href: "https://particle.network",
      },
    ],
  },
];
