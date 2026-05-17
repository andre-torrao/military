export const exercises = [
  {
    id: 1,
    name: "Push-Up",
    category: "upper",
    duration: 60,
    reps: "20 reps",
    muscles: ["Chest", "Triceps", "Shoulders"],
    difficulty: "Basic",
    description: "Classic military push-up. Keep body straight, chest to deck.",
    svgKey: "pushup",
    cues: ["Lock core", "Elbows at 45°", "Full range of motion"]
  },
  {
    id: 2,
    name: "Burpee",
    category: "full",
    duration: 60,
    reps: "15 reps",
    muscles: ["Full Body", "Cardio"],
    difficulty: "Hard",
    description: "Drop to deck, push-up, jump up with hands overhead. Max effort.",
    svgKey: "burpee",
    cues: ["Explosive jump", "Tight push-up", "No pause at bottom"]
  },
  {
    id: 3,
    name: "Pull-Up",
    category: "upper",
    duration: 60,
    reps: "10 reps",
    muscles: ["Back", "Biceps", "Core"],
    difficulty: "Hard",
    description: "Dead hang start, chin over bar. Military standard.",
    svgKey: "pullup",
    cues: ["Dead hang start", "Chin over bar", "Controlled descent"]
  },
  {
    id: 4,
    name: "Squat",
    category: "lower",
    duration: 60,
    reps: "25 reps",
    muscles: ["Quads", "Glutes", "Hamstrings"],
    difficulty: "Basic",
    description: "Feet shoulder-width, break parallel. Standard military squat.",
    svgKey: "squat",
    cues: ["Break parallel", "Knees track toes", "Chest up"]
  },
  {
    id: 5,
    name: "Mountain Climber",
    category: "core",
    duration: 45,
    reps: "30 reps/side",
    muscles: ["Core", "Hip Flexors", "Cardio"],
    difficulty: "Medium",
    description: "High plank, drive knees alternately to chest. Rapid fire.",
    svgKey: "mountainclimber",
    cues: ["Hips level", "Fast cadence", "Arms locked"]
  },
  {
    id: 6,
    name: "Plank",
    category: "core",
    duration: 60,
    reps: "60 sec hold",
    muscles: ["Core", "Shoulders", "Glutes"],
    difficulty: "Medium",
    description: "Forearm plank, body rigid as a board. Military rest position.",
    svgKey: "plank",
    cues: ["Squeeze glutes", "Neutral spine", "Breathe steady"]
  },
  {
    id: 7,
    name: "Dip",
    category: "upper",
    duration: 60,
    reps: "15 reps",
    muscles: ["Triceps", "Chest", "Shoulders"],
    difficulty: "Medium",
    description: "Parallel bar dips. Elbows back, controlled descent.",
    svgKey: "dip",
    cues: ["Elbows back", "Upright torso", "Lock out at top"]
  },
  {
    id: 8,
    name: "Lunge",
    category: "lower",
    duration: 60,
    reps: "20 reps/leg",
    muscles: ["Quads", "Glutes", "Balance"],
    difficulty: "Basic",
    description: "Alternating forward lunges. Knee one inch from deck.",
    svgKey: "lunge",
    cues: ["Knee tracks foot", "Upright torso", "Drive through heel"]
  },
  {
    id: 9,
    name: "Flutter Kick",
    category: "core",
    duration: 45,
    reps: "40 reps",
    muscles: ["Lower Abs", "Hip Flexors"],
    difficulty: "Medium",
    description: "On your six, legs 6 inches up, flutter kick. Navy SEAL staple.",
    svgKey: "flutterkick",
    cues: ["Lower back flat", "6 inches off deck", "Pointed toes"]
  },
  {
    id: 10,
    name: "Jump Squat",
    category: "lower",
    duration: 45,
    reps: "20 reps",
    muscles: ["Quads", "Glutes", "Power"],
    difficulty: "Hard",
    description: "Squat deep, explode up, land soft. Builds explosive power.",
    svgKey: "jumpsquat",
    cues: ["Deep squat", "Max height", "Soft landing"]
  },
  {
    id: 11,
    name: "Diamond Push-Up",
    category: "upper",
    duration: 60,
    reps: "15 reps",
    muscles: ["Triceps", "Inner Chest"],
    difficulty: "Hard",
    description: "Hands form diamond shape under chest. Tricep isolation.",
    svgKey: "diamondpushup",
    cues: ["Diamond hand position", "Elbows tight", "Touch chest to hands"]
  },
  {
    id: 12,
    name: "Bear Crawl",
    category: "full",
    duration: 45,
    reps: "20 meters",
    muscles: ["Full Body", "Coordination"],
    difficulty: "Medium",
    description: "Hands and feet, knees 2 inches off deck. Forward and back.",
    svgKey: "bearcrawl",
    cues: ["Knees 2in off deck", "Opposite limbs", "Forward drive"]
  },
  {
    id: 13,
    name: "Hanging Knee Raise",
    category: "core",
    duration: 60,
    reps: "15 reps",
    muscles: ["Abs", "Hip Flexors", "Grip"],
    difficulty: "Medium",
    description: "Dead hang, drive knees to chest. Controlled lower.",
    svgKey: "kneeraise",
    cues: ["Full dead hang", "Knees to chest", "Slow descent"]
  },
  {
    id: 14,
    name: "Sprint in Place",
    category: "cardio",
    duration: 30,
    reps: "30 sec max",
    muscles: ["Legs", "Cardio", "Coordination"],
    difficulty: "Hard",
    description: "High knees, pump arms, max cadence. All-out effort.",
    svgKey: "sprint",
    cues: ["High knees", "Pump arms", "Max cadence"]
  },
  {
    id: 15,
    name: "V-Up",
    category: "core",
    duration: 60,
    reps: "15 reps",
    muscles: ["Full Core", "Hip Flexors"],
    difficulty: "Hard",
    description: "Flat on deck, simultaneously raise legs and torso. Touch feet.",
    svgKey: "vup",
    cues: ["Straight legs", "Touch feet at top", "Control descent"]
  }
];

export const workoutTemplates = [
  {
    id: "alpha",
    name: "ALPHA — Upper Body Assault",
    theme: "upper",
    rest: 20,
    exerciseCategories: ["upper", "upper", "upper", "core", "full"]
  },
  {
    id: "bravo",
    name: "BRAVO — Full Combat Circuit",
    theme: "full",
    rest: 15,
    exerciseCategories: ["full", "upper", "lower", "core", "cardio"]
  },
  {
    id: "charlie",
    name: "CHARLIE — Core & Endurance",
    theme: "core",
    rest: 20,
    exerciseCategories: ["core", "core", "cardio", "full", "core"]
  },
  {
    id: "delta",
    name: "DELTA — Leg Annihilator",
    theme: "lower",
    rest: 20,
    exerciseCategories: ["lower", "lower", "full", "cardio", "lower"]
  }
];

export function generateWorkout() {
  const template = workoutTemplates[Math.floor(Math.random() * workoutTemplates.length)];
  const selected = [];

  template.exerciseCategories.forEach(cat => {
    const pool = exercises.filter(
      e => e.category === cat && !selected.find(s => s.id === e.id)
    );
    if (pool.length > 0) {
      selected.push(pool[Math.floor(Math.random() * pool.length)]);
    } else {
      const fallback = exercises.filter(e => !selected.find(s => s.id === e.id));
      if (fallback.length > 0) {
        selected.push(fallback[Math.floor(Math.random() * fallback.length)]);
      }
    }
  });

  return {
    template,
    exercises: selected,
    totalTime: 15,
    restBetween: template.rest
  };
}
