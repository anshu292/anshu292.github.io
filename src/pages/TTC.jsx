import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { routes } from '../data/nav'

export default function TTC() {
  return (
    <div>
      <PageHero title="Teachers Training Course" />
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          The Ozyma Teachers Training Course prepares committed practitioners to
          guide others with clarity, humility, and spiritual understanding.
        </p>
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          Training covers asana, pranayama, philosophy, teaching methodology,
          and the ethics of sharing energy practices with care — never hastily
          or for selfish reasons.
        </p>
        <Link
          to={routes.contact}
          className="inline-flex rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
        >
          Enquire about TTC
        </Link>
      </section>
    </div>
  )
}
