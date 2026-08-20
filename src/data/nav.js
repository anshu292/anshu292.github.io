export const routes = {
  home: '/',
  tools: '/tools',
  pranayama: '/tools/pranayama',
  therapies: '/therapies',
  levels: '/levels',
  classes: '/classes',
  inSchools: '/classes/in-schools',
  ttc: '/ttc',
  contact: '/contact',
  team: '/team',
  about: '/about',
}

export const navLinks = [
  { label: 'Home', path: routes.home },
  {
    label: 'Tools',
    path: routes.tools,
    dropdown: [
      { label: 'All Tools', path: routes.tools },
      { label: 'Pranayama', path: routes.pranayama },
    ],
  },
  { label: 'Therapies', path: routes.therapies },
  { label: 'Levels', path: routes.levels },
  {
    label: 'Classes',
    path: routes.classes,
    dropdown: [
      { label: 'All Classes', path: routes.classes },
      { label: 'In Schools', path: routes.inSchools },
      { label: 'Teachers Training', path: routes.ttc },
    ],
  },
  { label: 'TTC', path: routes.ttc },
  { label: 'Contact Us', path: routes.contact },
  { label: 'Team', path: routes.team },
]

export const footerLinks = [
  { label: 'Home', path: routes.home },
  { label: 'About us', path: routes.about },
  { label: 'Tools', path: routes.tools },
  { label: 'Therapies', path: routes.therapies },
  { label: 'Teachers Training Course', path: routes.ttc },
  { label: 'Contact us', path: routes.contact },
]
