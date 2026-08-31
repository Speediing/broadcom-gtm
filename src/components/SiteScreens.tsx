import type { Artifact, DemoMessage, SlideCard } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { NEXT_STEP_SLIDES } from "@/data/jobs";
import { HeardSlide } from "./HeardSlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}

function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}

function asLinkedin(artifact?: Artifact) {
  return artifact?.kind === "linkedin" ? artifact : null;
}

function asOnePager(artifact?: Artifact) {
  return artifact?.kind === "one-pager" ? artifact : null;
}

function asOutbound(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  switch (beat.site) {
    case "granola":
      return <GranolaScreen account={account} />;
    case "figma":
      return <FigmaScreen account={account} artifact={artifact} />;
    case "gmail":
      return (
        <GmailScreen account={account} artifact={asGmail(artifact)} sent={sent} />
      );
    case "linkedin":
      return (
        <LinkedInScreen
          account={account}
          artifact={asLinkedin(artifact)}
          sent={sent}
        />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return (
        <PageScreen
          account={account}
          onePager={asOnePager(artifact)}
          outbound={asOutbound(artifact)}
        />
      );
    case "gdoc":
      return <GdocScreen account={account} artifact={artifact} />;
    default: {
      const exhaustive: never = beat.site;
      return exhaustive;
    }
  }
}

function GranolaScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>Meeting record</span>
      </header>
      <p className="site-time">{account} technical discovery</p>
      <ul>
        <li>
          <span>Scope</span> Private cloud goals and current platform work
        </li>
        <li>
          <span>Owners</span> Technical owners still to confirm
        </li>
        <li>
          <span>Questions</span> Workload scope and working-session focus
        </li>
        <li>
          <span>Next step</span> Draft only until the rep reviews it
        </li>
      </ul>
    </div>
  );
}

function FigmaScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const slides = asSlides(artifact);
  const cards: SlideCard[] = slides?.cards ?? NEXT_STEP_SLIDES;

  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>{slides?.title || `${account} working session`}</strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        <HeardSlide slides={cards} size="sm" />
      </div>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} team`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || `${account} working session`}
      </p>
      <div>{artifact?.body || "Draft parked until the rep reviews it."}</div>
    </div>
  );
}

function LinkedInScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asLinkedin>;
  sent: boolean;
}) {
  return (
    <div className="site site-linkedin">
      <header>
        <strong>LinkedIn</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} contact`}
        {artifact?.role ? ` · ${artifact.role}` : ""}
      </p>
      <div>{artifact?.body || "Draft parked until the rep reviews it."}</div>
    </div>
  );
}

function GdocScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>{artifact?.title || `${account} brief`}</span>
      </header>
      <article>
        {artifact?.kind === "packet"
          ? artifact.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}.</b> {field.value}
              </p>
            ))
          : artifact?.kind === "one-pager"
            ? artifact.sections.map((section) => (
                <p key={section.heading}>
                  <b>{section.heading}.</b> {section.body}
                </p>
              ))
            : artifact?.kind === "outbound"
              ? artifact.hypothesis.map((item) => (
                  <p key={item.k}>
                    <b>{item.k}.</b> {item.body}
                  </p>
                ))
              : (
                  <p>Working note for {account}. Unknowns stay open.</p>
                )}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}</strong>
        <span>Public sources</span>
      </header>
      <p className="site-time">Researching the account on its own terms</p>
      <ul>
        <li>
          <span>Company site</span> Company and product context
        </li>
        <li>
          <span>Product pages</span> Current infrastructure language
        </li>
        <li>
          <span>Company news</span> Recent public updates
        </li>
        <li>
          <span>Open roles</span> Public team and skill context
        </li>
      </ul>
    </div>
  );
}

function PageScreen({
  account,
  onePager,
  outbound,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  outbound: ReturnType<typeof asOutbound>;
}) {
  const headline =
    outbound?.page.headline || onePager?.title || `For ${account}`;

  return (
    <div className="site site-page">
      <header>
        <strong>Account note</strong>
        <em>Not live</em>
      </header>
      <h4>{headline}</h4>
      {onePager ? (
        onePager.sections.map((section) => (
          <p key={section.heading}>
            <b>{section.heading}.</b> {section.body}
          </p>
        ))
      ) : outbound ? (
        <>
          <p>{outbound.page.body}</p>
          {outbound.hypothesis.map((item) => (
            <p key={item.k}>
              <b>{item.k}.</b> {item.body}
            </p>
          ))}
        </>
      ) : (
        <p>A draft account note for {account}.</p>
      )}
    </div>
  );
}
