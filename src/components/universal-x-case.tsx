import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Carousel, Slide } from "@/components/case-carousel";

const img = "/images/cases/universalx";
const vid = "/videos/particle";

const toc = [
  { id: "the-sentence", label: "The sentence" },
  { id: "the-bet", label: "The bet" },
  { id: "the-launch", label: "The launch" },
  { id: "the-film", label: "The film" },
  { id: "the-desk", label: "The desk" },
  { id: "the-campaigns", label: "The campaigns" },
  { id: "the-speed", label: "The speed" },
  { id: "the-cut", label: "The cut" },
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

export function UniversalXCase() {
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
        <Chapter id="the-sentence" n="01" title="The sentence">
          <p className="mt-5 text-lg leading-relaxed">
            We had a sentence. One account. One balance. Any chain. It had
            a name, a map, a coalition. It still lived in decks and blog
            posts. If chain abstraction was as real as we said, we should
            be the first to put money through it.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            So we took the sentence and made a product people could open.
            Not an SDK for later. A thing you could trade with today. So
            the market could feel the technology. So we could acquire
            users. So it could become a business.
          </p>
        </Chapter>
        <p className="mx-auto mt-8 max-w-2xl px-5 text-base text-muted sm:px-6">
          The category work is{" "}
          <Link
            to="/brands/$slug"
            params={{ slug: "chain-abstraction" }}
            className="underline underline-offset-4"
          >
            the other case
          </Link>
          . This one is what we shipped on top of it.
        </p>
      </section>

      <blockquote className="mx-auto mt-12 max-w-3xl px-5 font-display text-3xl leading-[1.2] sm:px-6 sm:text-4xl">
        If chain abstraction is so revolutionary, why aren’t we the first
        to trust it with real money?
      </blockquote>

      <section className="scroll-mt-24">
        <Chapter id="the-bet" n="02" title="The bet">
          <p className="mt-5 text-lg leading-relaxed">
            We did not try to be every dApp. Finance is still the thing
            people actually do onchain. Trading is the hardest room: speed,
            fees, tribes, terminals that already own the habit. If the
            account could survive there, it could survive anywhere.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Standing out would be easy. Staying would not. The work was to
            be important to the people who trade, not useful in theory to
            everyone.
          </p>
        </Chapter>
      </section>

      <section className="scroll-mt-24">
        <Chapter id="the-launch" n="03" title="The launch">
          <p className="mt-5 text-lg leading-relaxed">
            3 December 2024. UniversalX: the first chain-agnostic trading
            platform. 100% non-custodial. Any token, any chain, no bridge.
            You hit Buy. The rest is the product’s problem.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Outcome first. Not “intent-centric infrastructure.” Trade any
            token, on any chain. Never bridge again.
          </p>
        </Chapter>
      </section>

      <blockquote className="mx-auto mt-12 max-w-3xl px-5 font-display text-3xl leading-[1.2] sm:px-6 sm:text-4xl">
        Trade any token. On any chain. Never bridge again.
      </blockquote>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/universalx/"
          kicker="Launch · December 2024"
          title="Welcome to UniversalX"
          dek="The first chain-agnostic, 100% non-custodial trading platform."
          thumb={`${img}/og-launch.png`}
          thumbAlt="Welcome to UniversalX"
        />
        <Body>
          <p className="text-lg leading-relaxed opacity-90">
            Deposit from twelve EVMs and Solana. One balance. Send to any
            chain. Pay gas in whatever you hold. Buy with a card if you
            have to. MEV protection on. Desktop, Android, Telegram.
          </p>

          <ol className="mt-10 grid gap-10 sm:grid-cols-3">
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                01
              </p>
              <p className="mt-2 font-display text-xl">The account</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                One Universal Account. Sign in. The chain is not a
                setting.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                02
              </p>
              <p className="mt-2 font-display text-xl">The trade</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                Any token, any chain. Assets on Solana buy a token on
                Arbitrum. You hit Buy.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                03
              </p>
              <p className="mt-2 font-display text-xl">The gas</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                Pay in whatever you hold. The destination gas token is
                ours to fetch.
              </p>
            </li>
          </ol>

          <figure className="mt-10">
            <img
              src={`${img}/launch.png`}
              alt="Welcome to UniversalX"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Welcome to UniversalX.
            </figcaption>
          </figure>

          <figure className="mx-auto mt-8 max-w-[10.5rem]">
            <img
              src={`${img}/howto-1.png`}
              alt="UniversalX buy flow on a phone"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Buy flow on mobile.
            </figcaption>
          </figure>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="the-film" n="04" title="The film">
          <p className="mt-5 text-lg leading-relaxed">
            Launch film. Product cuts. A demo where OpenSea is just another
            chain in the same account.
          </p>
        </Chapter>

        <div className="mx-auto mt-10 grid max-w-3xl gap-8 px-5 sm:grid-cols-2 sm:px-6">
          <figure>
            <video
              className="w-full bg-invert"
              controls
              playsInline
              preload="metadata"
              poster={`${img}/launch-hero.png`}
            >
              <source src={`${vid}/universalx-launch.mp4`} type="video/mp4" />
            </video>
            <figcaption className="mt-3 text-base text-muted">
              Launch film. UniversalX in under a minute.
            </figcaption>
          </figure>
          <figure>
            <video
              className="w-full bg-invert"
              controls
              playsInline
              preload="metadata"
              poster={`${img}/opensea.jpg`}
            >
              <source src={`${vid}/opensea-demo.mp4`} type="video/mp4" />
            </video>
            <figcaption className="mt-3 text-base text-muted">
              OpenSea, any chain, one account.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="scroll-mt-24">
        <Chapter id="the-desk" n="05" title="The desk">
          <p className="mt-5 text-lg leading-relaxed">
            Day zero was simple on purpose. High-volume traders said they
            could spot a token and could not read it. So V2, six weeks
            later: charts, radar, a desk that still did not ask you to
            pick a chain. We did not become a CEX clone. We gave the room
            the tools it already expected, without the map.
          </p>
        </Chapter>
      </section>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/universalx-v2/"
          kicker="Product · January 2025"
          title="UniversalX V2"
          dek="Trade like a pro. Never bridge again. The simple buy button kept. The desk got charts."
          thumb={`${img}/og-v2.png`}
          thumbAlt="UniversalX V2"
        />
        <Body>
          <p className="mb-8 text-lg leading-relaxed">
            Real-time charts. Token discovery. Portfolio. Radar. Still one
            balance.
          </p>
          <Carousel>
            <Slide
              src={`${img}/ui-v2-1.png`}
              alt="UniversalX V2 trading interface"
              caption="V2 trading interface."
            />
            <Slide
              src={`${img}/ui-v2-3.png`}
              alt="UniversalX V2 charts"
              caption="Charts."
            />
            <Slide
              src={`${img}/radar-feed.png`}
              alt="UniversalX Radar"
              caption="Radar."
            />
            <Slide
              src={`${img}/ui-v2-5.png`}
              alt="UniversalX V2 discovery"
              caption="Token discovery."
            />
            <Slide
              src={`${img}/ui-v2-7.png`}
              alt="UniversalX V2 portfolio"
              caption="Portfolio."
            />
          </Carousel>
          <figure className="mt-10">
            <img
              src={`${img}/radar.png`}
              alt="UniversalX Radar across timeframes"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              Radar: New, Blooming, Thriving.
            </figcaption>
          </figure>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="the-campaigns" n="06" title="The campaigns">
          <p className="mt-5 text-lg leading-relaxed">
            The room needed a reason to trade here. Diamonds for the people
            who had already been with us. Cash for volume. Cabals so a group
            could compete. We paid the traders we had chosen.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Later, BNB Week. Extra cash, zero gas, a jackpot. Volume
            jumped six times.
          </p>
        </Chapter>
      </section>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/universalx-v3/"
          kicker="Campaign · June 2025"
          title="UniversalX V3"
          dek="Diamonds. Cash for trading. Cabals."
          thumb={`${img}/og-v3.png`}
          thumbAlt="UniversalX V3"
        />
        <Body>
          <figure>
            <img
              src={`${img}/v3-1.png`}
              alt="UniversalX V3 is a new beginning"
              className="w-full"
            />
            <figcaption className="mt-3 text-base leading-relaxed opacity-70">
              V3 campaign.
            </figcaption>
          </figure>

          <ol className="mt-10 grid gap-10 sm:grid-cols-3">
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                01
              </p>
              <p className="mt-2 font-display text-xl">Diamonds</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                Season 0 in March. Season 1 in June. Pioneer, the
                Launchpad, Capybaras. Past community, one umbrella.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                02
              </p>
              <p className="mt-2 font-display text-xl">Cash</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                A pay-you-to-trade engine. If we have to wage a cash
                rewards war, so be it.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                03
              </p>
              <p className="mt-2 font-display text-xl">Cabals</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                Groups that compete on volume and PnL. The room, trading
                together.
              </p>
            </li>
          </ol>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <figure>
              <img
                src={`${img}/v3-3.jpg`}
                alt="UniversalX cash rewards"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="mt-2 text-base opacity-70">
                Cash rewards.
              </figcaption>
            </figure>
            <figure>
              <img
                src={`${img}/v3-4.jpg`}
                alt="UniversalX Cabals"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="mt-2 text-base opacity-70">
                Cabals.
              </figcaption>
            </figure>
          </div>
        </Body>
      </DarkBand>

      <section className="scroll-mt-24">
        <Chapter id="the-speed" n="07" title="The speed">
          <p className="mt-5 text-lg leading-relaxed">
            Launch in December. A professional terminal in January. The
            application started charging and did not stop. Volume became
            fees. Fees became a business.
          </p>
        </Chapter>

        <div className="mx-auto mt-12 grid max-w-3xl gap-12 px-5 sm:grid-cols-2 sm:px-6">
          <div>
            <p className="text-sm tracking-[0.16em] text-faint uppercase">
              The product
            </p>
            <ul className="mt-6 space-y-8 border-t border-rule pt-8">
              <li>
                <p className="font-display text-5xl tracking-tight">$8M</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  ARR off the terminal. About 1% a trade.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">$800M</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Volume through the app by October 2025. On the way to a
                  billion by year end.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">$5.9M</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Average daily volume, Q1 2025. +15,154% quarter on
                  quarter.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm tracking-[0.16em] text-faint uppercase">
              The pace
            </p>
            <ul className="mt-6 space-y-8 border-t border-rule pt-8">
              <li>
                <p className="font-display text-5xl tracking-tight">6 wks</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Launch to V2. The buy button stayed. Charts arrived six
                  weeks later.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">19.3k</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Daily trades, Q1 2025.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl tracking-tight">$59k</p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Daily fees, Q1 2025. The account was earning.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24">
        <Chapter id="the-cut" n="08" title="The cut">
          <p className="mt-5 text-lg leading-relaxed">
            The lesson was not “be everywhere.” Chain abstraction made us
            different on day one. That is cheap. What kept people was
            knowing exactly who we were for: traders who would rather not
            bridge, who would rather not pick a gas token, who wanted the
            token, not the map.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            We did not try to be everything for everyone. We tried to be
            the important thing for the people who already cared about
            what we could give them. A terminal. A unified balance. A
            reason to stay.
          </p>
        </Chapter>
      </section>

      <DarkBand>
        <ArticleHead
          href="https://blog.particle.network/universalx-2/"
          kicker="Lessons · July 2025"
          title="Lessons from a chain-agnostic app"
          dek="Standing out is easy. Making it stick is the work."
          thumb={`${img}/og-lessons.png`}
          thumbAlt="UniversalX case study on Particle’s blog"
        />
        <Body>
          <ol className="grid gap-8 sm:grid-cols-3">
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                01
              </p>
              <p className="mt-2 font-display text-xl">Different on day one</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                If you ship chain-agnostic, you are already not the others.
                Spend that. Do not hide it.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                02
              </p>
              <p className="mt-2 font-display text-xl">Know who stays</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                Marketing gets easier when you stand out. Retention does
                not. Research who actually trades.
              </p>
            </li>
            <li>
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                03
              </p>
              <p className="mt-2 font-display text-xl">Play the strength</p>
              <p className="mt-2 text-base leading-relaxed opacity-80">
                We already knew onboarding, accounts, community. We pointed
                all of it at trading.
              </p>
            </li>
          </ol>
        </Body>
      </DarkBand>

      <div className="mx-auto mt-16 max-w-2xl px-5 sm:px-6">
        <p className="text-lg leading-relaxed">
          The category gave us a sentence. The terminal made it a business.
        </p>
        <p className="mt-8 font-display text-2xl">
          Trade any token. On any chain.
        </p>
      </div>
    </div>
  );
}
