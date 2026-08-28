import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/broadcom-watercolor.jpg"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report report-pinned">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">A fleet of agents for Broadcom sellers</p>
              <h1>The work keeps moving after the meeting ends.</h1>
              <p className="hero-intro">
                Grok Bot gives each rep a fleet of agents with their own
                computers. They research accounts, prepare the next call, and
                draft follow-up while the rep stays with the customer.
              </p>
            </div>
          </section>

          <section className="usecase-framing">
            <p className="eyebrow">Three scenes from the field</p>
            <h2>
              The trigger starts the work. The rep comes back to a finished
              artifact.
            </h2>
            <p>
              Each scene shows what the agent sees, what it does on its
              computer, and what it leaves for review.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a key={job.id} className="metric-card" href={`#${job.id}`}>
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">
                  Starts when {job.trigger.toLowerCase()}
                </p>
              </a>
            ))}
          </div>
        </div>

        <RosterChart />

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/broadcom-watercolor.jpg" alt="" />
      </div>

      <div className="report">
        <CompareTable />
      </div>

      <footer className="site-footer">
        <address className="footer-contact">
          <strong>Biz Eshetu</strong>
          <a href="mailto:biz.eshetu@cursor.com">biz.eshetu@cursor.com</a>
        </address>
      </footer>
    </main>
  );
}
