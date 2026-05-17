import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { theme } from '../data/theme';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    try {
      if (mode === 'register') {
        if (!name.trim()) { setError('Introduz o teu nome.'); setLoading(false); return; }
        await register(email, password, name);
        setInfo('Conta criada! Verifica o teu email para confirmar, depois entra.');
      } else {
        await login(email, password);
      }
    } catch (err) {
      const msgs = {
        'User already registered': 'Este email já está registado.',
        'Invalid login credentials': 'Email ou password incorretos.',
        'Email not confirmed': 'Confirma o teu email antes de entrar.',
        'Password should be at least 6 characters': 'A password deve ter mínimo 6 caracteres.',
      };
      setError(msgs[err.message] || err.message || 'Ocorreu um erro. Tenta novamente.');
    }
    setLoading(false);
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>
          <div style={s.logoIcon}>MC</div>
          <div>
            <div style={s.logoTitle}>MilCal</div>
            <div style={s.logoSub}>Military Calisthenics</div>
          </div>
        </div>
        <h2 style={s.heading}>{mode === 'login' ? 'Bem-vindo de volta' : 'Cria a tua conta'}</h2>
        <p style={s.sub}>{mode === 'login' ? 'Entra para continuar os teus treinos' : 'Junta-te e começa hoje'}</p>
        <form onSubmit={handleSubmit} style={s.form}>
          {mode === 'register' && (
            <div style={s.field}>
              <label style={s.label}>Nome</label>
              <input style={s.input} type="text" placeholder="O teu nome" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input style={s.input} type="email" placeholder="email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div style={s.error}>{error}</div>}
          {info && <div style={s.infoBox}>{info}</div>}
          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} type="submit" disabled={loading}>
            {loading ? 'A processar...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>
        <div style={s.switch}>
          {mode === 'login' ? (
            <>Não tens conta?{' '}<button style={s.link} onClick={() => { setMode('register'); setError(''); setInfo(''); }}>Registar</button></>
          ) : (
            <>Já tens conta?{' '}<button style={s.link} onClick={() => { setMode('login'); setError(''); setInfo(''); }}>Entrar</button></>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: theme.colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: theme.font.sans },
  card: { background: '#fff', borderRadius: theme.radius.xl, padding: '2.5rem 2rem', width: '100%', maxWidth: '400px', boxShadow: theme.shadow.lg, border: `1px solid ${theme.colors.border}` },
  logo: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' },
  logoIcon: { width: '48px', height: '48px', borderRadius: theme.radius.md, background: theme.colors.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800' },
  logoTitle: { fontSize: '20px', fontWeight: '800', color: theme.colors.text, lineHeight: 1 },
  logoSub: { fontSize: '12px', color: theme.colors.textMuted, marginTop: '2px' },
  heading: { fontSize: '22px', fontWeight: '700', color: theme.colors.text, margin: '0 0 4px' },
  sub: { fontSize: '14px', color: theme.colors.textSecondary, margin: '0 0 1.5rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: theme.colors.text },
  input: { padding: '0.75rem 1rem', borderRadius: theme.radius.md, border: `1.5px solid ${theme.colors.border}`, fontSize: '15px', color: theme.colors.text, fontFamily: theme.font.sans },
  error: { background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: theme.radius.sm, padding: '0.75rem 1rem', fontSize: '13px', color: theme.colors.danger },
  infoBox: { background: theme.colors.primaryBg, border: `1px solid ${theme.colors.primaryLight}`, borderRadius: theme.radius.sm, padding: '0.75rem 1rem', fontSize: '13px', color: theme.colors.primary },
  btn: { background: theme.colors.primary, color: '#fff', border: 'none', borderRadius: theme.radius.md, padding: '0.9rem', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans, marginTop: '0.5rem' },
  switch: { textAlign: 'center', marginTop: '1.5rem', fontSize: '14px', color: theme.colors.textSecondary },
  link: { background: 'none', border: 'none', color: theme.colors.primary, fontWeight: '600', cursor: 'pointer', fontSize: '14px', fontFamily: theme.font.sans },
};
