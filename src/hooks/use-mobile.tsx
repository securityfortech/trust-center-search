
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to set mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Setup resize event listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", checkMobile)
    
    // Immediately check on mount
    checkMobile()
    
    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", checkMobile)
  }, [])

  // Return true if mobile, false if desktop, with fallback to desktop (false)
  return !!isMobile
}

// Export a hook for getting current viewport dimensions
export function useViewportSize() {
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    
    // Initial dimensions
    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}
