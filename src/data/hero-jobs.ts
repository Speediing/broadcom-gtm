export const HERO_JOB_ICONS = [
  "outbound",
  "research",
  "follow-up",
  "deal-desk",
  "pipeline",
  "renewal",
  "competitive",
  "chief-of-staff",
] as const;

export type HeroJobIcon = (typeof HERO_JOB_ICONS)[number];

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS = [
  {
    name: "Account Research",
    icon: "research",
    account: "Target account",
    signal: "A meeting was added",
    work: "I opened the company site, product pages, and the account notes. I put the public context, open questions, and meeting plan in one brief.",
    result: "Account brief ready",
    user: "show me the brief before the meeting",
    bot: "it is ready. i left the open questions in place.",
  },
  {
    name: "Call Prep",
    icon: "research",
    account: "Private cloud meeting",
    signal: "A meeting is on the calendar",
    work: "I read the public account context and the notes already on file. I prepared a short agenda around VMware Cloud Foundation and the questions still open.",
    result: "Call plan ready",
    user: "keep it short",
    bot: "done. the brief fits on one page.",
  },
  {
    name: "Call Follow-up",
    icon: "follow-up",
    account: "Technical discovery",
    signal: "A customer call ended",
    work: "I organized the confirmed topics, kept unknowns as questions, and drafted the recap and next-step deck.",
    result: "Recap and deck ready",
    user: "park both for review",
    bot: "both drafts are ready. nothing was sent.",
  },
  {
    name: "Deal Desk",
    icon: "deal-desk",
    account: "Open opportunity",
    signal: "A product question arrived",
    work: "I checked the approved product material and the notes already on file. I drafted an answer and marked the item that still needs an owner.",
    result: "Sourced answer ready",
    user: "send me the open item",
    bot: "it is in the draft. the rest is ready to review.",
  },
  {
    name: "Pipeline Check",
    icon: "pipeline",
    account: "Account list",
    signal: "An opportunity has no next step",
    work: "I checked the recent activity and pulled the missing questions into a short account note. I did not change the opportunity.",
    result: "Next-step note ready",
    user: "share it with the account owner",
    bot: "the note is ready for their review.",
  },
  {
    name: "Renewal Prep",
    icon: "renewal",
    account: "Renewal account",
    signal: "A renewal review is coming up",
    work: "I gathered the account notes, open product questions, and the last agreed next step. I put them in a clean prep sheet.",
    result: "Renewal prep ready",
    user: "flag anything we have not confirmed",
    bot: "done. unknowns are marked as questions.",
  },
  {
    name: "Competitive Prep",
    icon: "competitive",
    account: "Customer meeting",
    signal: "A competitor came up",
    work: "I found the approved comparison material and matched it to the topic on the call. I drafted a short response for the rep.",
    result: "Talk track ready",
    user: "add it to the call brief",
    bot: "added. it is ready for review.",
  },
  {
    name: "Team Brief",
    icon: "chief-of-staff",
    account: "Weekly team review",
    signal: "The review is on the calendar",
    work: "I gathered the open decisions and next steps from the account notes. I prepared one brief for the team to review.",
    result: "Team brief ready",
    user: "send me the draft",
    bot: "the draft is ready. nothing was posted.",
  },
] as const satisfies readonly HeroJob[];
