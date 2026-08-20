export default function PageHero({ title }) {
  return (
    <section className="bg-terracotta px-4 py-10 sm:py-12 md:py-14">
      <h1 className="text-center text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-[3.25rem]">
        {title}
      </h1>
    </section>
  )
}
