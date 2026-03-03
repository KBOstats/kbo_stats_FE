import { SiteHeader } from "@/components/site-header"
import { PlayerProfile } from "@/components/player-profile"
import { PlayerStatsTable } from "@/components/player-stats-table"
import { PlayerChart } from "@/components/player-chart"
import { AIPredictionCard } from "@/components/ai-prediction-card"
import { topHitters, topPitchers, playerSeasonHistory, aiPredictions } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Brain, BarChart3 } from "lucide-react"
import Link from "next/link"

function PitcherStatsTable({ pitcher }: { pitcher: typeof topPitchers[number] }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">시즌 기록</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-xs text-muted-foreground">시즌</TableHead>
              <TableHead className="text-xs text-muted-foreground">팀</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">G</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">W</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">L</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">SV</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">HLD</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">IP</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">H</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">ER</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">BB</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">SO</TableHead>
              <TableHead className="text-center text-xs font-semibold text-foreground">ERA</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">WHIP</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">K/9</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">BB/9</TableHead>
              <TableHead className="text-center text-xs text-muted-foreground">FIP</TableHead>
              <TableHead className="text-center text-xs font-semibold text-primary">WAR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-border hover:bg-secondary/50">
              <TableCell className="text-sm font-mono font-medium text-foreground">{pitcher.stats.season}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{pitcher.stats.team}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.G}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.W}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.L}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.SV}</TableCell>
              <TableCell className="text-center text-sm font-mono text-muted-foreground">{pitcher.stats.HLD}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.IP}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.H}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.ER}</TableCell>
              <TableCell className="text-center text-sm font-mono text-muted-foreground">{pitcher.stats.BB}</TableCell>
              <TableCell className="text-center text-sm font-mono font-semibold text-kbo-highlight">{pitcher.stats.SO}</TableCell>
              <TableCell className="text-center text-sm font-mono font-semibold text-foreground">{pitcher.stats.ERA}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.WHIP}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.K9}</TableCell>
              <TableCell className="text-center text-sm font-mono text-muted-foreground">{pitcher.stats.BB9}</TableCell>
              <TableCell className="text-center text-sm font-mono text-foreground">{pitcher.stats.FIP}</TableCell>
              <TableCell className="text-center text-sm font-mono font-bold text-primary">{pitcher.stats.WAR}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const hitter = topHitters.find((h) => h.id === id)
  const pitcher = topPitchers.find((p) => p.id === id)
  const player = hitter || pitcher

  // Fallback to first hitter if not found
  const displayPlayer = player || topHitters[0]
  const isHitter = !!hitter || !player
  const prediction = aiPredictions.find((p) => p.playerId === displayPlayer.id)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">홈</Link>
          <span>/</span>
          <Link href="/players" className="hover:text-foreground transition-colors">선수</Link>
          <span>/</span>
          <span className="text-foreground">{displayPlayer.name}</span>
        </nav>

        {/* Player Profile */}
        <PlayerProfile player={displayPlayer} />

        {/* AI Prediction - Always on top */}
        <section className="mt-6">
          {prediction ? (
            <AIPredictionCard prediction={prediction} />
          ) : (
            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">AI 성적 예측</h3>
                  <p className="text-xs text-muted-foreground">해당 선수의 AI 예측 데이터가 아직 준비되지 않았습니다. 데이터가 충분히 쌓이면 자동으로 생성됩니다.</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Stats Chart */}
        <section className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">시각화</h2>
          </div>
          {isHitter ? (
            <PlayerChart seasons={displayPlayer.id === "h1" ? playerSeasonHistory : [topHitters.find(h => h.id === displayPlayer.id)?.stats || playerSeasonHistory[0]]} />
          ) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">투수 시각화 데이터 준비 중</p>
            </div>
          )}
        </section>

        {/* Season Stats Table - Below */}
        <section className="mt-6">
          {isHitter ? (
            hitter ? (
              <PlayerStatsTable seasons={displayPlayer.id === "h1" ? playerSeasonHistory : [hitter.stats]} />
            ) : (
              <PlayerStatsTable seasons={playerSeasonHistory} />
            )
          ) : (
            pitcher && <PitcherStatsTable pitcher={pitcher} />
          )}
        </section>
      </main>
    </div>
  )
}
