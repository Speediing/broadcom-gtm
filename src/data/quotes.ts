export type PublicQuote = {
  name: string;
  handle: string;
  quote: string;
  source: string;
};

export const PUBLIC_QUOTES = [
  {
    name: "Naval",
    handle: "@naval",
    quote:
      "Grok Bot is just cool. 😎 Of course an agent should be persistent. Of course it should have its own computer.",
    source: "https://x.com/naval/status/2090497355649008059",
  },
  {
    name: "Martin Casado",
    handle: "@martin_casado",
    quote:
      "This is the first product I've used that really nails the virtual co-worker. I suspect we'll view this launch as a pivotal moment in getting the abstraction for AI in the workplace right. Incredible execution by the team.",
    source: "https://x.com/martin_casado/status/2087273088002216104",
  },
  {
    name: "Claire Vo",
    handle: "@clairevo",
    quote: "the one @bot feature i can't live without",
    source: "https://x.com/clairevo/status/2090150050794225964",
  },
] as const satisfies readonly PublicQuote[];
