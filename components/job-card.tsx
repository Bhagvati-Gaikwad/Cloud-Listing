"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Job {
  title: string
  company: string
  location: string
  url: string
  posted_date: string
  salary: string
}

export default function JobCard({ job, isNew }: { job: Job; isNew: boolean }) {
  return (
    <Card
      className={`p-6 transition-all duration-300 ${
        isNew
          ? "border-2 border-success bg-success/5 hover:bg-success/10"
          : "border border-border hover:border-muted-foreground"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold">{job.title}</h3>
                {isNew && (
                  <span className="inline-flex items-center rounded-full bg-success px-3 py-1 text-xs font-medium text-success-foreground">
                    NEW
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">🏢 {job.company}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💰</span>
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{job.posted_date}</span>
            </div>
          </div>
        </div>

        <Button onClick={() => window.open(job.url, "_blank")} className="mt-4 gap-2 sm:mt-0" variant="default">
          View Job
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
