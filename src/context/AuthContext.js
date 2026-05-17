import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/client';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function register(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    return data;
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  }

  async function saveProfile(uid, data) {
    // Try insert first, then update if already exists
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: uid, ...data });

    if (insertError && insertError.code === '23505') {
      // Already exists, update instead
      const { error: updateError } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', uid);
      if (updateError) throw updateError;
    } else if (insertError) {
      throw insertError;
    }

    setUserProfile(data);
  }

  async function fetchProfile(uid) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle(); // usar maybeSingle em vez de single - não dá erro se não encontrar

    if (error) {
      console.error('fetchProfile error:', error);
      return null;
    }
    if (data) setUserProfile(data);
    return data;
  }

  async function incrementWorkoutStats(uid) {
    const { data: current } = await supabase
      .from('profiles')
      .select('workouts_completed, total_minutes')
      .eq('id', uid)
      .maybeSingle();

    if (current) {
      const updated = {
        workouts_completed: (current.workouts_completed || 0) + 1,
        total_minutes: (current.total_minutes || 0) + 15,
      };
      await supabase.from('profiles').update(updated).eq('id', uid);
      setUserProfile(prev => ({ ...prev, ...updated }));
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        fetchProfile(u.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id);
      else setUserProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = {
    user, userProfile, loading,
    register, login, logout,
    saveProfile, fetchProfile, incrementWorkoutStats,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
