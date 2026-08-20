import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tools from './pages/Tools'
import Pranayama from './pages/Pranayama'
import Therapies from './pages/Therapies'
import Levels from './pages/Levels'
import Classes from './pages/Classes'
import InSchools from './pages/InSchools'
import TTC from './pages/TTC'
import Contact from './pages/Contact'
import Team from './pages/Team'
import About from './pages/About'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tools" element={<Tools />} />
            <Route path="tools/pranayama" element={<Pranayama />} />
            <Route path="therapies" element={<Therapies />} />
            <Route path="levels" element={<Levels />} />
            <Route path="classes" element={<Classes />} />
            <Route path="classes/in-schools" element={<InSchools />} />
            <Route path="ttc" element={<TTC />} />
            <Route path="contact" element={<Contact />} />
            <Route path="team" element={<Team />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
