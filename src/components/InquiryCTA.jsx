import { footer, inquiry } from "../data/site";
import Reveal from "./Reveal";

export default function InquiryCTA() {
  return (
    <>
      <section className="inquiry" id="inquiry">
        <Reveal>
          <h2 className="inquiry__title">{inquiry.heading}</h2>
          <p className="inquiry__body">{inquiry.body}</p>
          <div className="inquiry__actions">
            <a className="btn btn--gold" href={inquiry.primary.href}>
              {inquiry.primary.label}
            </a>
            <a
              className="btn btn--ghost"
              href={inquiry.secondary.href}
              title={inquiry.secondary.pending ? "WhatsApp number to follow" : undefined}
            >
              {inquiry.secondary.label}
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
