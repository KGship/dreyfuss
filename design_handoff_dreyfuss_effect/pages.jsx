// ============================================================
// PAGES — About, Contact, Subscribe
// ============================================================

function About({ go }) {
  return (
    <main>
      <section className="container">
        <div className="about-hero">
          <div className="kicker">On the Publication</div>
          <h1 style={{ fontFamily: "var(--serif-mast)", fontSize: "clamp(56px, 8vw, 104px)", margin: "14px 0 14px", lineHeight: 0.96 }}>
            About <em style={{ color: "var(--crimson)", fontFamily: "var(--serif-display)" }}>The Dreyfuss Effect</em>
          </h1>
          <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 24, lineHeight: 1.45, color: "var(--ink-soft)", maxWidth: "44ch", margin: "0 auto", textWrap: "pretty" }}>
            A quiet press for the long present. Essays for readers who would rather not finish in a hurry.
          </p>
          <div style={{ marginTop: 32 }}>
            <Dingbat glyph="❦" />
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "8px 0 8px" }}>
        <div className="about-cols">
          {/* Left — The Purpose */}
          <div className="about-col-main">
            <h3 className="about-col-head">The Purpose</h3>
            <hr className="rule" style={{ background: "var(--crimson)", margin: "0 0 22px" }} />
            <p>
              The Dreyfuss Effect was founded with the conviction that the fundamental questions of our time deserve more than a passing glance. In an age where information travels faster than understanding, our endeavour seeks to inspire careful consideration. We concern ourselves with science, history, and commerce, not because they encompass everything, but because they provide inspiration for impassioned and intellectual dissent. The Dreyfuss Effect is not intended for those who seek easy answers and comfortable conclusions, but for those who indulge in restlessness and rigor.
            </p>
          </div>

          {/* Right — stacked Publication + Podcast */}
          <div className="about-col-side">
            <div className="about-card">
              <div className="about-card-tag">Now Publishing</div>
              <h4 className="about-col-head">The Publication</h4>
              <hr className="rule" style={{ background: "var(--crimson)", margin: "0 0 16px" }} />
              <p>
                Our essays offer a blend of personal experience and informed analysis for those who may be short on time but refuse to be short on substance. Each piece contributes one voice to a busy conversation and one perspective to a busy world. We publish on Sunday mornings.
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-tag" style={{ color: "var(--gold)" }}>Coming Soon</div>
              <h4 className="about-col-head">The Podcast</h4>
              <hr className="rule" style={{ background: "var(--crimson)", margin: "0 0 16px" }} />
              <p>
                The Dreyfuss Effect Aloud brings science, history, and commerce to the table. It is an exercise in the collective inquiry, reasoning, and reconciliation of truth. Production begins this coming spring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow" style={{ padding: "56px 0 64px", textAlign: "center" }}>
        <Dingbat glyph="❦" />
        <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 22, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 24, textWrap: "pretty" }}>
          A name is not merely a title, but a declaration of intent. We chose the Dreyfuss Effect because it exemplifies our mission. A practical exchange of information, a deeper school of thought, a silent ripple.
        </p>
        <div className="dateline" style={{ color: "var(--crimson)", marginTop: 22 }}>The Editors</div>
      </section>
    </main>
  );
}

