import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { routes } from '../data/nav'

const tools = [
  {
    title: 'Pranayama',
    path: routes.pranayama,
    text: 'Breathing techniques to expand life force energy, open nadis, and calm the mind.',
  },
  {
    title: 'Asana Practice',
    path: routes.classes,
    text: 'Physical postures that build strength, flexibility, and embodied awareness.',
  },
  {
    title: 'Meditation',
    path: routes.levels,
    text: 'Stillness practices that deepen focus and reveal inner clarity.',
  },
]

export default function Tools() {
  return (
    <div>
      <PageHero title="Tools" />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="mb-8 text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          Ozyma tools are practical spiritual methods — breath, movement, and
          awareness — that help you connect with the universe and live with
          greater consciousness.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              to={tool.path}
              className="rounded-2xl border border-nav-border bg-white/50 p-5 transition-colors hover:border-terracotta"
            >
              <h2 className="mb-2 font-semibold text-charcoal">{tool.title}</h2>
              <p className="text-sm leading-6 text-charcoal/75">{tool.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
