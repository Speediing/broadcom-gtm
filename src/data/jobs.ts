import type { Artifact, GtmJob, SlideCard } from "./types";

export const ACCOUNT_BRIEF: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "Private cloud call brief",
  eyebrow: "Ready for rep review",
  sections: [
    {
      heading: "Public context",
      body: "Target account context is organized around its current infrastructure work and the Broadcom products already in view.",
    },
    {
      heading: "Open questions",
      body: "Workload scope, the technical owner, and the next decision stay open until the customer confirms them.",
    },
    {
      heading: "Call plan",
      body: "Start with the account context, ask the open questions, and keep the next step small enough to be useful.",
    },
  ],
};

export const NEXT_STEP_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Call recap",
    title: "Topics in scope",
    body: "Private cloud goals, current platform work, and the teams that need to stay involved.",
  },
  {
    n: 2,
    kicker: "Still open",
    title: "Questions for the next call",
    body: "Workload scope, technical owners, and the path to a focused working session.",
  },
  {
    n: 3,
    kicker: "Proposed next step",
    title: "Bring the right context back",
    body: "Return with the product and technical detail the customer asked to explore.",
  },
];

export const ACCOUNT_NOTE: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "AI infrastructure account note",
  account: "Target account",
  hypothesis: [
    {
      k: "Account context",
      body: "Public AI infrastructure work gives the rep a useful place to start.",
    },
    {
      k: "Reason to reach out",
      body: "A current company signal makes the message timely without guessing at a pain.",
    },
    {
      k: "Broadcom connection",
      body: "The note connects that public signal to Broadcom's AI infrastructure story.",
    },
  ],
  evidence: [
    {
      source: "Company site",
      finding: "Public product and infrastructure context collected for review.",
    },
    {
      source: "Company news",
      finding: "Recent public updates collected without adding an account claim.",
    },
    {
      source: "Open roles",
      finding: "Relevant public hiring language collected as context, not proof of pain.",
    },
  ],
  targets: [
    {
      name: "Account team",
      role: "Audience to confirm",
      why: "The rep chooses the right person after reviewing the research.",
    },
  ],
  page: {
    headline: "AI infrastructure account note",
    body: "A short view of the public signal, the Broadcom connection, and the questions worth taking into a first conversation.",
  },
};

