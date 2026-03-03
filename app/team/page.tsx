"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { teams, topHitters, topPitchers } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Trophy, CalendarDays, Swords } from "lucide-react"
import Link from "next/link"

// Mock calendar data
const scheduleData = [
  { date: "07.10", opp: "LG", result: "W", score: "5-3", home: true },
  { date: "07.11", opp: "LG", result: "L", score: "2-4", home: true },
  { date: "07.12", opp: "LG", result: "W", score: "8-1", home: true },
  { date: "07.13", opp: "두산", result: "W", score: "6-2", home: false },
  { date: "07.14", opp: "두산", result: "W", score: "3-1", home: false },
  { date: "07.15", opp: "두산", result: "L", score: "1-5", home: false },
  { date: "07.16", opp: "NC", result: "-", score: "-", home: true },
  { date: "07.17", opp: "NC", result: "-", score: "-", home: true },
  { date: "07.18", opp: "NC", result: "-", score: "-", home: true },
]

// Mock head-to-head
const h2hData = [
  { opp: "KIA", w: 7, l: 5, d: 0, rs: 52, ra: 43 },
  { opp: "LG", w: 6, l: 6, d: 1, rs: 48, ra: 49 },
  { opp: "두산", w: 8, l: 4, d: 0, rs: 55, ra: 38 },
  { opp: "KT", w: 7, l: 5, d: 0, rs: 50, ra: 42 },
  { opp: "NC", w: 5, l: 7, d: 1, rs: 38, ra: 45 },
  { opp: "삼성", w: 6, l: 6, d: 0, rs: 44, ra: 41 },
  { opp: "롯데", w: 7, l: 3, d: 0, rs: 48, ra: 30 },
  { opp: "한화", w: 4, l: 2, d: 0, rs: 32, ra: 22 },
  { opp: "키움", w: 2, l: 0, d: 0, rs: 12, ra: 5 },
]

export default function TeamPage() {
  const [selectedTeam, setSelectedTeam] = useState("SSG")
  const team = teams.find((t) => t.id === selectedTeam) || teams[0]

  // Mock team stats
  const teamHitters = topHitters.filter((h) => h.team === selectedTeam)
  const teamPitchers = topPitchers.filter((p) => p.team === selectedTeam)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">홈</Link>
          <span>/</span>
          <span className="text-foreground">팀</span>
        </nav>

        {/* Team Selector + Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg" style={{ backgroundColor: team.color }} />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{team.name}</h1>
              <p className="text-sm text-muted-foreground">
                {team.wins}승 {team.losses}패 {team.draws}무 (승률 {team.pct})
              </p>
            </div>
          </div>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                    {t.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Team Summary Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">순위</p>
            <p className="text-2xl font-bold font-mono text-foreground">
              {teams.findIndex((t) => t.id === selectedTeam) + 1}위
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">승률</p>
            <p className="text-2xl font-bold font-mono text-foreground">{team.pct}</p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">게임차</p>
            <p className="text-2xl font-bold font-mono text-foreground">{team.gb}</p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">최근 연속</p>
            <p className={`text-2xl font-bold font-mono ${team.streak.startsWith("W") ? "text-primary" : "text-kbo-danger"}`}>
              {team.streak}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="roster">
          <TabsList className="bg-secondary">
            <TabsTrigger value="roster" className="gap-1.5">
              <Users className="h-3.5 w-3.5" />
              선수 순위
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              일정/결과
            </TabsTrigger>
            <TabsTrigger value="h2h" className="gap-1.5">
              <Swords className="h-3.5 w-3.5" />
              상대전적
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roster" className="mt-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Team Hitters */}
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <Trophy className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">주요 타자</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-xs text-muted-foreground">선수</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">AVG</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">HR</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">RBI</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">OPS</TableHead>
                      <TableHead className="text-center text-xs font-semibold text-primary">WAR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(teamHitters.length > 0 ? teamHitters : topHitters.slice(0, 3)).map((h) => (
                      <TableRow key={h.id} className="border-border hover:bg-secondary/50">
                        <TableCell>
                          <Link href={`/player/${h.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                            {h.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{h.stats.AVG}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-kbo-highlight">{h.stats.HR}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{h.stats.RBI}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{h.stats.OPS}</TableCell>
                        <TableCell className="text-center text-sm font-mono font-bold text-primary">{h.stats.WAR}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Team Pitchers */}
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <Trophy className="h-4 w-4 text-chart-2" />
                  <h3 className="text-sm font-semibold text-foreground">주요 투수</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-xs text-muted-foreground">선수</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">ERA</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">W-L</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">SO</TableHead>
                      <TableHead className="text-center text-xs text-muted-foreground">WHIP</TableHead>
                      <TableHead className="text-center text-xs font-semibold text-primary">WAR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(teamPitchers.length > 0 ? teamPitchers : topPitchers.slice(0, 3)).map((p) => (
                      <TableRow key={p.id} className="border-border hover:bg-secondary/50">
                        <TableCell>
                          <Link href={`/player/${p.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                            {p.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{p.stats.ERA}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{p.stats.W}-{p.stats.L}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-kbo-highlight">{p.stats.SO}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{p.stats.WHIP}</TableCell>
                        <TableCell className="text-center text-sm font-mono font-bold text-primary">{p.stats.WAR}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-4">
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h3 className="text-sm font-semibold text-foreground">7월 일정 및 결과</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-xs text-muted-foreground">날짜</TableHead>
                    <TableHead className="text-xs text-muted-foreground">상대</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">홈/원정</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">결과</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">스코어</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleData.map((g, i) => (
                    <TableRow key={i} className="border-border hover:bg-secondary/50">
                      <TableCell className="text-sm font-mono text-foreground">{g.date}</TableCell>
                      <TableCell className="text-sm text-foreground">{g.opp}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                          {g.home ? "홈" : "원정"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {g.result === "-" ? (
                          <Badge variant="secondary" className="text-xs bg-secondary text-muted-foreground">예정</Badge>
                        ) : g.result === "W" ? (
                          <Badge className="text-xs bg-primary/20 text-primary border-0">승</Badge>
                        ) : (
                          <Badge className="text-xs bg-kbo-danger/20 text-kbo-danger border-0">패</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-sm font-mono text-foreground">{g.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="h2h" className="mt-4">
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h3 className="text-sm font-semibold text-foreground">상대 팀별 전적</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-xs text-muted-foreground">상대</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">승</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">패</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">무</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">득점</TableHead>
                    <TableHead className="text-center text-xs text-muted-foreground">실점</TableHead>
                    <TableHead className="text-center text-xs font-semibold text-foreground">승률</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {h2hData.map((h, i) => {
                    const total = h.w + h.l + h.d
                    const pct = total > 0 ? (h.w / (h.w + h.l)).toFixed(3) : "-"
                    return (
                      <TableRow key={i} className="border-border hover:bg-secondary/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: teams.find(t => t.shortName === h.opp)?.color || "#666" }} />
                            <span className="text-sm font-medium text-foreground">{h.opp}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-sm font-mono text-primary">{h.w}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-kbo-danger">{h.l}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-muted-foreground">{h.d}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{h.rs}</TableCell>
                        <TableCell className="text-center text-sm font-mono text-foreground">{h.ra}</TableCell>
                        <TableCell className="text-center text-sm font-mono font-semibold text-foreground">{pct}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
