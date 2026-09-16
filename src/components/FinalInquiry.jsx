import { footer } from "../data/site";
import { finalInquiry } from "../data/afterApproved";
import Reveal from "./Reveal";

export default function FinalInquiry() {
  return (
    <>
      <section className="final-cta" id="inquiry">
        <Reveal>
          <h2 className="final-cta__title">{finalInquiry.heading}</h2>
          <p className="final-cta__body">{finalInquiry.body}</p>
          <div className="final-cta__actions">
            <a className="btn btn--gold" href={finalInquiry.primary.href}>
              {finalInquiry.primary.label}
            </a>
            <a className="btn btn--ghost" href={finalInquiry.secondary.href}>
              {finalInquiry.secondary.label}
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="footer" id="contact">
        <div className="footer__top">
          <div>
            <p className="footer__brand">ICONIC GROUP</p>
            <p className="footer__blurb">{footer.blurb}</p>
          </div>
          <div className="footer__cols">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <p className="footer__heading">{column.title}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} title={link.pending ? "Page to follow" : undefined}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__base">
          <p>© {new Date().getFullYear()} ICONIC GROUP. All rights reserved.</p>
          <p>Contact details to be confirmed.</p>
        </div>
      </footer>
    </>
  );
}
