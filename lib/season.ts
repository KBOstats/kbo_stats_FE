const KST_TIMEZONE = "Asia/Seoul"
const KBO_REGULAR_SEASON_START_MONTH = 3
const KBO_REGULAR_SEASON_START_DAY = 28

function getKstDateParts(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: KST_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value
      return acc
    }, {})

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  }
}

export function getDefaultSeasonYearByKst(date: Date = new Date()) {
  const { year, month, day } = getKstDateParts(date)
  const hasSeasonStarted =
    month > KBO_REGULAR_SEASON_START_MONTH ||
    (month === KBO_REGULAR_SEASON_START_MONTH && day >= KBO_REGULAR_SEASON_START_DAY)

  return hasSeasonStarted ? year : year - 1
}

export function getDefaultSeasonStringByKst(date: Date = new Date()) {
  return String(getDefaultSeasonYearByKst(date))
}

export function getSeasonOptions(date: Date = new Date(), count = 3) {
  const baseYear = getDefaultSeasonYearByKst(date)
  return Array.from({ length: count }, (_, index) => String(baseYear - index))
}

