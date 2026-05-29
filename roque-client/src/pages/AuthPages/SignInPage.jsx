import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
const passwordInputClasses = `${inputClasses} pr-10`;
const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const { data } = await loginUser({ email, password });
        if (data.type === 'viewer') {
          setApiError('Viewers are not allowed to log in to the dashboard.');
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('type', data.type);
        navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
      } catch (err) {
        setApiError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Log In
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Access your account using the same monochrome wireframe language used across the site.
      </p>

      {apiError && <p className="mt-4 text-sm text-red-600">{apiError}</p>}
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <div className="relative">
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordInputClasses}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-zinc-900"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Must be at least 8 characters with letters, numbers, and symbols.
          </p>
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => alert('Password reset link would be sent (demo)')}
            className="font-medium text-zinc-700 transition hover:text-blue-600"
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Log in
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
            onClick={() => console.log('Google sign in demo')}
          >
            Log in with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
            onClick={() => console.log('Apple sign in demo')}
          >
            Log in with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        No account yet?{' '}
        <Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-blue-600">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;