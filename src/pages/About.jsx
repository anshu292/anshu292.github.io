import PageHero from '../components/PageHero'

export default function About() {
  return (
    <div>
      <PageHero title="About Us" />
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          We are a team of committed professionals, including physical
          education teachers and yoga teachers with a strong spiritual
          understanding; whose shared purpose is to live consciously and
          contribute to making the Earth a more beautiful place to live.
        </p>
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          At Ozyma, energy exercises are spiritual practices through which we
          connect with the universe and unravel the mysteries of existence —
          never pursued hastily or for selfish reasons.
        </p>
      </section>
    </div>
  )
}
