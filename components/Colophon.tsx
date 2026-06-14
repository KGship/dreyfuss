import Link from "next/link";

// Footer / colophon — persistent on every view.
export function Colophon() {
  return (
    <footer className="colophon">
      <div className="container-wide">
        <div className="colophon-grid">
          <div>
            <div className="colophon-mast">The Dreyfuss Effect</div>
            <p className="colophon-tagline">
              An organization founded with conviction that, given time, thought becomes a
              kind of company.
            </p>
            <div className="socials">
              <a className="social" title="LinkedIn">in</a>
              <a className="social" title="Facebook">f</a>
              <a className="social" title="Instagram">◐</a>
              <a className="social" title="X (formerly Twitter)">×</a>
              <a className="social" title="RSS">≋</a>
            </div>
          </div>
          <div>
            <h5>Sections</h5>
            <ul>
              <li><Link href="/science">Science</Link></li>
              <li><Link href="/history">History</Link></li>
              <li><Link href="/commerce">Commerce</Link></li>
            </ul>
          </div>
          <div>
            <h5>Pages</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li>
                <Link href="/subscribe">
                  Subscription <em style={{ color: "var(--gold-soft)", opacity: 0.7 }}>· free</em>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Office</h5>
            <ul className="office">
              <li className="plain">4850 Tamiami Trail North</li>
              <li className="plain">Suite 301</li>
              <li className="plain">Naples, FL 34103</li>
              <li className="plain">editors@dreyfuss.press</li>
            </ul>
          </div>
          <div>
            <h5>Policies</h5>
            <ul>
              <li><Link href="/">Terms of Use</Link></li>
              <li><Link href="/">Disclaimer</Link></li>
              <li><Link href="/">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="colophon-fine">
          <span>© MMXXVI · The Dreyfuss Effect, LLC</span>
          <span>Set in IM Fell, Cormorant &amp; EB Garamond</span>
          <span>All rights gently reserved</span>
        </div>
      </div>
    </footer>
  );
}
