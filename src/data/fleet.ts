import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
};

export const FLEET: FleetBot[] = [
  {
    id: "scout",
    name: "Scout",
    blurb: "Opens a computer, reads public account context, and builds the brief.",
    color: "oklch(0.46 0.16 24)",
    jobId: "account-brief",
  },
  {
    id: "room",
    name: "Room",
    blurb: "Follows the call and keeps the next-step deck current.",
    color: "oklch(0.43 0.08 248)",
    jobId: "call-follow-up",
  },
  {
    id: "signal",
    name: "Signal",
    blurb: "Researches new account signals and prepares a useful first touch.",
    color: "oklch(0.48 0.12 58)",
    jobId: "account-signal",
  },
  {
    id: "paper",
    name: "Paper",
    blurb: "Drafts customer-facing work and keeps it parked for review.",
    color: "oklch(0.39 0.07 154)",
  },
  {
    id: "follow-up",
    name: "Follow-up",
    blurb: "Turns the meeting record into a clean recap and next step.",
    color: "oklch(0.42 0.12 316)",
  },
  {
    id: "chief",
    name: "Chief",
    blurb: "Routes work between the fleet and brings the finished pieces back.",
    color: "oklch(0.27 0.03 45)",
  },
];
