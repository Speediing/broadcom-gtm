import type { StoryBeat } from "@/data/types";
import { ArtifactCard } from "./ArtifactCard";
import { HeardSlide } from "./HeardSlide";

export function ChapterPayoff({
  beat,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  const body = beat.slides?.length ? (
    <HeardSlide slides={beat.slides} size="lg" />
  ) : beat.artifact ? (
    <div className="chapter-artifact">
      <ArtifactCard artifact={beat.artifact} />
    </div>
  ) : null;

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
    </div>
  );
}
