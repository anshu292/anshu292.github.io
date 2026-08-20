import PageHero from '../components/PageHero'

const members = [
  {
    name: 'Lead Yoga Faculty',
    role: 'Asana & Pranayama',
    text: 'Guides physical practice with a deep respect for breath and alignment.',
  },
  {
    name: 'Therapy Mentors',
    role: 'Healing & Balance',
    text: 'Support students through restorative and energy-balancing therapies.',
  },
  {
    name: 'Spiritual Advisors',
    role: 'Philosophy & Awareness',
    text: 'Help the community live consciously and practice with humility.',
  },
]

export default function Team() {
  return (
    <div>
      <PageHero title="Team" />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="mb-8 text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          We are physical education teachers and yoga teachers united by a
          shared purpose: to live consciously and help make the Earth a more
          beautiful place.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {members.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-nav-border p-5"
            >
              <h2 className="font-semibold text-charcoal">{member.name}</h2>
              <p className="mb-2 text-sm text-terracotta">{member.role}</p>
              <p className="text-sm leading-6 text-charcoal/75">{member.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
