export const exercises = [
  {
    id: 'pushup', name: 'Flexões', category: 'upper', muscles: ['Peito', 'Tríceps', 'Ombros'],
    difficulty: 'Básico', reps: '15–20 reps', duration: 50,
    description: 'Mãos à largura dos ombros, corpo reto, desça até ao peito quase tocar no chão.',
    cues: ['Corpo em linha reta', 'Cotovelos a 45°', 'Amplitude total'],
    goals: ['strength', 'military', 'fat_loss'],
  },
  {
    id: 'squat', name: 'Agachamento', category: 'lower', muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
    difficulty: 'Básico', reps: '20–25 reps', duration: 50,
    description: 'Pés à largura dos ombros, desça até às coxas paralelas ao chão, sobe com força.',
    cues: ['Joelhos sobre os pés', 'Costas direitas', 'Desça abaixo do paralelo'],
    goals: ['strength', 'fat_loss', 'military', 'endurance'],
  },
  {
    id: 'burpee', name: 'Burpee', category: 'full', muscles: ['Corpo Inteiro', 'Cardio'],
    difficulty: 'Difícil', reps: '10–15 reps', duration: 60,
    description: 'Agacha, mãos no chão, salta para prancha, faz flexão, salta com braços no ar.',
    cues: ['Salto explosivo', 'Flexão completa', 'Sem pausas'],
    goals: ['fat_loss', 'endurance', 'military'],
  },
  {
    id: 'plank', name: 'Prancha', category: 'core', muscles: ['Core', 'Ombros', 'Glúteos'],
    difficulty: 'Médio', reps: '45–60 seg', duration: 55,
    description: 'Antebraços no chão, corpo reto como uma tábua. Contrai o abdómen e os glúteos.',
    cues: ['Aperta o abdómen', 'Coluna neutra', 'Respira ritmado'],
    goals: ['strength', 'mobility', 'military', 'fat_loss'],
  },
  {
    id: 'lunge', name: 'Avanço', category: 'lower', muscles: ['Quadríceps', 'Glúteos', 'Equilíbrio'],
    difficulty: 'Básico', reps: '12–15 por perna', duration: 50,
    description: 'Passo largo à frente, joelho traseiro quase no chão, volta à posição inicial.',
    cues: ['Joelho sobre o pé', 'Tronco ereto', 'Empurra pelo calcanhar'],
    goals: ['strength', 'mobility', 'fat_loss'],
  },
  {
    id: 'mountainclimber', name: 'Mountain Climber', category: 'core', muscles: ['Core', 'Cardio', 'Ombros'],
    difficulty: 'Médio', reps: '20 por lado', duration: 45,
    description: 'Posição de prancha alta, alterna joelhos ao peito em ritmo rápido.',
    cues: ['Ancas niveladas', 'Ritmo alto', 'Braços bloqueados'],
    goals: ['fat_loss', 'endurance', 'military'],
  },
  {
    id: 'pullup', name: 'Barra Fixa', category: 'upper', muscles: ['Costas', 'Bíceps', 'Core'],
    difficulty: 'Difícil', reps: '6–10 reps', duration: 60,
    description: 'Suspende com braços estendidos, puxa até o queixo passar a barra.',
    cues: ['Pendurado morto', 'Queixo sobre a barra', 'Desça controlado'],
    goals: ['strength', 'military'],
  },
  {
    id: 'jumpingsquat', name: 'Agachamento com Salto', category: 'lower', muscles: ['Quadríceps', 'Glúteos', 'Explosão'],
    difficulty: 'Difícil', reps: '15–20 reps', duration: 45,
    description: 'Agacha fundo e explode para cima com salto. Aterra suavemente.',
    cues: ['Agachamento fundo', 'Máxima altura', 'Aterra suave'],
    goals: ['fat_loss', 'endurance', 'military'],
  },
  {
    id: 'dip', name: 'Dips', category: 'upper', muscles: ['Tríceps', 'Peito', 'Ombros'],
    difficulty: 'Médio', reps: '12–15 reps', duration: 50,
    description: 'Barras paralelas, cotovelos para trás, desça controlado, sobe até ao bloqueio.',
    cues: ['Cotovelos para trás', 'Tronco ereto', 'Bloqueio no topo'],
    goals: ['strength', 'military'],
  },
  {
    id: 'hikneerun', name: 'Corrida com Joelhos Altos', category: 'cardio', muscles: ['Pernas', 'Cardio', 'Coordenação'],
    difficulty: 'Médio', reps: '30 seg máx', duration: 35,
    description: 'Corre no lugar levantando os joelhos à altura da anca, bombeando os braços.',
    cues: ['Joelhos à anca', 'Bombeia os braços', 'Máximo ritmo'],
    goals: ['fat_loss', 'endurance', 'military'],
  },
  {
    id: 'flutterkick', name: 'Flutter Kick', category: 'core', muscles: ['Abdómen Inferior', 'Flexores da Anca'],
    difficulty: 'Médio', reps: '30 reps', duration: 45,
    description: 'Deitado, costas no chão, pernas a 15cm do chão, alterna pernas em batimento.',
    cues: ['Costas planas', '15cm do chão', 'Bicos dos pés'],
    goals: ['military', 'fat_loss', 'endurance'],
  },
  {
    id: 'vup', name: 'V-Up', category: 'core', muscles: ['Core Completo', 'Flexores da Anca'],
    difficulty: 'Difícil', reps: '12–15 reps', duration: 50,
    description: 'Deitado, eleva pernas e tronco simultaneamente, toca nos pés no topo.',
    cues: ['Pernas esticadas', 'Toca nos pés', 'Desça controlado'],
    goals: ['strength', 'military', 'fat_loss'],
  },
  {
    id: 'worldsgreateststretch', name: 'World\'s Greatest Stretch', category: 'mobility', muscles: ['Ancas', 'Coluna', 'Isquiotibiais'],
    difficulty: 'Básico', reps: '5 por lado', duration: 50,
    description: 'Passo largo, mão ao lado do pé, cotovelo ao chão, roda tronco para cima.',
    cues: ['Ancas baixas', 'Cotovelo ao chão', 'Roda devagar'],
    goals: ['mobility', 'endurance'],
  },
  {
    id: 'inchworm', name: 'Inchworm', category: 'mobility', muscles: ['Isquiotibiais', 'Core', 'Ombros'],
    difficulty: 'Básico', reps: '8–10 reps', duration: 50,
    description: 'Dobra-te, anda com as mãos até prancha, volta a andar com os pés até às mãos.',
    cues: ['Pernas esticadas', 'Core ativo', 'Movimento fluido'],
    goals: ['mobility', 'fat_loss'],
  },
  {
    id: 'bearcrunch', name: 'Bear Crunch', category: 'core', muscles: ['Core', 'Coordenação'],
    difficulty: 'Médio', reps: '12 por lado', duration: 45,
    description: 'Posição de urso (joelhos 5cm do chão), traz joelho ao cotovelo oposto.',
    cues: ['Joelhos baixos', 'Membros opostos', 'Ancas estáveis'],
    goals: ['military', 'strength', 'mobility'],
  },
];

