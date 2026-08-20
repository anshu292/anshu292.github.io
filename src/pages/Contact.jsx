import { useEffect, useState } from 'react'
import { apiUrl } from '../lib/api'

const initialForm = {
  name: '',
  phone: '+91',
  email: '',
  company: '',
  subject: '',
  question: '',
}

const initialFeedback = {
  name: '',
  message: '',
  rating: '5',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [feedbackForm, setFeedbackForm] = useState(initialFeedback)
  const [feedbackList, setFeedbackList] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [feedbackError, setFeedbackError] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [listLoading, setListLoading] = useState(true)

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const updateFeedback = (field) => (event) => {
    setFeedbackForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const loadFeedback = async () => {
    setListLoading(true)
    try {
      const response = await fetch(apiUrl('/api/feedback'))
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to load feedback')
      setFeedbackList(data.feedback || [])
    } catch (err) {
      setFeedbackError(err.message)
    } finally {
      setListLoading(false)
    }
  }

  useEffect(() => {
    loadFeedback()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitted(false)
    setLoading(true)
    try {
      const response = await fetch(apiUrl('/api/contacts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to send message')
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault()
    setFeedbackError('')
    setFeedbackSubmitted(false)
    setFeedbackLoading(true)
    try {
      const response = await fetch(apiUrl('/api/feedback'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: feedbackForm.name,
          message: feedbackForm.message,
          rating: Number(feedbackForm.rating),
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to save feedback')
      setFeedbackSubmitted(true)
      setFeedbackForm(initialFeedback)
      await loadFeedback()
    } catch (err) {
      setFeedbackError(err.message)
    } finally {
      setFeedbackLoading(false)
    }
  }

  const fieldClass =
    'w-full rounded-md border border-charcoal/15 bg-white px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-terracotta'

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h1 className="mb-10 text-center font-serif text-4xl font-semibold text-charcoal/80 sm:text-5xl">
          Contact us
        </h1>

        <div className="grid gap-10 rounded-2xl bg-cream px-5 py-8 sm:px-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="mb-6 text-sm leading-7 text-charcoal/80">
              Contact us about anything related to our company or services.
              We&apos;ll do our best to get back to you as soon as possible.
            </p>

            {submitted && (
              <p
                className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800"
                role="status"
              >
                Thank you — your message has been saved. We will get back to you
                soon.
              </p>
            )}
            {error && (
              <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-charcoal">
                    Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={update('name')}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-charcoal">
                    Phone Number
                  </span>
                  <input
                    value={form.phone}
                    onChange={update('phone')}
                    className={fieldClass}
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-charcoal">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-charcoal">
                    Company
                  </span>
                  <input
                    value={form.company}
                    onChange={update('company')}
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-charcoal">
                  Subject <span className="text-red-500">*</span>
                </span>
                <input
                  required
                  value={form.subject}
                  onChange={update('subject')}
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-charcoal">
                  Question <span className="text-red-500">*</span>
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.question}
                  onChange={update('question')}
                  className={fieldClass}
                />
              </label>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-terracotta px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-terracotta-dark disabled:opacity-60"
                >
                  {loading ? 'Sending…' : 'Submit'}
                </button>
              </div>
            </form>
          </div>

          <aside>
            <h2 className="mb-4 text-lg font-semibold text-charcoal">
              My Company
            </h2>
            <ul className="space-y-3 text-sm text-charcoal/80">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📍</span>
                <span>Osho Health Temple, Saharanpur</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">☎</span>
                <a href="tel:+917906830456" className="hover:text-terracotta">
                  +91 7906830456
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">✉</span>
                <a
                  href="mailto:ozyma14@gmail.com"
                  className="hover:text-terracotta"
                >
                  ozyma14@gmail.com
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <section className="mt-12 rounded-2xl bg-cream px-5 py-8 sm:px-8">
          <h2 className="mb-2 font-serif text-3xl font-semibold text-charcoal/80">
            Feedback
          </h2>
          <p className="mb-6 text-sm text-charcoal/75">
            Share your experience with Ozyma. Feedback is stored in Neon and
            shown below.
          </p>

          {feedbackSubmitted && (
            <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
              Thanks — your feedback was saved.
            </p>
          )}
          {feedbackError && (
            <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {feedbackError}
            </p>
          )}

          <form onSubmit={handleFeedbackSubmit} className="mb-10 grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-charcoal">
                Name <span className="text-red-500">*</span>
              </span>
              <input
                required
                value={feedbackForm.name}
                onChange={updateFeedback('name')}
                className={fieldClass}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-charcoal">
                Rating
              </span>
              <select
                value={feedbackForm.rating}
                onChange={updateFeedback('rating')}
                className={fieldClass}
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} / 5
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="mb-1.5 block font-medium text-charcoal">
                Message <span className="text-red-500">*</span>
              </span>
              <textarea
                required
                rows={3}
                value={feedbackForm.message}
                onChange={updateFeedback('message')}
                className={fieldClass}
              />
            </label>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={feedbackLoading}
                className="rounded-md bg-terracotta px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-terracotta-dark disabled:opacity-60"
              >
                {feedbackLoading ? 'Saving…' : 'Share Feedback'}
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">
              What people are saying
            </h3>
            {listLoading ? (
              <p className="text-sm text-charcoal/60">Loading feedback…</p>
            ) : feedbackList.length === 0 ? (
              <p className="text-sm text-charcoal/60">No feedback yet.</p>
            ) : (
              feedbackList.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-nav-border bg-white/70 px-4 py-4"
                >
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-charcoal">{item.name}</p>
                    {item.rating != null && (
                      <p className="text-sm text-terracotta">{item.rating}/5</p>
                    )}
                  </div>
                  <p className="text-sm leading-6 text-charcoal/80">
                    {item.message}
                  </p>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </div>
  )
}
