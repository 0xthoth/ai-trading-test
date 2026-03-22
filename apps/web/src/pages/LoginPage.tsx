import { useState, type FormEvent } from 'react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'Login failed');
        return;
      }

      localStorage.setItem('token', data.accessToken);
      window.location.href = '/dashboard';
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body text-on-surface selection:bg-primary selection:text-on-primary-fixed overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-[#e1e2eb] font-headline">
            LUME AI
          </span>
        </div>
        <div className="flex gap-4">
          <button className="text-primary transition-colors duration-300 hover:text-white">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="text-primary transition-colors duration-300 hover:text-white">
            <span className="material-symbols-outlined">language</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="glass-panel p-10 rounded-xl border border-outline-variant/10 shadow-2xl relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tertiary/40 to-transparent" />

            {/* Branding */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-4 border border-outline-variant/20">
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </div>
              <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
                Predictive Terminal
              </h1>
              <p className="text-sm font-label text-outline uppercase tracking-[0.15em]">
                Secure Authentication Access
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-3 rounded-md bg-error-container/20 border border-error/20 text-error text-sm text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant/80 ml-1"
                >
                  Terminal ID / Username
                </label>
                <div className="relative input-glow flex items-center bg-surface-container-lowest rounded-md border border-outline-variant/15 transition-all duration-300 focus-within:border-tertiary/40">
                  <span className="material-symbols-outlined absolute left-4 text-outline text-lg">
                    person
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-0 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label
                    htmlFor="password"
                    className="block text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant/80"
                  >
                    Access Key
                  </label>
                  <a
                    href="#"
                    className="text-[0.6875rem] font-label text-tertiary/80 hover:text-tertiary transition-colors uppercase tracking-widest"
                  >
                    Forgot Key?
                  </a>
                </div>
                <div className="relative input-glow flex items-center bg-surface-container-lowest rounded-md border border-outline-variant/15 transition-all duration-300 focus-within:border-tertiary/40">
                  <span className="material-symbols-outlined absolute left-4 text-outline text-lg">
                    lock_open
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-none py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/40 focus:ring-0 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-outline hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-md bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-headline font-bold text-sm tracking-wide shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
                </button>
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-2 pt-2 opacity-40">
                <span className="material-symbols-outlined text-[10px]">verified_user</span>
                <span className="text-[0.625rem] font-label uppercase tracking-tighter">
                  Encrypted by Quantum Core
                </span>
              </div>
            </form>
          </div>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-outline font-body">
              Not registered in the ecosystem?{' '}
              <a
                href="#"
                className="text-primary font-semibold ml-1 hover:underline underline-offset-4 decoration-primary/30"
              >
                Request Credentials
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full px-8 py-6 flex flex-col md:flex-row justify-between items-center bg-transparent pointer-events-none">
        <div className="text-[0.6875rem] uppercase tracking-widest text-[#494456] font-body pointer-events-auto">
          © 2024 Lume AI Predictive Terminal
        </div>
        <div className="flex gap-6 mt-4 md:mt-0 pointer-events-auto">
          <a href="#" className="text-[0.6875rem] uppercase tracking-widest text-[#494456] font-body hover:text-tertiary transition-all">
            Privacy Policy
          </a>
          <a href="#" className="text-[0.6875rem] uppercase tracking-widest text-[#494456] font-body hover:text-tertiary transition-all">
            Terms of Service
          </a>
          <a href="#" className="text-[0.6875rem] uppercase tracking-widest text-[#494456] font-body hover:text-tertiary transition-all">
            Security
          </a>
        </div>
      </footer>

      {/* Decorative elements */}
      <div className="fixed top-[20%] right-[-5%] w-96 h-96 bg-tertiary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] border border-outline-variant/5 rounded-full pointer-events-none" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[20vw] h-[20vw] border border-outline-variant/10 rounded-full pointer-events-none" />
    </div>
  );
}
