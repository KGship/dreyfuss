import type { Metadata } from "next";
import { SubmitForm } from "@/components/SubmitForm";

export const metadata: Metadata = {
  title: "Contact — The Dreyfuss Effect",
  description: "Tips, inquiries, and essay submissions for The Dreyfuss Effect.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="container">
        <div className="about-hero">
          <div className="kicker">Correspondence</div>
          <h1>
            Contact <em>the team.</em>
          </h1>
          <p className="standfirst">
            We answer all communications, eventually. The post is slow on purpose.
          </p>
        </div>
      </section>

      <section className="container">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="dateline" style={{ color: "var(--gold)", marginBottom: 8 }}>
              For
            </div>
            <h3>Tips &amp; Leads</h3>
            <p>
              An archive abandoned, a manuscript misplaced, a story sequestered. We invite
              individuals to offer what others have overlooked.
            </p>
            <span className="email">tips@dreyfuss.press</span>
          </div>
          <div className="contact-card">
            <div className="dateline" style={{ color: "var(--gold)", marginBottom: 8 }}>
              For
            </div>
            <h3>General Inquiries</h3>
            <p>Press, proposition, and partnership. We welcome queries and questions alike.</p>
            <span className="email">editors@dreyfuss.press</span>
          </div>
          <div className="contact-card">
            <div className="dateline" style={{ color: "var(--gold)", marginBottom: 8 }}>
              For
            </div>
            <h3>Submissions</h3>
            <p>Distinct, Deliberate, and Daring. See our criteria below.</p>
            <span className="email">pitches@dreyfuss.press</span>
          </div>
        </div>
      </section>

      {/* Submission section */}
      <section className="container-narrow" style={{ padding: "40px 0 64px" }}>
        <div
          className="dateline"
          style={{ color: "var(--crimson)", textAlign: "center", marginBottom: 8 }}
        >
          Submissions
        </div>
        <p
          style={{
            fontFamily: "var(--serif-display)",
            fontStyle: "italic",
            fontSize: 19,
            color: "var(--ink-soft)",
            textAlign: "center",
            lineHeight: 1.5,
            textWrap: "pretty",
            maxWidth: "52ch",
            margin: "0 auto",
          }}
        >
          An opinion, plainly stated and patiently developed. A subject studied, seasoned, and
          slept on. We accept pieces between two and six thousand words.
        </p>

        <SubmitForm />
      </section>
    </main>
  );
}
