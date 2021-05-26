import ReactGA from "react-ga"
import { useEffect } from "react"

const isProduction = process.env.NODE_ENV === "production"

const initializeTracking = () => {
  console.log("GA init")
  ReactGA.initialize("UA-154564456-1")
}

export const Tracking = () => {
  useEffect(() => {
    if (!isProduction) {
      return
    }

    if (!window.GA_INITIALIZED) {
      initializeTracking()
      window.GA_INITIALIZED = true
    }

    trackPageView()
  }, [])

  return null
}

export const trackPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const trackEvent = ({ category, action, label, ...rest }) => {
  if (!isProduction) {
    console.log("Simulation tracking event...")
    console.log({ category, action, label, ...rest })
    return
  }

  if (category && action) {
    ReactGA.event({ category, action, label, ...rest })
  }
}
