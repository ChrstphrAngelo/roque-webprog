import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
const passwordInputClasses = `${inputClasses} pr-10`;
const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validateEmail = (email) => /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthText = (score) => ['', 'Weak', 'Medium', 'Strong'][score] ?? '';
  const strengthColor = (score) =>
    score === 1 ? 'bg-red-500' : score === 2 ? 'bg-yellow-500' : score >= 3 ? 'bg-green-600' : 'bg-zinc-200';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.age.trim()) newErrors.age = 'Age is required';
    else if (!/^\d+$/.test(form.age.trim())) newErrors.age = 'Age must be a number';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!form.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    else if (!/^\d{11}$/.test(form.contactNumber.trim())) newErrors.contactNumber = 'Must be exactly 11 digits';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.username.trim()) newErrors.username = 'Username is required';
    else if (/\s/.test(form.username)) newErrors.username = 'Username must not contain spaces';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!form.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      await createUser({ ...form, type: 'viewer' });
      navigate('/auth/signin');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const strength = getPasswordStrength(form.password);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create your account to get started.
      </p>

      {apiError && <p className="mt-4 text-sm text-red-600">{apiError}</p>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">First Name</label>
            <input type="text" placeholder="John" value={form.firstName} onChange={set('firstName')} className={inputClasses} />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Last Name</label>
            <input type="text" placeholder="Doe" value={form.lastName} onChange={set('lastName')} className={inputClasses} />
            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        {/* Age & Gender */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">Age</label>
            <input type="text" placeholder="21" value={form.age} onChange={set('age')} className={inputClasses} />
            {errors.age && <p className="mt-1 text-xs text-red-600">{errors.age}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Gender</label>
            <select value={form.gender} onChange={set('gender')} className={inputClasses}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
          </div>
        </div>

        {/* Contact & Username */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">Contact Number</label>
            <input type="text" placeholder="09XXXXXXXXX" value={form.contactNumber} onChange={set('contactNumber')} className={inputClasses} />
            {errors.contactNumber && <p className="mt-1 text-xs text-red-600">{errors.contactNumber}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Username</label>
            <input type="text" placeholder="johndoe" value={form.username} onChange={set('username')} className={inputClasses} />
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input type="email" placeholder="hello@example.com" value={form.email} onChange={set('email')} className={inputClasses} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Address</label>
          <input type="text" placeholder="123 Main St, City" value={form.address} onChange={set('address')} className={inputClasses} />
          {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              value={form.password}
              onChange={set('password')}
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
          {form.password && (
            <div className="mt-2">
              <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
                <div className={`transition-all duration-200 ${strengthColor(strength)}`} style={{ width: `${(strength / 3) * 100}%` }} />
              </div>
              <p className="mt-1 text-xs font-medium text-zinc-600">
                Strength: <span className="capitalize">{strengthText(strength)}</span>
              </p>
            </div>
          )}
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-blue-600">
          Log in
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
