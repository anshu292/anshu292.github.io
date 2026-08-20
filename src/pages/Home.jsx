import { Link } from 'react-router-dom'
import { routes } from '../data/nav'

const masters = [
  {
    alt: 'Lotus on still water',
    src: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&q=80',
  },
  {
    alt: 'Stone meditation figure',
    src: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80',
  },
  {
    alt: 'Spiritual teacher portrait',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    alt: 'Monk in meditation',
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  },
  {
    alt: 'Elder master portrait',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
]

export default function Home() {
  return (
    <div>
      <section className="dot-grid px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-10">
          <img
            src="/logo.webp"
            alt="Ozyma"
            className="h-40 w-40 shrink-0 rounded-full object-cover shadow-md sm:h-52 sm:w-52 md:h-56 md:w-56"
          />

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-end justify-center gap-2 sm:gap-3">
              {masters.map((master) => (
                <div
                  key={master.src}
                  className="h-20 w-14 overflow-hidden rounded-t-full border border-charcoal/10 bg-cream-soft shadow-sm sm:h-28 sm:w-20"
                >
                  <img
                    src={master.src}
                    alt={master.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <h1 className="text-5xl font-bold tracking-[0.08em] text-charcoal sm:text-6xl md:text-7xl">
              OZYMA
            </h1>
            <div className="my-3 h-0.5 w-28 bg-terracotta sm:w-36" />
            <p className="font-serif text-lg italic text-charcoal/80 sm:text-xl">
              A Spiritual Martial Art
            </p>
          </div>
        </div>
      </section>

      <section className="orange-fade px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="max-w-xl">
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-[#f6d9a8] sm:text-3xl">
              A New Concept for New Humans
            </h2>
            <p className="mb-6 text-[15px] leading-7 text-white sm:text-base sm:leading-8">
              This is a unique and holistic approach that nurtures the physical,
              mental, and spiritual dimensions of a child&apos;s personality
              through the science of Yoga. It is carefully designed to awaken
              awareness, build inner strength, and guide the next generation
              toward conscious living.
            </p>
            <Link
              to={routes.levels}
              className="inline-flex items-center gap-2 rounded-md border border-white bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-terracotta transition hover:bg-cream"
            >
              Begin Your Journey
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <figure className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&q=80"
              alt="Children in martial arts uniforms practicing meditation"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </section>
    </div>
  )
}