export const JOBS: GtmJob[] = [
  {
    id: "account-brief",
    number: 1,
    title: "Build the account brief before the call",
    trigger: "A private cloud meeting lands",
    backgroundAction: "Researching the account and preparing the brief",
    problem:
      "A rep can lose the hour before a meeting to scattered notes, product pages, and old account context.",
    botJob:
      "Scout opens a computer, gathers the public context, sorts the open questions, and leaves a short brief for review.",
    storyboard: [
      {
        when: "Meeting added",
        label:
          "Scout opens a fresh computer and starts with public account context.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Target account",
          sources: ["Company site", "Product pages", "CRM notes"],
          signal: "Private cloud meeting",
        },
      },
      {
        when: "Research in progress",
        label:
          "The account story is sorted into context, open questions, and a call plan.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Context", answer: "Public facts" },
            { label: "Questions", answer: "Gaps stay open" },
            { label: "Plan", answer: "Focused call" },
          ],
        },
      },
      {
        when: "Before the meeting",
        label: "The brief is ready for the rep to review.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Account team",
          subject: "Private cloud call brief",
          status: "Ready to review",
        },
      },
      {
        when: "Artifact ready",
        label: "A one-page call brief is waiting on the desk.",
        scene: "deck",
        artifact: ACCOUNT_BRIEF,
      },
    ],
    unlock:
      "The rep starts the call with the public context, the open questions, and a clear plan in one place.",
    outcome: "A new meeting becomes a clear brief for the rep to review.",
    demo: {
      title: "Scout",
      subtitle: "Public research to a call brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "scout",
          name: "Scout",
          role: "bot",
          persona: "Builds the account brief before the rep joins the call",
          color: "oklch(0.46 0.16 24)",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scout",
          kind: "routine",
          body: "A private cloud meeting was added. I opened a computer and started with public account context. Drafts only.",
        },
        {
          id: "m2",
          from: "scout",
          kind: "text",
          body: "I have the company context and the Broadcom products already in view. I left unknowns as questions.",
        },
        {
          id: "m3",
          from: "scout",
          kind: "draft",
          draftLabel: "Research notes",
          artifact: {
            kind: "packet",
            title: "Target account research",
            fields: [
              {
                label: "Public context",
                value: "Company and product context collected for rep review.",
              },
              {
                label: "Broadcom connection",
                value:
                  "VMware Cloud Foundation is in the public private cloud story.",
              },
              {
                label: "Open questions",
                value:
                  "Workload scope, technical owner, and desired next step.",
              },
            ],
          },
        },
        {
          id: "m4",
          from: "scout",
          kind: "draft",
          draftLabel: "Call brief",
          artifact: ACCOUNT_BRIEF,
        },
        {
          id: "m5",
          from: "scout",
          kind: "system",
          body: "The brief is ready. Nothing was sent.",
        },
      ],
    },
  },
  {
    id: "call-follow-up",
    number: 2,
    title: "Turn technical discovery into the next step",
    trigger: "A customer call starts",
    backgroundAction: "Following the call and updating the next-step deck",
    problem:
      "The rep should stay in the conversation instead of rewriting notes and slides while the customer is still there.",
    botJob:
      "Room follows the meeting record, organizes the confirmed topics, and updates a draft deck for the rep.",
    storyboard: [
      {
        when: "Call begins",
        label: "Room follows the meeting record while the rep stays present.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Technical discovery",
          people: [
            { initials: "AE", name: "You" },
            { initials: "CT", name: "Customer team" },
          ],
        },
      },
      {
        when: "Topics take shape",
        label:
          "Confirmed topics and open questions move into the working deck.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Confirmed context",
          headline: "Private cloud working session",
          product: "Next questions in view",
          status: "Draft updated",
        },
      },
      {
        when: "Before the call ends",
        label: "The rep gets a clean next step to review with the customer.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Customer team",
          subject: "Working session recap",
          status: "Ready to review",
        },
      },
      {
        when: "Artifact ready",
        label: "The next-step deck is ready before the rep leaves the room.",
        scene: "deck",
        slides: NEXT_STEP_SLIDES,
      },
    ],
    unlock:
      "The rep stays with the customer and leaves with a useful draft instead of a page of loose notes.",
    outcome: "A live call becomes a clear next-step deck for review.",
    demo: {
      title: "Room",
      subtitle: "Meeting record to next-step deck",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "room",
          name: "Room",
          role: "bot",
          persona: "Keeps the working deck current while the rep stays present",
          color: "oklch(0.43 0.08 248)",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "room",
          kind: "routine",
          body: "The customer call started. I am following the meeting record and keeping the open deck ready. Drafts only.",
        },
        {
          id: "m2",
          from: "room",
          kind: "text",
          body: "The confirmed topics are clear. I am separating them from the questions that still need an answer.",
        },
        {
          id: "m3",
          from: "room",
          kind: "draft",
          draftLabel: "Next-step deck",
          artifact: {
            kind: "slides",
            title: "Working session recap",
            cards: NEXT_STEP_SLIDES,
          },
        },
        {
          id: "m4",
          from: "room",
          kind: "draft",
          draftLabel: "Follow-up note",
          artifact: {
            kind: "gmail",
            title: "Customer follow-up",
            to: "Customer team",
            subject: "Working session recap and open questions",
            body: "Thank you for the working session. I organized the topics we covered, kept the open questions visible, and drafted a focused next step for your review.",
          },
        },
        {
          id: "m5",
          from: "room",
          kind: "system",
          body: "The deck and follow-up are ready. Nothing was sent.",
        },
      ],
    },
  },
  {
    id: "account-signal",
    number: 3,
    title: "Open the right AI infrastructure conversation",
    trigger: "A target account enters the list",
    backgroundAction: "Researching public signals and drafting a first touch",
    problem:
      "A generic sequence gives the customer no reason to read. A useful first touch starts with public context and a real reason to talk.",
    botJob:
      "Signal opens a computer, gathers public company context, connects it to Broadcom's AI infrastructure story, and drafts the first touch.",
    storyboard: [
      {
        when: "Signal appears",
        label: "Signal opens the account and starts with the public record.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Target account",
          sources: ["Company site", "Company news", "Open roles"],
          signal: "AI infrastructure context",
        },
      },
      {
        when: "Research underway",
        label:
          "The note separates the public signal, the Broadcom connection, and the questions.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Signal", answer: "Public context" },
            { label: "Fit", answer: "Broadcom connection" },
            { label: "Ask", answer: "Useful question" },
          ],
        },
      },
      {
        when: "Drafts ready",
        label: "The rep can review the research before choosing an audience.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Account team",
          channels: ["Email", "LinkedIn", "Account note"],
          status: "Drafts ready, none sent",
        },
      },
      {
        when: "Artifact ready",
        label: "A short account note and first touch are ready for review.",
        scene: "send",
        artifact: ACCOUNT_NOTE,
      },
    ],
    unlock:
      "The rep starts from public context and a clear account note instead of a generic sequence.",
    outcome: "A new account signal becomes useful research and a draft first touch.",
    demo: {
      title: "Signal",
      subtitle: "Public context to a first touch",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "signal",
          name: "Signal",
          role: "bot",
          persona: "Builds account context before the rep chooses an audience",
          color: "oklch(0.48 0.12 58)",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "signal",
          kind: "routine",
          body: "A target account entered the list. I opened a computer and started with public company context. Drafts only.",
        },
        {
          id: "m2",
          from: "signal",
          kind: "text",
          body: "I found a useful AI infrastructure signal. I kept it separate from assumptions and marked the audience for the rep to confirm.",
        },
        {
          id: "m3",
          from: "signal",
          kind: "draft",
          draftLabel: "Account research",
          artifact: {
            kind: "packet",
            title: "Target account context",
            fields: [
              {
                label: "Public signal",
                value: "Current company context collected from public sources.",
              },
              {
                label: "Broadcom connection",
                value:
                  "A concise link to Broadcom's AI infrastructure story.",
              },
              {
                label: "Still to confirm",
                value: "The right audience, timing, and next question.",
              },
            ],
          },
        },
        {
          id: "m4",
          from: "signal",
          kind: "draft",
          draftLabel: "Account note",
          artifact: ACCOUNT_NOTE,
        },
        {
          id: "m5",
          from: "signal",
          kind: "system",
          body: "The account note is ready. Nothing was sent.",
        },
      ],
    },
  },
];

export function getJob(id: string): GtmJob | undefined {
  return JOBS.find((job) => job.id === id);
}
