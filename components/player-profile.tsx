"use client"

import { Badge } from "@/components/ui/badge"
import type { PlayerBase } from "@/lib/mock-data"
import { User, Calendar, Ruler, Weight, Banknote } from "lucide-react"

export function PlayerProfile({ player }: { player: PlayerBase }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-secondary">
          <User className="h-12 w-12 text-muted-foreground" />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">{player.name}</h1>
            <Badge variant="outline" className="text-xs font-mono border-border text-muted-foreground">#{player.number}</Badge>
            <Badge className="text-xs" style={{ backgroundColor: player.teamColor, color: "#fff" }}>
              {player.team}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{player.position} / {player.hand}</p>

          <div className="mt-3 flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{player.birthDate} ({player.age}세)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Ruler className="h-3.5 w-3.5" />
              <span>{player.height}cm</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Weight className="h-3.5 w-3.5" />
              <span>{player.weight}kg</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Banknote className="h-3.5 w-3.5" />
              <span>{player.salary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
