import PageHero from '../components/PageHero'

const schools = [
  { name: 'Delhi Public School', place: 'Saharanpur', highlight: false },
  { name: 'Pinewood School', place: 'Saharanpur', highlight: false },
  { name: 'Sunbeam School', place: 'Varanasi', highlight: false },
  { name: 'Greenwood Hills School', place: 'Dehradun', highlight: true },
  { name: 'Rainbow School', place: 'Saharanpur', highlight: false },
  { name: 'Pragyan Sthali School', place: 'Saharanpur', highlight: false },
]

export default function InSchools() {
  return (
    <div>
      <PageHero title="In Schools" />

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          To date, Ozyma has brought its multi-disciplinary curriculum to more
          than 60 schools. We continue to expand our reach, currently providing
          specialized training programs in over 20 partner institutions, helping
          students master physical and mental well-being.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-xl border border-nav-border">
          {schools.map((school) => (
            <div
              key={school.name}
              className={`flex min-h-[120px] flex-col items-center justify-center px-4 py-8 text-center sm:min-h-[140px] ${
                school.highlight
                  ? 'bg-terracotta text-white'
                  : 'bg-cream-soft text-charcoal'
              }`}
            >
              <h2 className="font-serif text-xl font-semibold sm:text-2xl">
                {school.name}
              </h2>
              <p
                className={`mt-1 text-sm ${
                  school.highlight ? 'text-white/90' : 'text-charcoal/70'
                }`}
              >
                {school.place}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <figure className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80"
              alt="Students practicing yoga outdoors at school"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
          <figure className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80"
              alt="Group of school children in an outdoor class"
              className="aspect-[16/9] w-full object-cover"
            />
          </figure>
        </div>
      </section>
    </div>
  )
}
