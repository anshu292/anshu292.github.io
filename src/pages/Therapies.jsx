import { useEffect, useState } from 'react'

const therapies = [
  {
    id: 'fire-bath',
    label: 'Aura and Chakra Cleansing with Fire (Fire Bath)',
    title: 'Aura and Chakra Cleansing with Fire (Fire Bath)',
    icon: 'flame',
    text: 'Fire Bath is a purifying practice that uses the transformative quality of fire to cleanse the aura and balance the chakras. It helps release stagnant energy, clear emotional residue, and restore a lighter, more luminous field around the body.',
  },
  {
    id: 'pranic-healing',
    label: 'Pranic Healing',
    title: 'Pranic Healing',
    icon: 'energy',
    text: 'Pranic Healing is a highly developed and tested system of energy treatment that uses Prana (vital life force) to accelerate the body\'s natural healing process. Without touching the physical body, the practitioner cleanses and energizes the energy body so physical, emotional, and mental imbalances can begin to resolve.',
  },
  {
    id: 'ohm',
    label: "OHM - Ozyma's Healing Meditation",
    title: "OHM - Ozyma's Healing Meditation",
    icon: 'sun',
    text: "OHM — Ozyma's Healing Meditation — is a guided meditative process that settles the nervous system and invites deep restoration. Through breath, awareness, and subtle energy work, seekers experience calm, clarity, and a renewed sense of inner balance.",
  },
  {
    id: 'vohm',
    label: 'VOHM - Vital Organs Healing Meditation',
    title: 'VOHM - Vital Organs Healing Meditation',
    icon: 'target',
    text: 'VOHM focuses awareness on the vital organs, supporting their natural rhythm through breath and visualization. This practice helps the seeker develop sensitivity to the body\'s inner landscape while encouraging gentle energetic nourishment of key systems.',
  },
  {
    id: 'pancha-tatva',
    label: 'Pancha Tatva Balance',
    title: 'Pancha Tatva Balance',
    icon: 'flower',
    text: 'Pancha Tatva Balance works with the five elements — earth, water, fire, air, and ether — to restore harmony in body and mind. Through elemental practices, the seeker learns to recognize imbalance and return to a grounded, flowing, and spacious state.',
  },
  {
    id: 'panchakarma',
    label: 'Panchakarma (Ayurvedic)',
    title: 'Panchakarma (Ayurvedic)',
    icon: 'leaf',
    text: 'Panchakarma is a classical Ayurvedic purification process that supports detoxification and rejuvenation. At Ozyma it is approached with care and spiritual understanding, helping the body release what no longer serves and renew vital energy.',
  },
  {
    id: 'mud-therapy',
    label: 'Mud Therapy',
    title: 'Mud Therapy',
    icon: 'earth',
    text: 'Mud Therapy reconnects the body with the grounding quality of earth. Applied with intention, it cools, soothes, and absorbs excess heat or agitation, supporting physical comfort and a deeper sense of rooted calm.',
  },
]

function TherapyIcon({ type }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    className: 'text-terracotta',
    'aria-hidden': true,
  }

  switch (type) {
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )
    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'flower':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
          <path d="M12 3c2 3 2 5 0 7-2-2-2-4 0-7zm0 11c2 2 2 4 0 7-2-3-2-5 0-7zM3 12c3-2 5-2 7 0-2 2-4 2-7 0zm11 0c2-2 4-2 7 0-3 2-5 2-7 0z" />
        </svg>
      )
    case 'flame':
      return (
        <svg {...common}>
          <path d="M12 3c2 3 5 5 5 9a5 5 0 1 1-10 0c0-2 1.5-4 3-6 0 2 1 3 2 3z" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z" />
          <path d="M5 19c4-4 8-8 12-10" />
        </svg>
      )
    case 'earth':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
  }
}

export default function Therapies() {
  const [activeId, setActiveId] = useState(therapies[1].id)

  useEffect(() => {
    const onScroll = () => {
      let current = therapies[0].id
      for (const therapy of therapies) {
        const el = document.getElementById(therapy.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 160) current = therapy.id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-cream">
      <div className="sticky top-[4.5rem] z-40 border-b border-nav-border bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {therapies.map((therapy) => {
            const active = therapy.id === activeId
            return (
              <button
                key={therapy.id}
                type="button"
                onClick={() => scrollTo(therapy.id)}
                className={`shrink-0 rounded-md border px-3 py-2 text-left text-xs font-medium transition sm:text-sm ${
                  active
                    ? 'border-terracotta bg-terracotta text-white'
                    : 'border-terracotta/40 bg-transparent text-terracotta hover:bg-cream-soft'
                }`}
              >
                {therapy.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-14 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {therapies.map((therapy, index) => (
          <section
            key={therapy.id}
            id={therapy.id}
            className="scroll-mt-40"
          >
            {index === 0 ? null : (
              <div className="mb-3 flex items-center gap-3">
                <TherapyIcon type={therapy.icon} />
                <h2 className="text-xl font-semibold text-charcoal sm:text-2xl">
                  {therapy.title}
                </h2>
              </div>
            )}
            {index === 0 && (
              <h2 className="mb-3 text-xl font-semibold text-charcoal sm:text-2xl">
                {therapy.title}
              </h2>
            )}
            <p className="text-[15px] leading-7 text-charcoal/85 sm:text-base sm:leading-8">
              {therapy.text}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
