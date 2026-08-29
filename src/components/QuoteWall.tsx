import { PUBLIC_QUOTES } from "@/data/quotes";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function QuoteWall() {
  return (
    <section id="testimonials" className="quotes">
      <h2>What people say about Grok Bot</h2>
      <p className="section-lede">
        Public excerpts from people who have used the product.
      </p>
      <div className="quote-thread">
        {PUBLIC_QUOTES.map((quote) => (
          <article key={quote.source} className="quote-row">
            <div className="quote-who">
              <span className="quote-avatar quote-initials" aria-hidden>
                {initials(quote.name)}
              </span>
              <div>
                <p className="quote-name">{quote.name}</p>
                <p className="quote-handle">{quote.handle}</p>
              </div>
            </div>
            <blockquote className="quote-bubble">{quote.quote}</blockquote>
            <a
              href={quote.source}
              target="_blank"
              rel="noopener noreferrer"
              className="quote-source"
            >
              Read source
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
