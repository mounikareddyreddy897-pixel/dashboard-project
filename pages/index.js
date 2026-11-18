import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function demoLogin(event) {
    event.preventDefault();
    if (!email || !password) { setMessage('Enter an email and password to continue.'); return; }
    localStorage.setItem('board-demo-user', email);
    router.push('/dashboard');
  }

  return <>
    <Head><title>Sign in | Board</title><meta name="description" content="Sign in to Board dashboard" /></Head>
    <main className="auth-page">
      <section className="brand-panel"><div className="brand-logo">Board.</div><p className="brand-caption">Your workspace, at a glance.</p></section>
      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-heading"><h1>Sign In</h1><p>Sign in to your account to continue</p></div>
          <button className="google-button" onClick={() => signIn('google', { callbackUrl: '/dashboard' })}><span className="google-g">G</span> Sign in with Google</button>
          <div className="or-divider"><span />or continue with email<span /></div>
          <form onSubmit={demoLogin}>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap"><Mail size={16}/><input id="email" type="email" placeholder="john.doe@gmail.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <label htmlFor="password">Password</label>
            <div className="input-wrap"><LockKeyhole size={16}/><input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} /><button className="eye-button" type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button></div>
            <div className="forgot-row"><a href="#forgot" onClick={e => {e.preventDefault();setMessage('Password reset is not configured in this demo.')}}>Forgot password?</a></div>
            {message && <p className="form-message">{message}</p>}
            <button className="primary-button" type="submit">Sign In</button>
          </form>
          <p className="signup-note">Don't have an account? <a href="#signup" onClick={e => {e.preventDefault();setMessage('Use Google sign-in or enter details for the local demo.')}}>Register here</a></p>
          <p className="demo-note">For preview, enter any email and password. Google sign-in requires credentials in <code>.env.local</code>.</p>
        </div>
      </section>
    </main>
  </>;
}
