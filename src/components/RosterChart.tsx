import { FLEET, type FleetBot } from "@/data/fleet";

function ComputerMark() {
  return (
    <svg className="org-computer" viewBox="0 0 40 32" aria-hidden>
      <rect x="4" y="3" width="32" height="22" rx="3" />
      <path d="M14 29h12M20 25v4" />
      <circle cx="29.5" cy="9.5" r="1.5" />
    </svg>
  );
}

function AgentCard({ bot }: { bot: FleetBot }) {
  const body = (
    <>
      <span className="org-avatar" style={{ background: bot.color }} aria-hidden>
        <ComputerMark />
      </span>
      <span className="org-name">{bot.name}</span>
      <span className="org-status">
        <i aria-hidden />
        Computer ready
      </span>
      <span className="org-blurb">{bot.blurb}</span>
    </>
  );

  return bot.jobId ? (
    <a className="org-box" href={`#${bot.jobId}`}>
      {body}
    </a>
  ) : (
    <div className="org-box">{body}</div>
  );
}

export function RosterChart() {
  return (
    <section id="roster" className="roster">
      <p className="eyebrow">The agent fleet</p>
      <h2>Each agent gets a computer, not a job title.</h2>
      <p className="section-lede">
        The fleet can open tools, carry context forward, and hand work to the
        next agent. Customer-facing work stays parked until the rep reviews it.
      </p>

      <ul className="org-kids">
        {FLEET.map((agent) => (
          <li key={agent.id} className="org-kid">
            <AgentCard bot={agent} />
          </li>
        ))}
      </ul>
    </section>
  );
}
