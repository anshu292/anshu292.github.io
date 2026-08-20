import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { navLinks } from '../data/nav'
import SignInModal from './SignInModal'

function ChevronDown({ className = '' }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function isLinkActive(link, pathname) {
  if (link.path === '/') return pathname === '/'
  return pathname === link.path || pathname.startsWith(`${link.path}/`)
}

export default function Navbar() {
  const { user, loading, logout } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const photoURL = user?.photoURL

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
    setProfileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const linkClass = (active) =>
    `inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
      active
        ? 'bg-terracotta text-white'
        : 'text-charcoal hover:bg-cream-soft'
    }`

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/80 px-3 py-3 backdrop-blur-sm sm:px-4">
        <div
          ref={navRef}
          className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-nav-border bg-cream px-3 py-2 shadow-sm sm:px-4 lg:px-5"
        >
          <Link to="/" className="shrink-0" aria-label="Ozyma home">
            <img
              src="/logo.webp"
              alt="Ozyma"
              className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
            />
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center lg:flex"
            aria-label="Main"
          >
            <ul className="flex flex-wrap items-center justify-center gap-0.5">
              {navLinks.map((link) => {
                const active = isLinkActive(link, location.pathname)
                const hasDropdown = Boolean(link.dropdown?.length)

                return (
                  <li key={link.label} className="relative">
                    {hasDropdown ? (
                      <>
                        <button
                          type="button"
                          className={linkClass(active)}
                          aria-expanded={openDropdown === link.label}
                          onClick={() =>
                            setOpenDropdown((current) =>
                              current === link.label ? null : link.label,
                            )
                          }
                        >
                          {link.label}
                          <ChevronDown
                            className={
                              active ? 'text-white' : 'text-charcoal/70'
                            }
                          />
                        </button>
                        {openDropdown === link.label && (
                          <div className="absolute left-1/2 top-full z-30 mt-2 min-w-[11rem] -translate-x-1/2 rounded-2xl border border-nav-border bg-cream py-2 shadow-lg">
                            {link.dropdown.map((item) => (
                              <NavLink
                                key={item.path + item.label}
                                to={item.path}
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-sm transition-colors ${
                                    isActive
                                      ? 'bg-cream-soft font-medium text-terracotta'
                                      : 'text-charcoal hover:bg-cream-soft'
                                  }`
                                }
                                onClick={() => setOpenDropdown(null)}
                              >
                                {item.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={link.path}
                        end={link.path === '/'}
                        className={({ isActive }) => linkClass(isActive)}
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {loading ? (
              <div className="h-9 w-20 animate-pulse rounded-full bg-cream-soft" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream py-1 pl-1 pr-3 transition-colors hover:border-terracotta"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                >
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-sm font-semibold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden max-w-[8rem] truncate text-sm font-medium text-charcoal sm:inline">
                    {displayName}
                  </span>
                </button>

                {profileOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-10 cursor-default"
                      aria-label="Close profile menu"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div
                      role="menu"
                      className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-nav-border bg-cream py-2 shadow-lg"
                    >
                      <div className="border-b border-nav-border px-3 pb-2">
                        <p className="truncate text-sm font-medium text-charcoal">
                          {displayName}
                        </p>
                        {user.email && (
                          <p className="truncate text-xs text-charcoal/60">
                            {user.email}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        role="menuitem"
                        className="w-full px-3 py-2 text-left text-sm text-charcoal hover:bg-cream-soft"
                        onClick={async () => {
                          setProfileOpen(false)
                          await logout()
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSignInOpen(true)}
                className="rounded-full border border-charcoal/25 bg-cream px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-terracotta hover:text-terracotta sm:px-5"
              >
                Sign In
              </button>
            )}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 text-charcoal lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-nav-border bg-cream px-4 py-3 shadow-sm lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-full px-4 py-2.5 text-[15px] font-medium ${
                        isActive
                          ? 'bg-terracotta text-white'
                          : 'text-charcoal hover:bg-cream-soft'
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    {link.dropdown && <ChevronDown />}
                  </NavLink>
                  {link.dropdown?.map((item) => (
                    <NavLink
                      key={item.path + item.label}
                      to={item.path}
                      className={({ isActive }) =>
                        `ml-4 block rounded-full px-4 py-2 text-sm ${
                          isActive
                            ? 'font-medium text-terracotta'
                            : 'text-charcoal/80 hover:bg-cream-soft'
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  )
}
