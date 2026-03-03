"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import type { HitterSeason } from "@/lib/mock-data"

export function PlayerChart({ seasons }: { seasons: HitterSeason[] }) {
  const chartData = seasons.map((s) => ({
    season: s.season.toString(),
    AVG: parseFloat(s.AVG) * 1000,
    OPS: parseFloat(s.OPS) * 1000,
    WAR: parseFloat(s.WAR),
    HR: s.HR,
    wRC: parseInt(s.wRC),
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* WAR Trend */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">WAR 추이</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="season" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--foreground)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="WAR" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AVG / OPS Trend */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">타율 / OPS 추이</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="season" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} domain={[200, 1100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--foreground)",
                fontSize: 12,
              }}
              formatter={(value: number, name: string) => {
                if (name === "AVG") return [`.${Math.round(value)}`, "타율"]
                if (name === "OPS") return [`.${Math.round(value)}`, "OPS"]
                return [value, name]
              }}
            />
            <Line type="monotone" dataKey="AVG" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 4, fill: "var(--chart-1)" }} />
            <Line type="monotone" dataKey="OPS" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 4, fill: "var(--chart-2)" }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-2 flex justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-chart-1" />
            <span className="text-xs text-muted-foreground">타율</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">OPS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
