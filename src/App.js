import React, { useState } from 'react'; 
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutPreviewPage from './pages/WorkoutPreviewPage';
import WorkoutTimerPage from './pages/WorkoutTimerPage';
import ProfilePage from './pages/ProfilePage';
import StatsPage from './pages/StatsPage';
import NavBar from './components/NavBar';
import './App.css';

function AppInner() {
  const { user, userProfile } = useAuth();
  const [screen, setScreen] = useState('auth');
  const [activeTab, setActiveTab] = useState('home');
  const [workout, setWorkout] = useState(null);

  React.useEffect(() => {
    if (!user) { setScreen('auth'); }
    else if (!userProfile?.goal) { setScreen('onboarding'); }
    else if (screen === 'auth' || screen === 'onboarding') { setScreen('main'); }
  }, [user, userProfile, screen]);

  function handleStartWorkout(w) { setWorkout(w); setScreen('preview'); }
  function handleRegenerate() {
    const { generateWorkout } = require('./data/exercises');
    setWorkout(generateWorkout(userProfile?.goal || 'military'));
  }

  const showNav = screen === 'main';

  if (screen === 'auth') return <AuthPage />;
  if (screen === 'onboarding') return <OnboardingPage onComplete={() => setScreen('main')} />;

  if (screen === 'preview' && workout) return (
    <WorkoutPreviewPage workout={workout} onStart={() => setScreen('timer')}
      onRegenerate={handleRegenerate} onBack={() => setScreen('main')} />
  );
  if (screen === 'timer' && workout) return (
    <WorkoutTimerPage workout={workout}
      onComplete={() => { handleRegenerate(); setScreen('preview'); }}
      onBack={() => setScreen('preview')} />
  );

  return (
    <div>
      {activeTab === 'home'    && <HomePage onStartWorkout={handleStartWorkout} />}
      {activeTab === 'workout' && <WorkoutPage onStartWorkout={handleStartWorkout} />}
      {activeTab === 'stats'   && <StatsPage />}
      {activeTab === 'profile' && <ProfilePage onGoalChange={() => setScreen('onboarding')} />}
      {showNav && <NavBar active={activeTab} onChange={setActiveTab} />}
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppInner /></AuthProvider>;
}
