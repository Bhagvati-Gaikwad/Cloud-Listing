"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import JobCard from "@/components/job-card"
import StatisticsCard from "@/components/statistics-card"
import { Loader2, RefreshCw } from "lucide-react"

interface JobListing {
  title: string
  company: string
  location: string
  url: string
  posted_date: string
  salary: string
}

interface DashboardResponse {
  jobs: JobListing[]
  total_jobs: number
  new_jobs: number
  new_jobs_list: JobListing[]
  last_updated: string
}

const mockData: DashboardResponse = {
  total_jobs: 2847,
  new_jobs: 24,
  last_updated: new Date().toISOString(),
  jobs: [
    {
      title: "Senior Cloud Engineer",
      company: "TechCorp",
      location: "Remote",
      url: "https://indeed.com/jobs",
      posted_date: "2 hours ago",
      salary: "$150K - $180K",
    },
    {
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Remote, US",
      url: "https://indeed.com/jobs",
      posted_date: "4 hours ago",
      salary: "$130K - $160K",
    },
    {
      title: "Backend Engineer",
      company: "DataFlow",
      location: "Remote",
      url: "https://indeed.com/jobs",
      posted_date: "6 hours ago",
      salary: "$120K - $150K",
    },
  ],
  new_jobs_list: [
    {
      title: "Senior Cloud Engineer",
      company: "TechCorp",
      location: "Remote",
      url: "https://indeed.com/jobs",
      posted_date: "2 hours ago",
      salary: "$150K - $180K",
    },
    {
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Remote, US",
      url: "https://indeed.com/jobs",
      posted_date: "4 hours ago",
      salary: "$130K - $160K",
    },
  ],
}

export default function JobDashboard() {
  const [searchQuery, setSearchQuery] = useState("Remote Cloud")
  const [data, setData] = useState<DashboardResponse>(mockData)
  const [loading, setLoading] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [scraping, setScraping] = useState(false)

  // Simulate fetching data from Codewords API
  const fetchJobDashboard = async (query: string) => {
    setLoading(true)
    setScraping(true)
    try {
      // In production, this would call the Codewords API
      // const client = createServiceClient(process.env.CODEWORDS_API_KEY!);
      // const result = await client.runService<DashboardResponse>(
      //   "job_listings_dashboard_fbb45471",
      //   "",
      //   { search_query: query }
      // );
      // setData(result);

      // For demo, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setData({
        ...mockData,
        last_updated: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setLoading(false)
      setScraping(false)
    }
  }

  const handleRefresh = async () => {
    await fetchJobDashboard(searchQuery)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetchJobDashboard(searchQuery)
  }

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchJobDashboard(searchQuery)
      }, 3600000) // 1 hour
      return () => clearInterval(interval)
    }
  }, [autoRefresh, searchQuery])

  const lastUpdateTime = new Date(data.last_updated).toLocaleTimeString()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">📊 Job Listings Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Remote Cloud jobs from Indeed with real-time updates</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search job query (e.g., 'Remote Python', 'Cloud Engineer NYC')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Search
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleRefresh} disabled={loading} className="gap-2 bg-transparent">
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh Dashboard
              </Button>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                  disabled={loading}
                />
                <span className="text-sm text-muted-foreground">Auto-refresh hourly</span>
              </label>
            </div>
            <div className="text-sm text-muted-foreground">Last updated: {lastUpdateTime}</div>
          </div>

          {/* Progress Indicator */}
          {scraping && (
            <Card className="border-success bg-success/10 p-4">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-success" />
                <div>
                  <p className="font-medium text-success">Scraping in progress...</p>
                  <p className="text-sm text-success/80">This may take 60-90 seconds</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <StatisticsCard label="Total Jobs" value={data.total_jobs.toLocaleString()} icon="💼" />
          <StatisticsCard label="✨ New Jobs" value={data.new_jobs.toString()} icon="🔥" highlight />
        </div>

        {/* New Jobs Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">✨ NEW JOBS</h2>
          <div className="grid gap-4">
            {data.new_jobs_list.length > 0 ? (
              data.new_jobs_list.map((job, index) => <JobCard key={index} job={job} isNew={true} />)
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No new jobs at this time</p>
              </Card>
            )}
          </div>
        </div>

        {/* All Jobs Section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">📋 ALL JOBS</h2>
          <div className="grid gap-4">
            {data.jobs.length > 0 ? (
              data.jobs.map((job, index) => <JobCard key={index} job={job} isNew={false} />)
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No jobs found</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
