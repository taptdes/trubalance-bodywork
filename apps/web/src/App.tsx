import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navigation } from '@/components/ui/navigation'
import type { PageType } from '@/components/ui/navigation/types'
import { withLDProvider } from 'launchdarkly-react-client-sdk'
import { About } from './pages/About'
import { Footer } from '@/lib/blocks/Footer'
import './index.css'
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'
import Resources from '@/pages/Resources'
import ClinicInfo from '@/pages/Clinic'
import ProfilePage from '@/pages/Profile'
import { Booking } from './pages/Booking'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const navigate = useNavigate()

  const handleNavigate = (page: PageType) => {
    // Guard against invalid page types
    if (!page) {
      console.warn('handleNavigate called with invalid page type')
      return
    }

    setCurrentPage(page)

    // Redirect to external Square booking page
    if (page === 'booking') {
      try {
        window.location.href =
          'https://book.squareup.com/appointments/3kbzu7zt3ue90u/location/LYB1S1NE2CJN5/services'
      } catch (error) {
        console.error('Failed to redirect to booking page:', error)
      }
      return
    }

    // Handle internal navigation
    try {
      if (page === 'home') {
        navigate('/')
      } else {
        navigate(`/${page}`)
      }
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  return (
    <>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services onBookNow={() => handleNavigate('booking')} />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/location" element={<ClinicInfo />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer onSectionChange={handleNavigate} />
    </>
  )
}

const LDApp = withLDProvider({
  clientSideID: '686ffb31d2db8409436cef4b',
  reactOptions: {
    useCamelCaseFlagKeys: false,
  },
})(() => <App />)

export { App, LDApp }
