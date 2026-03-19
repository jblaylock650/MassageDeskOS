import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Signup form state
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!email.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setLoginError('Please enter your password.');
      return;
    }
    setIsLoggingIn(true);
    
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setLoginError(error.message || 'Invalid email or password.');
      } else {
        navigate('/feed');
      }
    } catch (err) {
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setLoginError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setLoginError(err.message || 'Failed to sign in with Google.');
      setIsGoogleLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupFirstName.trim() || !signupLastName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim()) {
      setSignupError('Please enter your email address.');
      return;
    }
    if (!signupPassword.trim() || signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const fullName = `${signupFirstName} ${signupLastName}`;
      const { error } = await signUpWithEmail(signupEmail, signupPassword, fullName);
      
      if (error) {
        setSignupError(error.message || 'Failed to create account.');
      } else {
        setShowSignupModal(false);
        navigate('/feed');
      }
    } catch (err) {
      setSignupError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50 flex flex-col font-sans">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Branding */}
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="ri-hand-heart-line text-white text-2xl"></i>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  <span className="text-gray-900">TheraLink</span><span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">Network</span>
                </h1>
              </div>
              <h2 className="text-2xl lg:text-3xl font-medium text-gray-700 leading-relaxed mb-6">
                The professional networking platform for massage therapists. Connect, learn, and thrive together.
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  to="/products/massagedeskos"
                  className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
                >
                  Explore MassageDeskOS
                </Link>
                <a
                  href="/massagedeskos/"
                  className="rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-500"
                >
                  Open Hosted PWA
                </a>
              </div>
              <div className="hidden lg:flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-group-line text-teal-600 text-lg"></i>
                  </div>
                  <p className="text-gray-600 text-sm">Connect with licensed massage therapists across the US</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-community-line text-amber-600 text-lg"></i>
                  </div>
                  <p className="text-gray-600 text-sm">Build meaningful professional relationships and grow your network</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-award-line text-rose-500 text-lg"></i>
                  </div>
                  <p className="text-gray-600 text-sm">Discover CE workshops and grow your expertise</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-heart-pulse-line text-emerald-500 text-lg"></i>
                  </div>
                  <p className="text-gray-600 text-sm">Join communities, share knowledge, and support each other</p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/60 p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h3>
                <p className="text-gray-500 text-sm mb-6">Sign in to connect with your community</p>

                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl px-4 py-3 font-medium text-gray-700 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isGoogleLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-teal-500 rounded-full animate-spin"></div>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  <span>{isGoogleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Email Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                      <i className="ri-error-warning-line"></i>
                      {loginError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setLoginError(''); }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <Link to="/recover" className="text-teal-500 hover:text-teal-600 text-xs font-medium cursor-pointer">Forgot?</Link>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer w-6 h-6 flex items-center justify-center"
                      >
                        <i className={`ri-eye${showPassword ? '-off' : ''}-line text-lg`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${rememberMe ? 'bg-teal-500 border-teal-500' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      {rememberMe && <i className="ri-check-line text-white text-xs"></i>}
                    </button>
                    <span className="text-sm text-gray-600">Remember me for 30 days</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-teal-200/50 hover:shadow-teal-300/50 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoggingIn ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </span>
                    ) : (
                      'Sign in to TheraLinkNetwork'
                    )}
                  </button>
                </form>

                {/* Sign Up Prompt */}
                <p className="text-center text-sm text-gray-500 mt-6">
                  New to TheraLinkNetwork?{' '}
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="text-teal-500 hover:text-teal-600 font-semibold cursor-pointer hover:underline"
                  >
                    Create your account
                  </button>
                </p>
              </div>

              {/* Footer Links */}
              <div className="flex items-center gap-4 mt-6 text-xs text-gray-400">
                <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Privacy Policy</a>
                <span>|</span>
                <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Terms of Service</a>
                <span>|</span>
                <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Help Center</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-teal-50/50 border-t border-teal-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 mb-3 justify-center">
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">About</a>
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Careers</a>
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">For Therapists</a>
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Privacy</a>
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Terms</a>
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Help</a>
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">CE Resources</a>
            <a href="#" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Community Guidelines</a>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>TheraLinkNetwork &copy; 2025 - The Professional Network for Massage Therapists</span>
            <span>&middot;</span>
            <a href="https://readdy.ai/?ref=logo" rel="nofollow" className="hover:text-teal-500 cursor-pointer">Powered by Readdy</a>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-[fadeIn_0.2s_ease-out] max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <button
                onClick={() => setShowSignupModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Join TheraLinkNetwork</h2>
              <p className="text-gray-500 text-sm mt-1">Connect with massage therapists nationwide</p>
            </div>

            <form onSubmit={handleSignup} className="p-6 space-y-3">
              {signupError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <i className="ri-error-warning-line"></i>
                  {signupError}
                </div>
              )}

              {/* Google Signup */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl px-4 py-3 font-medium text-gray-700 transition-all duration-200 cursor-pointer text-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.10z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign up with Google</span>
              </button>

              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 font-medium">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                  className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />

              <input
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />

              <p className="text-xs text-gray-500 leading-relaxed">
                By clicking Sign Up, you agree to our{' '}
                <a href="#" className="text-teal-500 hover:underline cursor-pointer">Terms</a>,{' '}
                <a href="#" className="text-teal-500 hover:underline cursor-pointer">Privacy Policy</a> and{' '}
                <a href="#" className="text-teal-500 hover:underline cursor-pointer">Community Guidelines</a>.
              </p>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-teal-200/50 whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
