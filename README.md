# 🪖 Military Calisthenics App

> 15-minute combat-ready workouts. No equipment. No excuses.

## Features

- **Random 15-min workouts** — 4 tactical protocols (Alpha, Bravo, Charlie, Delta)
- **15 military exercises** with SVG illustrations showing form & technique
- **Built-in timer** with rest countdowns, skip, and pause
- **Tactical UI** — dark military aesthetic, monospace fonts

## Screens

1. **Home** — Mission briefing screen, generate random workout
2. **Preview** — Full exercise list with illustrations, reps, muscle groups, and form cues
3. **Timer** — Active workout mode with circular timer, phase tracking, and rest intervals

## Deploy

### 1. GitHub

```bash
cd military-calisthenics
git init
git add .
git commit -m "feat: initial military calisthenics app"
gh repo create military-calisthenics --public --push --source=.
```

### 2. Vercel (via CLI)

```bash
npm i -g vercel
vercel --prod
```

### 2b. Vercel (via Dashboard)

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo `military-calisthenics`
3. Framework: **Create React App** (auto-detected)
4. Click **Deploy** — done in ~60 seconds

## Local Development

```bash
npm install
npm start
# Opens at http://localhost:3000
```

## Structure

```
src/
  App.js                  # Main app + Home screen
  App.css                 # Global styles
  components/
    ExerciseFigure.jsx    # SVG illustrations for each exercise
    WorkoutPreview.jsx    # Exercise list before workout
    WorkoutTimer.jsx      # Active timer screen
  data/
    exercises.js          # All exercises + workout generator
```

## Adding Exercises

Edit `src/data/exercises.js` — add an entry to `exercises[]` and an SVG to `ExerciseFigure.jsx`.

---

*Semper Fi.*
