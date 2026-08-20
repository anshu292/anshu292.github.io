import { NavLink } from 'react-router-dom'
import { footerLinks } from '../data/nav'

function SocialIcon({ children, label, href = '#' }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-nav-border bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-charcoal">
            Useful Links
          </h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.path + link.label}>
                <NavLink
                  to={link.path}
                  className="text-sm text-charcoal/80 transition-colors hover:text-terracotta"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-charcoal">About us</h3>
          <p className="text-sm leading-7 text-charcoal/80">
            We are a team of committed professionals, including physical
            education teachers and yoga teachers with a strong spiritual
            understanding; whose shared purpose is to live consciously and
            contribute to making the Earth a more beautiful place to live.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-charcoal">
            Connect with us
          </h3>
          <p className="mb-3 text-sm font-medium text-charcoal">Contact us</p>
          <ul className="mb-5 space-y-2 text-sm text-charcoal/80">
            <li>
              <a
                href="mailto:ozyma14@gmail.com"
                className="inline-flex items-center gap-2 hover:text-terracotta"
              >
                <span aria-hidden="true">✉</span>
                ozyma14@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+917906830456"
                className="inline-flex items-center gap-2 hover:text-terracotta"
              >
                <span aria-hidden="true">☎</span>
                +91 7906830456
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <SocialIcon label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.2 3H21l-6.6 7.5L22 21h-6.2l-4.4-5.7L6 21H3.2l7-8L2 3h6.3l4 5.2L18.2 3zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 8.5A2 2 0 1 1 6.5 4.5a2 2 0 0 1 0 4zM4.8 20V9.7h3.4V20H4.8zM10.2 20V9.7h3.3v1.4h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.3V20h-3.4v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V20h-4.1z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Website">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>

      <div className="border-t border-nav-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-charcoal/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright @ Ozyma</p>
          <p>Powered by Ozyma</p>
        </div>
      </div>
    </footer>
  )
}
