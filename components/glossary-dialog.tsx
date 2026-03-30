"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLang, tr } from "@/components/lang-context"

type GlossaryTerm = {
  term: string
  desc: {
    ko: string
    en: string
  }
}

const teamTerms: GlossaryTerm[] = [
  {
    term: "PCT",
    desc: {
      ko: "승률. 승 / (승 + 패)",
      en: "Winning percentage. Wins / (wins + losses).",
    },
  },
  {
    term: "GB",
    desc: {
      ko: "게임차. 1위 팀과의 차이",
      en: "Games behind the first-place team.",
    },
  },
  {
    term: "Streak",
    desc: {
      ko: "연승 또는 연패 흐름",
      en: "Current winning or losing streak.",
    },
  },
]

const pitcherTerms: GlossaryTerm[] = [
  {
    term: "ERA",
    desc: {
      ko: "평균자책점. 9이닝당 자책점",
      en: "Earned Run Average. Earned runs per nine innings.",
    },
  },
  {
    term: "WHIP",
    desc: {
      ko: "이닝당 출루 허용. (피안타 + 볼넷) / 이닝",
      en: "Walks plus hits allowed per inning pitched.",
    },
  },
  {
    term: "K/9",
    desc: {
      ko: "9이닝당 삼진",
      en: "Strikeouts per nine innings.",
    },
  },
  {
    term: "BB/9",
    desc: {
      ko: "9이닝당 볼넷",
      en: "Walks per nine innings.",
    },
  },
  {
    term: "K/BB",
    desc: {
      ko: "삼진 대비 볼넷 비율",
      en: "Strikeout-to-walk ratio.",
    },
  },
  {
    term: "IP",
    desc: {
      ko: "투구 이닝",
      en: "Innings pitched.",
    },
  },
  {
    term: "SV",
    desc: {
      ko: "세이브",
      en: "Saves.",
    },
  },
  {
    term: "HLD",
    desc: {
      ko: "홀드",
      en: "Holds.",
    },
  },
  {
    term: "SP",
    desc: {
      ko: "선발투수. 경기 첫 이닝부터 등판하는 투수",
      en: "Starting pitcher. Takes the mound from the first inning.",
    },
  },
  {
    term: "RP",
    desc: {
      ko: "구원투수. 선발 이후 등판하는 투수 (마무리 포함)",
      en: "Relief pitcher. Enters after the starter, including closers.",
    },
  },
  {
    term: "WAR",
    desc: {
      ko: "대체 선수 대비 승리 기여도",
      en: "Wins Above Replacement. A measure of a player's total contributions to their team.",
    },
  },
]

const hitterTerms: GlossaryTerm[] = [
  {
    term: "AVG",
    desc: {
      ko: "타율. 안타 / 타수",
      en: "Batting average. Hits / at-bats.",
    },
  },
  {
    term: "OPS",
    desc: {
      ko: "출루율 + 장타율",
      en: "On-base percentage plus slugging percentage.",
    },
  },
  {
    term: "OBP",
    desc: {
      ko: "출루율. (안타 + 볼넷 + 사구) / (타수 + 볼넷 + 사구 + 희생플라이)",
      en: "On-base percentage.",
    },
  },
  {
    term: "SLG",
    desc: {
      ko: "장타율. 루타수 / 타수",
      en: "Slugging percentage. Total bases / at-bats.",
    },
  },
  {
    term: "H",
    desc: {
      ko: "안타 수",
      en: "Hits.",
    },
  },
  {
    term: "HR",
    desc: {
      ko: "홈런 수",
      en: "Home runs.",
    },
  },
  {
    term: "RBI",
    desc: {
      ko: "타점",
      en: "Runs batted in.",
    },
  },
  {
    term: "WAR",
    desc: {
      ko: "대체 선수 대비 승리 기여도",
      en: "Wins Above Replacement. A measure of a player's total contributions to their team.",
    },
  },
]

function GlossarySection({
  title,
  terms,
  lang,
}: {
  title: string
  terms: GlossaryTerm[]
  lang: "ko" | "en"
}) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="border-b pb-1 text-sm font-bold text-foreground">{title}</h3>
      <div className="flex flex-col gap-4">
        {terms.map((term) => (
          <div key={term.term} className="flex flex-col gap-1">
            <span className="font-mono text-sm font-bold text-primary">{term.term}</span>
            <span className="text-sm text-muted-foreground">{term.desc[lang]}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function GlossaryDialog({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tr("home.glossary", lang)}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[360px] w-full rounded-md border p-4">
          <div className="flex flex-col gap-6">
            <GlossarySection
              title={lang === "ko" ? "팀 지표" : "Team Stats"}
              terms={teamTerms}
              lang={lang}
            />
            <GlossarySection
              title={lang === "ko" ? "선수 지표 - 투수" : "Player Stats - Pitchers"}
              terms={pitcherTerms}
              lang={lang}
            />
            <GlossarySection
              title={lang === "ko" ? "선수 지표 - 타자" : "Player Stats - Hitters"}
              terms={hitterTerms}
              lang={lang}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
