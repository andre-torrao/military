import React, { useState, useEffect } from 'react';
import { theme } from '../data/theme';
import { supabase } from '../supabase/client';
import { useAuth } from '../context/AuthContext';

export default function StatsPage() {
  const { user, userProfile } = useAuth();
  const [weekData, setWeekData] = useState([]);
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  useEffect(() => {
    async function fetchWeek() {
      const now = new Date();
      const monday = new Date(now);
      monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
      monday.setHours(0, 0, 0, 0);

      const { data } = await supabase
        .from('workout_logs')
        .select('completed_at')
        .eq('user_id', user.id)
        .gte('completed_at', monday.toISOString());

      if (data) {
        const trained = data.map(d => (new Date(d.completed_at).getDay() + 6) % 7);
        setWeekData([...new Set(trained)]);
      }
    }
    if (user) fetchWeek();
  }, [user]);

  const todayIdx = (new Date().getDay() + 6) % 7;
  const totalWorkouts = userProfile?.workouts_completed || 0;
  const totalMinutes = userProfile?.total_minutes || 0;
  const daysGoal = userProfile?.days_per_week || 3;
  const weekDone = weekData.length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.headerTitle}>A minha atividade</div>
      </div>

      {/* Date strip */}
      <div style={s.dateStrip}>
        {days.map((d, i) => {
          const isToday = i === todayIdx;
          const trained = weekData.includes(i);
          return (
            <div key={d} style={s.dateCol}>
              <div style={s.dateName}>{d}</div>
              <div style={{
                ...s.dateCircle,
                background: trained ? theme.colors.primary : isToday ? theme.colors.primaryBg : '#fff',
                border: isToday ? `2px solid ${theme.colors.primary}` : '2px solid #EFEFEF',
                color: trained ? '#fff' : isToday ? theme.colors.primary : theme.colors.textMuted,
                fontWeight: isToday || trained ? '700' : '400',
              }}>
                {trained ? '✓' : i + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly progress */}
      <div style={s.weekCard}>
        <div style={s.weekHeader}>
          <div>
            <div style={s.weekTitle}>Esta semana</div>
            <div style={s.weekSub}>{weekDone} de {daysGoal} treinos</div>
          </div>
          <div style={s.weekPct}>{Math.round((weekDone / Math.max(daysGoal,1)) * 100)}%</div>
        </div>
        <div style={s.weekBar}>
          <div style={{ ...s.weekBarFill, width: `${Math.min(100, Math.round((weekDone / Math.max(daysGoal,1)) * 100))}%` }} />
        </div>
      </div>

      {/* Stats cards */}
      <div style={s.statsGrid}>
        <div style={s.bigStatCard}>
          <div style={s.bigStatLabel}>Total de treinos</div>
          <div style={s.bigStatVal}>{totalWorkouts}</div>
          <div style={s.bigStatSub}>desde o inicio</div>
        </div>
        <div style={s.bigStatCard}>
          <div style={s.bigStatLabel}>Minutos totais</div>
          <div style={s.bigStatVal}>{totalMinutes}</div>
          <div style={s.bigStatSub}>tempo treinado</div>
        </div>
      </div>

      {/* Bar chart - last 7 days activity */}
      <div style={s.chartCard}>
        <div style={s.chartTitle}>Atividade semanal</div>
        <div style={s.chart}>
          {days.map((d, i) => {
            const trained = weekData.includes(i);
            const isToday = i === todayIdx;
            const height = trained ? 80 + Math.random() * 40 : 20 + Math.random() * 20;
            return (
              <div key={d} style={s.barCol}>
                <div style={{ ...s.bar, height: `${height}px`, background: trained ? theme.colors.primary : '#EFEFEF', opacity: isToday && !trained ? 0.5 : 1 }} />
                <div style={{ ...s.barLabel, color: isToday ? theme.colors.primary : theme.colors.textMuted, fontWeight: isToday ? '700' : '400' }}>{d}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Conquistas</div>
        <div style={s.achGrid}>
          {[
            { label: 'Primeiro Treino', done: totalWorkouts >= 1, desc: 'Completaste o teu primeiro treino' },
            { label: '5 Treinos',       done: totalWorkouts >= 5,  desc: 'Completaste 5 treinos' },
            { label: '10 Treinos',      done: totalWorkouts >= 10, desc: 'Completaste 10 treinos' },
            { label: '1 Hora',          done: totalMinutes >= 60,  desc: '60 minutos de treino' },
          ].map(a => (
            <div key={a.label} style={{ ...s.achCard, opacity: a.done ? 1 : 0.45 }}>
              <div style={{ ...s.achIcon, background: a.done ? theme.colors.primaryBg : '#F5F5F5' }}>
                {a.done ? '★' : '○'}
              </div>
              <div style={s.achLabel}>{a.label}</div>
              <div style={s.achDesc}>{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '90px', minHeight: '100vh' },
  header: { padding: '3rem 1.5rem 1.25rem' },
  headerTitle: { fontSize: '28px', fontWeight: '900', color: theme.colors.text },
  dateStrip: { display: 'flex', justifyContent: 'space-between', padding: '0 1.5rem', marginBottom: '1.5rem' },
  dateCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  dateName: { fontSize: '11px', color: theme.colors.textMuted, fontWeight: '500' },
  dateCircle: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', transition: 'all 0.2s' },
  weekCard: { margin: '0 1.5rem 1.25rem', background: '#fff', borderRadius: theme.radius.lg, padding: '1.25rem', boxShadow: theme.shadow.sm },
  weekHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
  weekTitle: { fontSize: '16px', fontWeight: '800', color: theme.colors.text },
  weekSub: { fontSize: '12px', color: theme.colors.textMuted, marginTop: '2px' },
  weekPct: { fontSize: '28px', fontWeight: '900', color: theme.colors.primary },
  weekBar: { height: '8px', background: '#EFEFEF', borderRadius: '99px', overflow: 'hidden' },
  weekBarFill: { height: '100%', background: theme.colors.primary, borderRadius: '99px', transition: 'width 0.5s ease' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '0 1.5rem 1.25rem' },
  bigStatCard: { background: '#fff', borderRadius: theme.radius.lg, padding: '1.25rem', boxShadow: theme.shadow.sm },
  bigStatLabel: { fontSize: '12px', color: theme.colors.textMuted, fontWeight: '500', marginBottom: '6px' },
  bigStatVal: { fontSize: '36px', fontWeight: '900', color: theme.colors.primary, lineHeight: 1 },
  bigStatSub: { fontSize: '11px', color: theme.colors.textMuted, marginTop: '4px' },
  chartCard: { margin: '0 1.5rem 1.5rem', background: '#fff', borderRadius: theme.radius.lg, padding: '1.25rem', boxShadow: theme.shadow.sm },
  chartTitle: { fontSize: '16px', fontWeight: '800', color: theme.colors.text, marginBottom: '1.25rem' },
  chart: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '130px', gap: '8px' },
  barCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '6px', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: '6px 6px 0 0', transition: 'height 0.5s ease', minHeight: '8px' },
  barLabel: { fontSize: '10px' },
  section: { padding: '0 1.5rem' },
  sectionTitle: { fontSize: '18px', fontWeight: '800', color: theme.colors.text, marginBottom: '1rem' },
  achGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  achCard: { background: '#fff', borderRadius: theme.radius.lg, padding: '1rem', boxShadow: theme.shadow.sm, textAlign: 'center' },
  achIcon: { width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: theme.colors.primary, margin: '0 auto 8px' },
  achLabel: { fontSize: '13px', fontWeight: '700', color: theme.colors.text, marginBottom: '3px' },
  achDesc: { fontSize: '11px', color: theme.colors.textMuted, lineHeight: '1.4' },
};
