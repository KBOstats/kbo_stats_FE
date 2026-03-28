"use client"

import { useLang, tr } from "@/components/lang-context"
import { formatTeamName } from "@/lib/romanize"

type GameRow = {
  game_id: string
  away_team: string
  away_score: number | null
  home_team: string
  home_score: number | null
  status?: string
  game_time?: string | null
}

export function RecentGames({
  rows,
  date,
}: {
  rows: GameRow[]
  date: string | null
}) {
  const { lang } = useLang()

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">{tr("recentGames.title", lang)}</h2>
        <span className="text-xs text-muted-foreground font-mono">{date ?? "-"}</span>
      </div>
      <div className="divide-y divide-border">
        {rows.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            {lang === "en" ? "No games today." : "오늘 예정된 경기가 없습니다."}
          </div>
        ) : (
          rows.map((game) => {
            const isScheduled = game.status === "scheduled" || game.away_score === null
            const homeWin = !isScheduled && (game.home_score ?? 0) > (game.away_score ?? 0)
            const awayWin = !isScheduled && (game.away_score ?? 0) > (game.home_score ?? 0)
            return (
              <div key={game.game_id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50">
                <div className="flex flex-1 justify-end">
                  <span className={`text-sm font-medium ${awayWin ? "text-foreground" : "text-muted-foreground"}`}>{formatTeamName(game.away_team, lang)}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1 min-w-[4rem] justify-center">
                  {isScheduled ? (
                    <span className="text-xs font-mono text-muted-foreground">
                      {game.game_time ? game.game_time.slice(0, 5) : lang === "ko" ? "예정" : "TBD"}
                    </span>
                  ) : (
                    <>
                      <span className={`text-base font-mono font-bold ${awayWin ? "text-foreground" : "text-muted-foreground"}`}>{game.away_score}</span>
                      <span className="text-xs text-muted-foreground">:</span>
                      <span className={`text-base font-mono font-bold ${homeWin ? "text-foreground" : "text-muted-foreground"}`}>{game.home_score}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-1">
                  <span className={`text-sm font-medium ${homeWin ? "text-foreground" : "text-muted-foreground"}`}>{formatTeamName(game.home_team, lang)}</span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}