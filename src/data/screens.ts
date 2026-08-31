import type { JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gmail"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  tabs: ChromeTab[];
};

const research = {
  id: "research",
  host: "target-account.example",
  label: "Research",
};
const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const gdoc = { id: "gdoc", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const page = {
  id: "page",
  host: "account-note.example",
  label: "Account note",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "account-brief": {
    m1: {
      pill: "Opening public account context",
      host: research.host,
      path: "/company",
      title: "Target account",
      site: "research",
      tabs: [research, gdoc, gmail],
    },
    m2: {
      pill: "Checking product context",
      host: research.host,
      path: "/products",
      title: "Product context",
      site: "research",
      tabs: [research, gdoc, gmail],
    },
    m3: {
      pill: "Organizing research notes",
      host: gdoc.host,
      path: "/document/d/account-research",
      title: "Target account research",
      site: "gdoc",
      tabs: [research, gdoc, gmail],
    },
    m4: {
      pill: "Writing the call brief",
      host: gdoc.host,
      path: "/document/d/call-brief",
      title: "Private cloud call brief",
      site: "gdoc",
      tabs: [research, gdoc, gmail],
    },
    m5: {
      pill: "Brief parked for review",
      host: gdoc.host,
      path: "/document/d/call-brief",
      title: "Private cloud call brief",
      site: "gdoc",
      tabs: [research, gdoc, gmail],
    },
  },
  "call-follow-up": {
    m1: {
      pill: "Following the meeting record",
      host: granola.host,
      path: "/notes/technical-discovery",
      title: "Technical discovery",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "Sorting confirmed topics and questions",
      host: granola.host,
      path: "/notes/technical-discovery",
      title: "Technical discovery",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Updating the next-step deck",
      host: figma.host,
      path: "/file/working-session",
      title: "Working session recap",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Drafting follow-up, not sent",
      host: gmail.host,
      path: "/mail/u/0/drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, figma, gmail],
    },
    m5: {
      pill: "Drafts parked for review",
      host: gmail.host,
      path: "/mail/u/0/drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, figma, gmail],
    },
  },
  "account-signal": {
    m1: {
      pill: "Researching the public record",
      host: research.host,
      path: "/company",
      title: "Target account",
      site: "research",
      tabs: [research, gdoc, linkedin, page],
    },
    m2: {
      pill: "Checking the account signal",
      host: research.host,
      path: "/news",
      title: "Company news",
      site: "research",
      tabs: [research, gdoc, linkedin, page],
    },
    m3: {
      pill: "Writing the account context",
      host: gdoc.host,
      path: "/document/d/account-context",
      title: "AI infrastructure account context",
      site: "gdoc",
      tabs: [research, gdoc, linkedin, page],
    },
    m4: {
      pill: "Building the account note",
      host: page.host,
      path: "/draft",
      title: "AI infrastructure account note",
      site: "page",
      tabs: [research, gdoc, linkedin, page],
    },
    m5: {
      pill: "Account note parked for review",
      host: page.host,
      path: "/draft",
      title: "AI infrastructure account note",
      site: "page",
      tabs: [research, gdoc, linkedin, page],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
