const images = [
  {
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    alt: 'Person practicing pranayama breathing with hands near face',
  },
  {
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    alt: 'Seated meditation and breathwork practice',
  },
  {
    src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
    alt: 'Yoga practitioner in a calm indoor setting',
  },
  {
    src: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80',
    alt: 'Breathing exercise with focused hand mudra',
  },
  {
    src: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    alt: 'Group yoga and pranayama session',
  },
  {
    src: 'https://images.unsplash.com/photo-1552196563-55cd4ee45873?w=800&q=80',
    alt: 'Quiet seated breathing practice',
  },
]

export default function ImageGrid() {
  return (
    <section className="bg-cream px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
        {images.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-md">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
