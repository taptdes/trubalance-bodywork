import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import './index.css'
import { App } from './App.tsx'
import { LDApp } from './App.tsx'
import { AuthProvider } from "@/lib/context/authContext"

const Root = import.meta.env.DEV ? LDApp : App

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

export const loadRecaptcha = (): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`
    script.async = true
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

export const executeRecaptcha = async (action: string) => {
  await loadRecaptcha()
  return grecaptcha.enterprise.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action })
}