// ============================================================
function Contact({ go, toast }) {
  const [tab, setTab] = React.useState("submit");
  return (
    <main>
      <section className="container">
        <div className="about-hero">
          <div className="kicker">Correspondence</div>
          <h1 style={{ fontFamily: "var(--serif-mast)", fontSize: "clamp(56px, 8vw, 104px)", margin: "14px 0 14px", lineHeight: 0.96 }}>
            Contact <em style={{ color: "var(--crimson)", fontFamily: "var(--serif-display)" }}>the team.</em>
          </h1>
          <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 22, color: "var(--ink-soft)", maxWidth: "44ch", margin: "0 auto", textWrap: "pretty" }}>
            We answer all communications, eventually. The post is slow on purpose.
          </p>
        </div>
      </section>

      <section className="container">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="dateline" style={{ color: "var(--gold)", marginBottom: 8 }}>For</div>
            <h3>Tips &amp; Leads</h3>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.55 }}>
              An archive abandoned, a manuscript misplaced, a story sequestered. We invite individuals to offer what others have overlooked.
            </p>
            <span className="email">tips@dreyfuss.press</span>
          </div>
          <div className="contact-card">
            <div className="dateline" style={{ color: "var(--gold)", marginBottom: 8 }}>For</div>
            <h3>General Inquiries</h3>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.55 }}>
              Press, proposition, and partnership. We welcome queries and questions alike.
            </p>
            <span className="email">editors@dreyfuss.press</span>
          </div>
          <div className="contact-card">
            <div className="dateline" style={{ color: "var(--gold)", marginBottom: 8 }}>For</div>
            <h3>Submissions</h3>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.55 }}>
              Distinct, Deliberate, and Daring. See our criteria below.
            </p>
            <span className="email">pitches@dreyfuss.press</span>
          </div>
        </div>
      </section>

      {/* Submission section */}
      <section className="container-narrow" style={{ padding: "40px 0 64px" }}>
        <div className="dateline" style={{ color: "var(--crimson)", textAlign: "center", marginBottom: 8 }}>Submissions</div>
        <h2 style={{ fontFamily: "var(--serif-mast)", fontSize: 56, textAlign: "center", margin: "0 0 14px", lineHeight: 1 }}>
          Submit an <em style={{ color: "var(--crimson)", fontFamily: "var(--serif-display)" }}>Essay</em>
        </h2>
        <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 19, color: "var(--ink-soft)", textAlign: "center", lineHeight: 1.5, textWrap: "pretty" }}>
          An opinion, plainly stated and patiently developed. A subject studied, seasoned, and slept on. We accept pieces between two and six thousand words.
        </p>

        {/* What we want */}
        <div style={{
          marginTop: 36,
          background: "var(--cream)",
          border: "1px solid var(--ink)",
          padding: 28,
          position: "relative"
        }}>
          <div style={{ position: "absolute", inset: 5, border: "1px solid var(--gold)", pointerEvents: "none" }}></div>
          <h4 style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", color: "var(--crimson)", fontSize: 24, margin: "0 0 12px" }}>
            What we are looking for
          </h4>
          <ul style={{ paddingLeft: 24, margin: 0, fontSize: 18, lineHeight: 1.55, color: "var(--ink)" }}>
            <li style={{ marginBottom: 8 }}>An argument, plainly stated and patiently developed.</li>
            <li style={{ marginBottom: 8 }}>A subject the author has lived with — read into, thought about, slept on.</li>
            <li style={{ marginBottom: 8 }}>Prose that does not hide behind jargon, irony, or the present tense of urgency.</li>
            <li>Between 2,000 and 8,000 words. Longer if it earns it.</li>
          </ul>
        </div>

        {/* Quick pitch form */}
        <form className="submit-form" style={{ padding: 0, marginTop: 40 }} onSubmit={(e) => {
          e.preventDefault();
          toast("Pitch received. We will reply within fourteen days.");
          e.target.reset();
        }}>
          <h3 style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 28, color: "var(--crimson)", margin: "0 0 18px" }}>
            Pitch us here
          </h3>
          <div className="field">
            <label>Your name</label>
            <input type="text" placeholder="Cordelia Marwood" required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@correspondence.address" required />
          </div>
          <div className="field">
            <label>Section</label>
            <select defaultValue="">
              <option value="" disabled>Please select</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="commerce">Commerce</option>
              <option value="other">I am not yet sure</option>
            </select>
          </div>
          <div className="field">
            <label>Working title</label>
            <input type="text" placeholder="On the Lyric Life of —" />
          </div>
          <div className="field">
            <label>The pitch — two paragraphs</label>
            <textarea placeholder="Tell us what the essay would argue, and why you are the person to write it…" />
          </div>
          <button type="submit" className="btn-primary">Send the Pitch  →</button>
        </form>
      </section>
    </main>
  );
}

// ============================================================
function Subscribe({ go }) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  return (
    <main>
      <section className="subscribe-hero">
        <div className="dateline" style={{ color: "var(--gold-bright)", marginBottom: 12 }}>The Weekly Letter</div>
        <h2>
          One essay. <span className="gold">Sunday morning.</span><br/>Always free.
        </h2>
        <p>
          A single piece of long-form writing, delivered at dawn.
        </p>

        {!sent ? (
          <form className="subscribe-form" onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}>
            <input
              type="email"
              required
              placeholder="reader@correspondence.address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
        ) : (
          <div style={{ maxWidth: 560, margin: "0 auto", border: "1px solid var(--gold)", padding: 32, background: "rgba(244,236,216,0.06)" }}>
            <div style={{ fontFamily: "var(--serif-mast)", fontSize: 44, color: "var(--gold-bright)" }}>❦</div>
            <p style={{ fontFamily: "var(--serif-display)", fontSize: 24, fontStyle: "italic", color: "var(--cream)", margin: "8px 0" }}>
              Welcome to the readership.
            </p>
            <div className="dateline" style={{ color: "var(--gold-bright)", opacity: 0.85 }}>
              A confirmation has been dispatched to {email}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, fontFamily: "var(--sans-meta)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gold-soft)", opacity: 0.8 }}>
          17,400 readers in 64 countries · Unsubscribe in two clicks
        </div>
      </section>

      {/* What you'll get */}
      <section className="container" style={{ padding: "72px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="kicker">What lands on Sunday</div>
          <h3 style={{ fontFamily: "var(--serif-mast)", fontSize: 48, margin: "12px 0 12px", lineHeight: 1 }}>
            The editor's <em style={{ color: "var(--crimson)", fontFamily: "var(--serif-display)" }}>choice</em>
          </h3>
          <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 20, color: "var(--ink-soft)", maxWidth: "52ch", margin: "0 auto", textWrap: "pretty" }}>
            One click to subscribe. Free in perpetuity.
          </p>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { About, Contact, Subscribe });
