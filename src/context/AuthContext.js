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

  // Register with email + password
  async function register(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    return data;
  }

  // Login
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  // Logout
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setUserProfile(null);
  }

  // Save/update profile in Supabase
  async function saveProfile(uid, data) {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: uid, ...data }, { onConflict: 'id' });
    if (error) throw error;
    setUserProfile(data);
  }

  // Fetch profile from Supabase
  async function fetchProfile(uid) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    if (data) setUserProfile(data);
    return data;
  }

  // Increment workout stats
  async function incrementWorkoutStats(uid) {
    const { data: current } = await supabase
      .from('profiles')
      .select('workouts_completed, total_minutes')
      .eq('id', uid)
      .single();

    if (current) {
      const updated = {
        workouts_completed: (current.workouts_completed || 0) + 1,
        total_minutes: (current.total_minutes || 0) + 15,
      };
      await supabase.from('profiles').update(updated).eq('id', uid);
      setUserProfile(prev => ({ ...prev, ...updated }));
    }
  }

  // Listen to auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id).finally(() => setLoading(false));
      else setLoading(false);
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
    user,
    userProfile,
    loading,
    register,
    login,
    logout,
    saveProfile,
    fetchProfile,
    incrementWorkoutStats,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
