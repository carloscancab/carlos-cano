import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Carousel, Slide } from "@/components/case-carousel";

const img = "/images/cases/particle";

const toc = [
  { id: "sign-in", label: "Where we started" },
  { id: "the-problem", label: "The problem (or opportunity!)" },
  { id: "the-product", label: "Branding the product" },
  { id: "the-name", label: "The name" },
  { id: "the-edges", label: "The edges" },
  { id: "the-map", label: "The map" },
  { id: "pioneer", label: "Pioneer" },
  { id: "the-coalition", label: "The coalition" },
  { id: "the-echo", label: "The echo" },
  { id: "the-numbers", label: "The results" },
] as const;

function DarkBand({ children }: { children: ReactNode }) {
  return (
    <section className="mt-14 bg-invert py-16 text-invert-fg sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">{children}</div>
    </section>
  );
}

function Chapter({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <p className="text-sm tracking-[0.16em] text-faint uppercase">{n}</p>
      <h2
        id={id}
        className="mt-3 scroll-mt-28 font-display text-3xl sm:text-4xl"
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function ArticleHead({
  href,
  kicker,
  title,
  dek,
  thumb,
  thumbAlt,
}: {
  href: string;
  kicker: string;
  title: string;
  dek: string;
  thumb: string;
  thumbAlt: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5"
    >
      <img
        src={thumb}
        alt={thumbAlt}
        className="aspect-[16/9] w-full shrink-0 object-cover sm:h-[4.75rem] sm:w-36 sm:aspect-auto"
      />
      <div className="min-w-0">
        <p className="text-sm tracking-[0.16em] uppercase opacity-60">
          {kicker}
        </p>
        <h3 className="mt-1 font-display text-xl leading-snug group-hover:underline sm:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 text-base leading-relaxed opacity-80">{dek}</p>
      </div>
    </a>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 border-t border-white/15 pt-8">{children}</div>
  );
}

function Territory() {
  const lanes = [
    {
      label: "Comprehensive",
      items: [
        "NEAR",
        "Polygon AggLayer",
        "Optimism Superchain",
        "Particle Network",
      ],
    },
    {
      label: "Orchestration",
      items: ["Agoric", "Socket", "Skip"],
    },
    {
      label: "Foundational",
      items: ["LayerZero", "Hyperlane", "Axelar", "ZetaChain"],
    },
  ];
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {lanes.map((lane) => (
        <div key={lane.label}>
          <p className="text-sm tracking-[0.16em] uppercase opacity-60">
            {lane.label}
          </p>
          <ul className="mt-3 space-y-1.5">
            {lane.items.map((item) => (
              <li key={item} className="font-display text-lg leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Echo({
  href,
  who,
  handle,
  text,
}: {
  href: string;
  who: string;
  handle: string;
  text: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block border-t border-rule pt-5"
    >
      <p className="font-display text-2xl leading-snug sm:text-3xl">“{text}”</p>
      <p className="mt-3 text-base text-muted">
        {who} · {handle}
      </p>
    </a>
  );
}

export function ChainAbstractionCase() {
  return (
    <div className="pb-24">
      <nav
        aria-label="Contents"
        className="mx-auto mt-10 max-w-3xl border-y border-rule px-5 py-6 sm:px-6"
      >
        <p className="text-sm tracking-[0.16em] text-faint uppercase">
          Contents
        </p>
        <ol className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-base">
          {toc.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="min-h-11 hover:underline">
                <span className="text-faint">
                  {String(i + 1).padStart(2, "0")}{" "}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="scroll-mt-24">
        <Chapter id="sign-in" n="01" title="Where we started">
          <p className="mt-5 text-lg leading-relaxed">
            From day one, Particle Network did one thing: try to make Web3 as
            easy as an app.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            The goal was fixing Web3’s user experience. The first product was
            in-app wallets, launching alongside{" "}
            <a
              href="https://www.privy.io/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Privy
            </a>
            ,{" "}
            <a
              href="https://web3auth.io/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Web3Auth
            </a>
            , and others. Then came building Smart Accounts into it.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            A person could go into a dApp, start using it the way they open
            Gmail, create a wallet instantly, and deposit assets. Without
            thinking about seed phrases, the network’s gas token, extensions,
            or receiving a lecture.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            <strong className="font-medium">
              This was, of course, before Web3 decided to complicate
              everything again.
            </strong>
          </p>
        </Chapter>

        <figure className="mx-auto mt-12 max-w-sm px-5 sm:px-6">
          <img
            src={`${img}/waas-login.png`}
            alt="Particle Wallet-as-a-Service: log in with email, Google, Apple, or a wallet"
            className="w-full"
          />
          <figcaption className="mt-3 text-base leading-relaxed text-muted">
            Wallet-as-a-Service. Email, Google, Apple, or the wallet they
            already have. An account, inside the app, just like in FinTech.
            Believe it or not this was revolutionary.
          </figcaption>
        </figure>
      </section>

      <section className="scroll-mt-24">
        <Chapter id="the-problem" n="02" title="The problem (or opportunity!)">
          <p className="mt-5 text-lg leading-relaxed">
            Right around 2024, Web3 collectively decided to make every app as
            difficult to use as possible.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            From 2023 into 2024, new chains were shipping pretty much daily.
            L2s, appchains, Bitcoin L2s, modular frameworks, each with their
            own hype cycle and airdrop. For users, this meant more buttons,
            new gas tokens, an excess of bridges, and bigger problems tracking
            their money.
          </p>
        </Chapter>

        <blockquote className="mx-auto mt-12 max-w-3xl px-5 font-display text-3xl leading-[1.2] sm:px-6 sm:text-4xl">
          We had solved onboarding. The new problem was that every user base
          was disconnected.
        </blockquote>
        <blockquote className="mx-auto mt-8 max-w-3xl px-5 font-display text-3xl leading-[1.2] sm:px-6 sm:text-4xl">
          And certainly, the UX company had to find a way to solve it.
        </blockquote>
      </section>

      <DarkBand>
        <h2 className="font-display text-3xl leading-[1.2] sm:text-4xl">
          So we began defining the problem, and ringing the alarm.
        </h2>
        <div className="mt-10">
          <ArticleHead
            href="https://blog.particle.network/quantifying-the-impact-of-chain-abstraction-exposing-web3s-inefficiencies/"
            kicker="Report · June 2024"
            title="State of Web3 fragmentation"
            dek="Addressing Web3’s biggest problem, and its solution."
            thumb={`${img}/frag-hero.jpg`}
            thumbAlt="Web3 Fragmentation Report"
          />
        </div>
        <Body>
          <p className="text-sm tracking-[0.16em] uppercase opacity-60">
            Key findings
          </p>
          <ol className="mt-8 grid gap-12 sm:grid-cols-2">
            <li>
              <p className="font-display text-5xl tracking-tight sm:text-6xl">
                8.29M
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                Daily active users in all of Web3. Somehow expected to use
                1000+ chains.
              </p>
            </li>
            <li>
              <p className="font-display text-5xl tracking-tight sm:text-6xl">
                $11B
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                Peak quarterly VC into crypto, Q1 2022. Most of it turned into
                incentives to get new users. Unsustainable.
              </p>
            </li>
            <li>
              <p className="font-display text-5xl tracking-tight sm:text-6xl">
                $144M+
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                Daily bridge volume. About 1/35 of DeFi. Unanimously hated UX.
              </p>
            </li>
            <li>
              <p className="font-display text-5xl tracking-tight sm:text-6xl">
                75%+
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                TVL on most chains sat in the top ten dApps. Ethereum: 85%+.
                New chains copied; very few profited.
              </p>
            </li>
          </ol>
          <p className="mt-14 max-w-2xl text-lg leading-relaxed sm:text-xl">
            DeFi TVL was roughly one-twentieth of a $2.1T industry. The
            (zero-sum) game was forcing users to lock into an ecosystem and
            never leave.
          </p>
          <div className="mt-12">
            <Carousel>
              <Slide
                frame="chart"
                src={`${img}/frag-chart-bridge.png`}
                alt="Daily volume of DEXs, CEXs, and bridges"
                caption="CEXs still dwarf DEXs. Bridges sit under both."
              />
              <Slide
                frame="chart"
                src={`${img}/frag-chart-vc.png`}
                alt="TVL concentration in top DeFi protocols"
                caption="TVL concentration in the top DeFi protocols."
              />
              <Slide
                frame="chart"
                src={`${img}/frag-image-2.png`}
                alt="Average daily transactions on popular chains"
                caption="Average daily transactions on popular chains."
              />
              <Slide
                frame="chart"
                src={`${img}/frag-image-5.png`}
                alt="Share of DeFi TVL across chains"
                caption="Share of DeFi TVL across chains."
              />
            </Carousel>
          </div>
          <p className="mt-14 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Web3 needed a way to reconcile 1000 chains with the way users
            really wanted to experience the ecosystem: As an extension of
            the Internet they already used.
          </p>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="the-product" n="03" title="Branding the product">
          <p className="mt-5 text-lg leading-relaxed">
            We knew what the product needed to do:
          </p>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-lg leading-relaxed">
            <li>
              Leverage our existing positioning, partner network, and
              technology.
            </li>
            <li>
              Eliminate the main problems of an ecosystem with 1000 chains:
              bridging, multiple gas tokens, and scattered balances.
            </li>
            <li>
              Make{" "}
              <strong className="font-medium">users</strong> excited so that{" "}
              <strong className="font-medium">companies</strong> would want to
              provide them this experience.
            </li>
          </ul>
        </Chapter>
      </section>

      <section className="mt-14 bg-invert py-16 text-invert-fg sm:py-20">
        <p className="px-3 text-center text-sm tracking-[0.2em] uppercase opacity-60">
          Universal Accounts
        </p>
        <p className="mt-5 px-3 text-center font-display text-[clamp(1.05rem,4.1vw,3.35rem)] leading-none tracking-tight whitespace-nowrap">
          One account. One balance. Any chain.
        </p>
        <div className="mx-auto mt-14 max-w-3xl px-5 sm:px-6">
          <ArticleHead
            href="https://blog.particle.network/universal-accounts/"
            kicker="Product · 2024"
            title="Universal Accounts"
            dek="One account. One balance. Any chain. Account-level chain abstraction (more about that soon!)."
            thumb={`${img}/ua-hero.png`}
            thumbAlt="One account, 1000 chains"
          />
          <Body>
          <p className="text-lg leading-relaxed">
            A Universal Account is a smart account that sits across chains.
            One address. Assets wherever they actually are, treated as one
            balance. The user does not pick a network, does not bridge, does
            not hold five gas tokens. They sign. The rest is the product’s
            problem.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Particle’s L1 coordinates. It is not what the user uses. The
            user uses an account.
          </p>

          <ol className="mt-10 grid gap-10 sm:grid-cols-3">
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                01
              </p>
              <p className="mt-2 font-display text-xl">The account</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                One address, ERC-4337, on every chain that matters. The
                signature is the same. The chain is not the user’s job.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                02
              </p>
              <p className="mt-2 font-display text-xl">The liquidity</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                Universal Liquidity. Settle, swap, send from the unified
                balance. The money moves. The user does not.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                03
              </p>
              <p className="mt-2 font-display text-xl">The gas</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                Universal Gas. Pay the fee in whatever they hold. The
                destination’s gas token is ours to fetch.
              </p>
            </li>
          </ol>

          <figure className="mx-auto mt-10 max-w-lg">
            <img
              src={`${img}/ua-composition.png`}
              alt="How Universal Accounts work: account, liquidity, gas"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Account, liquidity, and gas.
            </figcaption>
          </figure>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <figure>
              <img
                src={`${img}/ua-balance.png`}
                alt="Unified balance across chains"
                className="w-full"
              />
              <figcaption className="mt-3 text-base leading-relaxed opacity-70">
                One balance.
              </figcaption>
            </figure>
            <figure>
              <img
                src={`${img}/ua-liquidity.png`}
                alt="Universal Liquidity"
                className="w-full"
              />
              <figcaption className="mt-3 text-base leading-relaxed opacity-70">
                Universal Liquidity.
              </figcaption>
            </figure>
            <figure>
              <img
                src={`${img}/ua-gas.png`}
                alt="Universal Gas"
                className="w-full"
              />
              <figcaption className="mt-3 text-base leading-relaxed opacity-70">
                Gas, in any token.
              </figcaption>
            </figure>
          </div>
          <figure className="mx-auto mt-8 max-w-[10.5rem]">
            <img
              src={`${img}/ua-ui.jpeg`}
              alt="Universal Account interface: tokens across chains, one balance"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Tokens on different chains. One balance.
            </figcaption>
          </figure>
        </Body>
        </div>
      </section>

      <section className="scroll-mt-24">
        <Chapter id="the-name" n="04" title="The name">
          <p className="mt-5 text-lg leading-relaxed">
            Once the tax had a name, the destination needed one too. We
            published a definition. “Omnichain smart accounts” is a spec.
            “Our L1” is a sales pitch. “Chain abstraction” described the
            outcome, not our stack.
          </p>
        </Chapter>
      </section>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/what-is-chain-abstraction-a-formal-definition/"
          kicker="Article · June 2024"
          title="What is chain abstraction?"
          dek="A formal definition of chain abstraction."
          thumb={`${img}/definition.jpg`}
          thumbAlt="What is chain abstraction?"
        />
        <Body>
          <p className="font-display text-2xl leading-[1.25] sm:text-3xl">
            Chain abstraction: a user experience exempt from the manual
            processes required to interact with multiple chains.
          </p>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="the-edges" n="05" title="The edges">
          <p className="mt-5 text-lg leading-relaxed">
            Next: what the category is. Three levels: blockchain, account,
            application. We took account-level on purpose. We already lived
            where the user sits, where the balance sits, where the signature
            happens.
          </p>
        </Chapter>
      </section>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/chain-abstraction-levels-user-experience/"
          kicker="Article · May 2024"
          title="The limits and the core"
          dek="Blockchain-level, account-level, application-level."
          thumb={`${img}/levels-hero.jpg`}
          thumbAlt="Multi-level chain abstraction"
        />
        <Body>
          <figure>
            <img
              src={`${img}/levels.png`}
              alt="Three levels of chain abstraction: blockchain, account, application"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Blockchain-level, account-level, application-level.
            </figcaption>
          </figure>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <figure>
              <img
                src={`${img}/entering.jpg`}
                alt="BTC Connect: entering Bitcoin"
                className="w-full"
              />
              <figcaption className="mt-3 text-base leading-relaxed opacity-70">
                BTC Connect.
              </figcaption>
            </figure>
            <figure>
              <img
                src={`${img}/intents.jpg`}
                alt="Intent-centric architecture"
                className="w-full"
              />
              <figcaption className="mt-3 text-base leading-relaxed opacity-70">
                Intent-centric architecture.
              </figcaption>
            </figure>
            <figure className="sm:col-span-2">
              <img
                src={`${img}/levels-tweet.jpg`}
                alt="The levels article, in the feed"
                className="mx-auto max-w-md"
              />
              <figcaption className="mt-3 text-base leading-relaxed opacity-70">
                The levels article, posted.
              </figcaption>
            </figure>
          </div>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="the-map" n="06" title="The map">
          <p className="mt-5 text-lg leading-relaxed">
            We mapped which projects mattered most to rally behind the
            cause: who could play, and how.
          </p>
        </Chapter>
      </section>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/chain-abstraction-landscape-report/"
          kicker="Article · April 2024"
          title="Mapping the territory"
          dek="A map of projects working on chain abstraction."
          thumb={`${img}/landscape.jpg`}
          thumbAlt="Navigating the chain abstraction landscape"
        />
        <Body>
          <p className="mb-8 text-lg leading-relaxed">
            Who was in which lane.
          </p>
          <Territory />
          <figure className="mt-10">
            <img
              src={`${img}/landscape-map.png`}
              alt="Chain abstraction landscape: comprehensive, orchestration, and foundational approaches"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Comprehensive, orchestration, and foundational approaches.
            </figcaption>
          </figure>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="pioneer" n="07" title="Pioneer">
          <p className="mt-5 text-lg leading-relaxed">
            Pioneer was the testnet. Co-testnets with partners. People sent,
            swapped, and held a unified balance while the network was still
            in rehearsal.
          </p>
        </Chapter>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 px-5 sm:grid-cols-2 sm:px-6">
          <figure>
            <img
              src={`${img}/cotestnet1.jpg`}
              alt="Particle Pioneer co-testnet"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="mt-2 text-base text-muted">
              Pioneer · co-testnet
            </figcaption>
          </figure>
          <figure>
            <img
              src={`${img}/cotestnet2.jpg`}
              alt="Pioneer testnet, in use"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="mt-2 text-base text-muted">
              Pioneer · testnet
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="scroll-mt-24">
        <Chapter id="the-coalition" n="08" title="The coalition">
          <p className="mt-5 text-lg leading-relaxed">
            A definition on a blog does not move an industry. People have to
            say the problem out loud: on stages, in rooms, on Spaces.
            Fragmentation is the tax. Chain abstraction is the destination.
          </p>
        </Chapter>
      </section>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/many-blockchains-one-mission-introducing-the-chain-abstraction-coalition/"
          kicker="Ecosystem · 2024"
          title="The Chain Abstraction Coalition"
          dek="An ecosystem initiative. Sixty-plus networks."
          thumb={`${img}/coalition.png`}
          thumbAlt="Introducing the Chain Abstraction Coalition"
        />
        <Body>
          <p className="text-lg leading-relaxed">
            The Coalition was how we expanded the ecosystem. Sixty-plus
            networks signed on.
          </p>

          <p className="mt-10 text-sm tracking-[0.16em] uppercase opacity-60">
            The rooms
          </p>
          <div className="mt-5">
            <Carousel>
              <Slide
                src={`${img}/ethseoul.jpg`}
                alt="Particle at ETH Seoul"
                caption="ETH Seoul · Hong Kong · April 2024"
              />
              <Slide
                src={`${img}/abstract-summit.jpg`}
                alt="Abstract Summit"
                caption="Abstract Summit · TOKEN2049"
              />
              <Slide
                src={`${img}/abstract-coffee.jpg`}
                alt="Abstract Coffee"
                caption="Abstract Coffee · pay from any chain"
              />
              <Slide
                src={`${img}/cha-panel.jpg`}
                alt="Chain-abstracted future panel"
                caption="Chain-abstracted future panel"
              />
            </Carousel>
          </div>
          <figure className="mt-10">
            <img
              src={`${img}/coalition-wall.png`}
              alt="Chain Abstraction Coalition partners"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Coalition member networks.
            </figcaption>
          </figure>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="the-echo" n="09" title="The echo">
          <p className="mt-5 text-lg leading-relaxed">
            The test was whether other people would say it. If the work stayed
            in our deck, it was a campaign. If it showed up in someone else’s
            roadmap, it was a category. Polygon built AggLayer so users would
            not need to know which chain they are on. NEAR called it the next
            frontier. Arcana named the same primitive: one balance. Messari
            put it on the 2025 list.
          </p>
        </Chapter>

        <div className="mx-auto mt-12 max-w-3xl px-5 sm:px-6">
          <Echo
            href="https://polygon.technology/blog/clearing-up-agglayer-misconceptions"
            who="Polygon"
            handle="AggLayer"
            text="This is an important kind of chain abstraction: users won’t need to know what chain they’re on."
          />
          <Echo
            href="https://pages.near.org/blog/why-chain-abstraction-is-the-next-frontier-for-web3/"
            who="NEAR"
            handle="Illia Polosukhin"
            text="Chain abstraction is the next frontier for web3."
          />
          <Echo
            href="https://x.com/ArcanaNetwork/status/1926978355049513180"
            who="Arcana"
            handle="Unified Balance"
            text="Assets across chains. One balance, one experience."
          />
          <Echo
            href="https://messari.io/report/the-crypto-theses-2025"
            who="Messari"
            handle="Crypto Theses 2025"
            text="Chain abstraction is shaping up to be one of the biggest trends to watch in the coming year."
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl px-5 sm:px-6">
          <p className="text-sm tracking-[0.16em] text-faint uppercase">
            Elsewhere
          </p>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            The same line, used by other teams.
          </p>
          <div className="mt-6">
            <Carousel>
              <Slide
                src={`${img}/mono-phrase.jpg`}
                alt="Mono Protocol: one account, one balance, any chain"
                caption="Mono Protocol · one account, one balance, any chain"
              />
              <Slide
                src={`${img}/echo-tria.jpg`}
                alt="Tria: one app, one balance"
                caption="Tria · one app, one balance"
              />
              <Slide
                src={`${img}/echo-onebalance.jpg`}
                alt="OneBalance: a single spendable balance"
                caption="OneBalance"
              />
              <Slide
                src={`${img}/echo-arcana.jpg`}
                alt="Arcana: unified balance, one experience"
                caption="Arcana · one balance, one experience"
              />
              <Slide
                src={`${img}/echo-okto.png`}
                alt="Okto: one wallet interface across ecosystems"
                caption="Okto · one wallet, 30+ ecosystems"
              />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24">
        <Chapter id="the-numbers" n="10" title="The results">
          <p className="mt-5 text-lg leading-relaxed">
            The narrative moved capital. Teams raised on chain abstraction.
            Analysts wrote it into the year ahead. We used it in public for
            a $25M raise.
          </p>
        </Chapter>

        <div className="mx-auto mt-12 grid max-w-3xl gap-12 px-5 sm:grid-cols-2 sm:px-6">
          <div>
            <p className="text-sm tracking-[0.16em] text-faint uppercase">
              Particle
            </p>
            <ul className="mt-6 space-y-8 border-t border-rule pt-8">
              <li>
                <p className="font-display text-5xl tracking-tight">$25M</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Raised to unify all chains. Alibaba Group, Binance Labs,
                  Avalanche, Spartan, and others.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">110,900</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Universal Accounts, Q1 2025. +557.6% quarter on quarter.
                  Messari.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">90+</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Teams integrating. 60+ Coalition networks.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm tracking-[0.16em] text-faint uppercase">
              The industry
            </p>
            <ul className="mt-6 space-y-8 border-t border-rule pt-8">
              <li>
                <p className="font-display text-5xl tracking-tight">$2.3B+</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Raised across the chain abstraction and interop map by early
                  2025. Seventy-two projects.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">80+</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Projects on the Chain Abstraction Hub. A year earlier the
                  term barely had a definition.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">$35B+</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Cumulative FDV of live tokens in that map.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl px-5 sm:px-6">
          <p className="text-lg leading-relaxed">
            We named the destination and shipped the account that made the
            definition real. What that account became in the market is the
            next case.
          </p>
          <p className="mt-8 font-display text-2xl">
            One account. One balance. Any chain.
          </p>
          <p className="mt-8 text-base leading-relaxed text-muted">
            Also:{" "}
            <Link
              to="/c/$slug"
              params={{ slug: "technical" }}
              className="underline underline-offset-4 hover:text-fg"
            >
              Particle docs
            </Link>
            , the{" "}
            <Link
              to="/audience/$slug"
              params={{ slug: "institutional" }}
              className="underline underline-offset-4 hover:text-fg"
            >
              7702 Collective
            </Link>
            , and{" "}
            <Link to="/studio" className="underline underline-offset-4 hover:text-fg">
              Real-World Value
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-xl px-5 sm:px-6">
          <p className="text-sm tracking-[0.16em] text-faint uppercase">
            Next
          </p>
          <Link
            to="/brands/$slug"
            params={{ slug: "universal-x" }}
            className="group mt-6 block"
          >
            <div className="aspect-[3/2] overflow-hidden bg-surface">
              <img
                src="/images/universal-x.jpg"
                alt="Ink restyle of the Universal X radiating mark"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 text-sm tracking-[0.16em] text-faint uppercase">
              Case study · Retail
            </p>
            <h3 className="mt-1 font-display text-2xl group-hover:underline">
              Universal X
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              The most competitive market of 2025-2026, and how we managed
              to stand out.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
