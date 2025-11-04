import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { navitems } from "./constants"
import type { NavigationProps } from "./types"
import { Icon } from "@/components/ui/Icon/Icon"
import logoprimary from "/logo-primary.svg"

export function Navigation({ onNavigate }: NavigationProps) {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white/60 backdrop-blur-lg shadow-sm">
        <div className="flex flex-col items-center relative w-full">
          <div className="flex flex-row items-center justify-between max-w-7xl w-full px-8 py-4">
            <Link to="/" onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false) }} className="h-full w-auto p-0 bg-transparent hover:scale-105 transition-transform flex items-center">
              <img
                src={logoprimary}
                alt="TruBalance Bodywork"
                className="h-full max-h-10 w-auto"
              />
            </Link>
            <div className="flex items-center gap-6">
              {/* Desktop Navigation Menu */}
              <ul className="hidden lg:flex gap-6 items-center">
                {navitems.map((item) => {
                  const isActive =
                    (location.pathname === '/' && item.page === 'home') ||
                    (item.page !== 'home' && location.pathname.includes(item.page))
                  return (
                    <li key={item.page} className="group">
                      <Link
                        to={item.page === 'home' ? '/' : `/${item.page}`}
                        onClick={() => onNavigate(item.page)}
                        className=
                        "relative transition-colors duration-500 px-3 py-2 font-semibold text-secondary hover:text-primary"
                      >
                        {item.text}
                        {/* Single Underline */}
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 w-full h-1 pointer-events-none origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
                            isActive && "scale-x-100",
                            isActive
                              ?
                              "bg-secondary"
                              :
                              "bg-primary")}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={() => onNavigate("signin")}
                  className=
                  "px-4 py-2 rounded-lg border transition-all duration-500 font-semibold border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate("book")}
                  className=
                  "px-4 py-2 rounded-lg transition-all duration-500 font-semibold backdrop-blur-sm shadow-md btn-gradient-primary text-white hover:btn-gradient-primary"

                >
                  Book Now
                </button>
              </div>

              {/*  Mobile Menu Toggle Button Wrapper */}
              <div className="flex items-center gap-4">

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={toggleMobileMenu}
                  className=
                    "flex lg:hidden p-2 items-center text-white justify-center rounded-md shadow-md transition-all font-semibold text-sm uppercase bg-primary hover:bg-primary-dark"
                  aria-label="Toggle mobile menu"
                >
                  <Icon name={isMobileMenuOpen ? "close" : "menu"} className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 z-40 lg:z-40 md:z-40 sm:z-40 w-full h-screen bg-primary-95 backdrop-blur-md shadow-xl flex flex-col overflow-hidden">
          <div className="flex flex-col grow overflow-y-auto h-full px-6 py-6 pt-50">
            <ul className="flex flex-col gap-4">
              {navitems.map((item) => (
                <li key={item.page}>
                  <Link
                    to={item.page === 'home' ? '/' : `/${item.page}`}
                    onClick={() => { onNavigate(item.page); setIsMobileMenuOpen(false) }}
                    className="block text-secondary font-semibold text-lg py-2 hover:text-primary active:text-primary transition"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}