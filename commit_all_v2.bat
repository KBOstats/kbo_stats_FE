@echo off
git reset --soft origin/main
git reset HEAD

git add app\globals.css
git commit -m "style: refine light mode aesthetic with white/green editorial theme"

git add components\home-content.tsx
git commit -m "style: revert home banner to flat border design matching dark mode"

git add components\standings-table.tsx
git commit -m "fix: add empty data state to standings table to prevent border overlap"

git add components\recent-games.tsx
git commit -m "fix: add empty data state to recent games to prevent border overlap"

git add app\team\page.tsx
git commit -m "fix: add empty data states to team leader tables to prevent border overlap"

git add .
git commit -m "style: format clean flat aesthetic for auxiliary components"

git push origin main
