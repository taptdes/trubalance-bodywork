import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
// import { Home } from "./pages/HomeNew";
import { Home } from "./pages/Home"
import { Navigation } from "@/components/ui/navigation"
import type { PageType } from "@/components/ui/navigation/types"
import { withLDProvider } from "launchdarkly-react-client-sdk"
import { About } from './pages/About'
import { Footer } from '@/lib/blocks/Footer'
import "./index.css"
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'
import  {Booking}  from './pages/Booking'
import Resources from "@/pages/Resources"
import ClinicInfo from "@/pages/Clinic"
import ProfilePage from "@/pages/Profile"

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const navigate = useNavigate()

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page)
    if (page === "home") navigate("/")
    else navigate(`/${page}`)
  }

  return (
    <>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Services onBookNow={() => { }} />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/location" element={<ClinicInfo />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/" element={<Home onBookNow={() => { }} onSectionChange={() => { }} />} />     */}
      </Routes>
      <Footer onSectionChange={() => { }} />
    </>
  )
}

const LDApp = withLDProvider({
  clientSideID: "686ffb31d2db8409436cef4b",
  reactOptions: {
    useCamelCaseFlagKeys: false,
  },
})(() => (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
))

export { App, LDApp }
