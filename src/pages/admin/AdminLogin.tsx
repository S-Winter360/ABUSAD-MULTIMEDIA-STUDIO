import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const [error, setError] = useState(location.state?.message || '');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear state message on mount so it doesn't persist on refresh
    if (location.state?.message) {
      window.history.replaceState({}, document.title);
    } else {
      // Since we don't know the user's setup, just log out if auto-login is happening
      const checkAuth = async () => {
        if (auth.currentUser) {
          navigate('/admin/dashboard');
        }
      };
      checkAuth();
    }
  }, [location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Force a small delay to ensure session is saved
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Auto-create account if it doesn't exist
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email.trim(), password);
          await new Promise(resolve => setTimeout(resolve, 500));
          navigate('/admin/dashboard');
          return;
        } catch (signupErr: any) {
          console.error('Signup error fallback:', signupErr);
        }
      }
      
      if (err.code === 'auth/network-request-failed') {
        setError('Network error: Browsers often block login in iframes. Please click the "Pop-out" icon (square with arrow) at the top right of this preview to open the app in a new tab.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg('Password reset link sent! Please check your email inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 bg-[url('https://i.pinimg.com/1200x/72/5d/08/725d0894c7b1d20fd2182b7b00a39063.jpg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm z-0"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <img src="/logo%20p.png" alt="AbuSad Logo" className="h-16 mx-auto mb-6 object-contain" />
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Secure access to multimedia management</p>
        </div>

        <div className="bg-[#050806] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-neon/20 rounded-full blur-[60px]"></div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm leading-relaxed">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-sm leading-relaxed">
              {successMsg}
            </div>
          )}

          <form onSubmit={resetMode ? handleResetPassword : handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-neon rounded-xl py-3 pl-12 pr-4 text-white outline-none transition-colors"
                  placeholder="admin@abusad.com"
                  required
                />
              </div>
            </div>

            {!resetMode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setResetMode(true)}
                    className="text-xs text-brand-neon hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-brand-neon rounded-xl py-3 pl-12 pr-4 text-white outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-neon hover:bg-brand-neon/90 text-brand-dark font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {resetMode ? 'Send Reset Link' : 'Secure Login'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            
            {resetMode && (
              <button 
                type="button" 
                onClick={() => {
                  setResetMode(false);
                  setError('');
                  setSuccessMsg('');
                }}
                className="w-full pb-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Back to Login
              </button>
            )}
          </form>
        </div>
        
        <div className="text-center mt-8">
          <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            ← Return to Website
          </a>
        </div>
      </div>
    </div>
  );
}
