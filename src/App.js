import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import WorkoutPreviewPage from './pages/WorkoutPreviewPage';
import WorkoutTimerPage from './pages/WorkoutTimerPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

const SCREENS = { AUTH: 'auth', ONBOARDING: 'onboarding', HOME: 'home', PREVIEW: 'preview', TIMER: 'timer', PROFILE: 'profile' };

function AppInner() {
  const { user, userProfile } = useAuth();
  const [screen, setScreen] = useState(SCREENS.AUTH);
  const [workout, setWorkout] = useState(null);

  React.useEffect(() => {
    if (!user) { setScreen(SCREENS.AUTH); }
    else if (!userProfile?.goal) { setScreen(SCREENS.ONBOARDING); }
    else if (screen === SCREENS.AUTH || screen === SCREENS.ONBOARDING) { setScreen(SCREENS.HOME); }
  }, [user, userProfile, screen]);

  function handleStartWorkout(w) { setWorkout(w); setScreen(SCREENS.PREVIEW); }
  function handleRegenerate() {
    const { generateWorkout } = require('./data/exercises');
    setWorkout(generateWorkout(userProfile?.goal || 'military'));
  }

  if (screen === SCREENS.AUTH) return <AuthPage />;
  if (screen === SCREENS.ONBOARDING) return <OnboardingPage onComplete={() => setScreen(SCREENS.HOME)} />;
  if (screen === SCREENS.HOME) return <HomePage onStartWorkout={handleStartWorkout} onProfile={() => setScreen(SCREENS.PROFILE)} />;
  if (screen === SCREENS.PREVIEW && workout) return <WorkoutPreviewPage workout={workout} onStart={() => setScreen(SCREENS.TIMER)} onRegenerate={handleRegenerate} onBack={() => setScreen(SCREENS.HOME)} />;
  if (screen === SCREENS.TIMER && workout) return <WorkoutTimerPage workout={workout} onComplete={() => { handleRegenerate(); setScreen(SCREENS.PREVIEW); }} onBack={() => setScreen(SCREENS.PREVIEW)} />;
  if (screen === SCREENS.PROFILE) return <ProfilePage onBack={() => setScreen(SCREENS.HOME)} onGoalChange={() => setScreen(SCREENS.ONBOARDING)} />;
  return null;
}

export default function App() {
  return <AuthProvider><AppInner /></AuthProvider>;
}