const goalWorkoutConfig = {
  fat_loss: {
    name: 'Queima Máxima',
    focus: 'Circuito HIIT — Alta intensidade, descanso mínimo',
    categories: ['full', 'lower', 'cardio', 'core', 'upper'],
    preferredGoals: ['fat_loss', 'endurance'],
    rest: 15,
    color: '#EF4444',
  },
  strength: {
    name: 'Força Funcional',
    focus: 'Força — Exercícios compostos, amplitude total',
    categories: ['upper', 'lower', 'core', 'upper', 'lower'],
    preferredGoals: ['strength', 'military'],
    rest: 25,
    color: '#7C3AED',
  },
  endurance: {
    name: 'Resistência Total',
    focus: 'Cardio — Circuito contínuo, ritmo sustentado',
    categories: ['cardio', 'full', 'core', 'lower', 'cardio'],
    preferredGoals: ['endurance', 'fat_loss'],
    rest: 15,
    color: '#059669',
  },
  military: {
    name: 'Protocolo Militar',
    focus: 'Militar — Treino completo de forças especiais',
    categories: ['upper', 'full', 'core', 'lower', 'cardio'],
    preferredGoals: ['military', 'strength'],
    rest: 20,
    color: '#1D4ED8',
  },
  mobility: {
    name: 'Força & Mobilidade',
    focus: 'Mobilidade — Força com amplitude de movimento',
    categories: ['mobility', 'lower', 'core', 'mobility', 'upper'],
    preferredGoals: ['mobility', 'endurance'],
    rest: 20,
    color: '#0891B2',
  },
};

export function generateWorkout(goalId = 'military') {
  const config = goalWorkoutConfig[goalId] || goalWorkoutConfig.military;
  const selected = [];

  config.categories.forEach(cat => {
    // Try to pick from preferred goals + category
    let pool = exercises.filter(e =>
      e.category === cat &&
      e.goals.some(g => config.preferredGoals.includes(g)) &&
      !selected.find(s => s.id === e.id)
    );
    // Fallback to just category
    if (!pool.length) {
      pool = exercises.filter(e =>
        e.category === cat && !selected.find(s => s.id === e.id)
      );
    }
    // Fallback to any not yet selected
    if (!pool.length) {
      pool = exercises.filter(e => !selected.find(s => s.id === e.id));
    }
    if (pool.length) {
      selected.push(pool[Math.floor(Math.random() * pool.length)]);
    }
  });

  return {
    id: Date.now().toString(),
    goalId,
    config,
    exercises: selected,
    totalTime: 15,
    rest: config.rest,
    createdAt: new Date().toISOString(),
  };
}
