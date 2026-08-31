import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="heard-bar">
          <span>Working session recap</span>
          <span>Draft</span>
        </header>
        <div className="heard-main">
          <ol>
            {slides.map((slide) => (
              <li key={slide.n}>
                <p className="heard-tag">{slide.kicker || "Next step"}</p>
                <h3>{slide.title}</h3>
                <p className="heard-quote">{slide.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
}
