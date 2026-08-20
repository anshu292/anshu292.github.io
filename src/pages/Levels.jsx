import PageHero from '../components/PageHero'

const belts = [
  {
    chakra: 'Entry Level',
    belt: 'WHITE BELT',
    level: 'BASIC LEVEL',
    color: '#f5f5f5',
    textColor: '#2f2f2f',
    border: true,
    text: 'The individual or child who is about to become a seeker (practitioner) will receive a white belt as an entry belt. For the trainers, this seeker is like a blank page; what they have learned from society, home, or family before coming here is not significant for the trainers. From this point onward, new chapters in their life will begin.',
  },
  {
    chakra: 'Muladhar Chakra',
    belt: 'RED BELT',
    level: '1ST LEVEL',
    color: '#c0392b',
    textColor: '#ffffff',
    text: 'This color is a symbol of energy, it will include practices for balancing the seeker\'s activity and energy. Since, from a yogic perspective, the color of the Muladhara (root) chakra is also red, the color of the first belt has been chosen based on this primary chakra. This belt will incorporate practices and experiments to activate the Muladhara chakra, such as making the seeker exert maximum effort, techniques to break emerging ego from time to time, working without attachment to results, and practicing righteous actions.',
  },
  {
    chakra: 'Svadhishthana Chakra',
    belt: 'ORANGE BELT',
    level: '2ND LEVEL',
    color: '#e67e22',
    textColor: '#ffffff',
    text: 'In this belt, the seeker will go through practices that enhance loving behavior, imagination, and concentration. These will include exercises to make all senses more sensitive and aware, along with practices to activate the Svadhishthana chakra. The seeker will also undergo training to remain fully present in the moment. In both of these initial belts, the trainers will maintain a strong hold, as this is where the foundation of the seeker will be established.',
  },
  {
    chakra: 'Manipur Chakra',
    belt: 'YELLOW BELT',
    level: '3RD LEVEL',
    color: '#f1c40f',
    textColor: '#2f2f2f',
    text: 'All the teachings in this belt will focus on developing confidence, willpower, and personal power in the seeker. Practices activate the Manipura chakra, building discipline, courage, and the ability to act from centered awareness rather than impulse or fear.',
  },
  {
    chakra: 'Anahat (Heart) Chakra',
    belt: 'GREEN BELT',
    level: '4TH LEVEL',
    color: '#27ae60',
    textColor: '#ffffff',
    text: 'All the teachings in this belt will focus on developing hope, enthusiasm, and creative abilities in the seeker. The seeker will learn to protect themselves from all forms of negative energy while enthusiastically creating something positive. This belt will also include practices that test patience, ensuring that the seeker maintains harmonious and righteous relationships in every situation.',
  },
  {
    chakra: 'Vishuddhi Chakra',
    belt: 'SKY BELT',
    level: '5TH LEVEL',
    color: '#5dade2',
    textColor: '#1a3a4a',
    text: 'In this belt, the seeker must cultivate inner vision while following the path of truth, moving beyond theoretical knowledge toward pure, experiential wisdom. They will learn to use balanced speech while progressing toward silence. By the time the seeker reaches this stage, they will understand that without transforming themselves, they cannot bring change to others. Now, the seeker must take responsibility for working on their own self-transformation.',
  },
  {
    chakra: 'Aagya Chakra',
    belt: 'BLUE BELT',
    level: '6TH LEVEL',
    color: '#2980b9',
    textColor: '#ffffff',
    text: 'In this belt, the seeker must engage in practices to understand their own nature. With firm resolve, they must awaken awareness and turn their entire focus inward. The true meaning of spirituality must be realized, and faith in one\'s own inner strength must be cultivated. This stage will involve prolonged meditation practices, guiding the seeker toward deeper self-awareness and inner transformation.',
  },
  {
    chakra: 'Sahastrar (Crown) Chakra',
    belt: 'PURPLE BELT',
    level: '7TH LEVEL',
    color: '#8e44ad',
    textColor: '#ffffff',
    text: 'In this belt, the seeker must cultivate unconditional love for all of existence. Their practices will no longer be limited to humans alone but will extend to all living beings, including birds, animals, and plants. At this stage, the seeker\'s primary goal will be love and peace, embracing the entire universe with compassion and harmony.',
  },
  {
    chakra: 'Complete Emptiness',
    belt: 'BLACK BELT',
    level: 'FINAL LEVEL',
    color: '#1a1a1a',
    textColor: '#ffffff',
    text: 'The black belt represents completion and emptiness — a state where practice becomes effortless presence. The seeker lives from stillness, serving life with clarity, humility, and an open heart. What began as training ripens into a way of being.',
  },
]

export default function Levels() {
  return (
    <div>
      <PageHero title="OZYMA LEVELS" />

      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          Ozyma has categorized all its levels in the form of belts. For
          example, a red belt for the Muladhara chakra because the color of
          Muladhara is red. Similarly, the belts are chosen according to the
          sequence and colors of the chakras, so that the practitioner can have
          a foundation and guidance.
        </p>
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          Ozyma&apos;s level system emphasizes the spiritual aspect — in this
          world, the number seven has been significant in many journeys, such as
          the seven heavens, seven worlds, seven colors, seven chakras, seven
          bodies, and seven notes. Similarly, in Ozyma, there are different
          practices based on the seven chakras to activate them.
        </p>
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          Through these practices, the holistic development of the body, mind,
          and consciousness of the individual has been prepared for all three
          levels. We believe that the next generation prepared by Ozyma through
          this process will understand the science of the body and consciousness
          well and will also understand that spirituality and science are not
          separate but rather manifest differently.
        </p>
        <p className="text-[15px] leading-7 text-charcoal sm:text-base sm:leading-8">
          This entire process has woven the practices of Osho, Lao Tzu,
          Patanjali, Buddha, Bodhidharma, and the foundational practices of yoga
          into such sutras that it will function as a guide for the journey of
          individuals at every level and age.
        </p>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-4 pb-16 sm:px-6 lg:px-8">
        {belts.map((belt) => (
          <article
            key={belt.belt}
            className="overflow-hidden rounded-2xl border border-nav-border bg-white/40"
          >
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              style={{
                backgroundColor: belt.color,
                color: belt.textColor,
                border: belt.border ? '1px solid #ddd' : undefined,
              }}
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide opacity-90">
                  {belt.chakra}
                </p>
                <h2 className="text-xl font-bold tracking-wide sm:text-2xl">
                  {belt.belt}
                </h2>
              </div>
              <span className="rounded-full border border-current/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {belt.level}
              </span>
            </div>
            <p className="px-5 py-5 text-[15px] leading-7 text-charcoal/85 sm:leading-8">
              {belt.text}
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}
