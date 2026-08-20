import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { routes } from '../data/nav'

export default function Classes() {
  return (
    <div>
      <PageHero title="Classes" />
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          Join live and guided classes designed for every stage of practice —
          from first breathwork sessions to advanced energy exercises.
        </p>
        <ul className="space-y-3 text-sm leading-7 text-charcoal/85">
          <li className="rounded-2xl border border-nav-border px-5 py-4">
            <strong className="text-charcoal">Group Classes</strong> — shared
            practice sessions focused on breath, movement, and stillness.
          </li>
          <li className="rounded-2xl border border-nav-border px-5 py-4">
            <strong className="text-charcoal">Private Sessions</strong> —
            one-on-one guidance tailored to your body and goals.
          </li>
          <li className="rounded-2xl border border-nav-border px-5 py-4">
            <Link
              to={routes.inSchools}
              className="font-semibold text-terracotta hover:underline"
            >
              In Schools
            </Link>{' '}
            — Ozyma curriculum delivered across partner schools for student
            well-being.
          </li>
          <li className="rounded-2xl border border-nav-border px-5 py-4">
            <strong className="text-charcoal">Workshops</strong> — deeper
            immersions into pranayama, therapy, and conscious living.
          </li>
        </ul>
        <p className="text-sm text-charcoal/75">
          Interested in becoming a teacher? Visit{' '}
          <Link
            to={routes.ttc}
            className="font-medium text-terracotta hover:underline"
          >
            Teachers Training Course
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
