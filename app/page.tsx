"use client"

import { useState, useEffect } from "react"
import JobDashboard from "@/components/job-dashboard"

export default function Home() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <div className={`min-h-screen transition-colors ${isDark ? "dark" : ""}`}>
      <JobDashboard />
    </div>
  )
}
