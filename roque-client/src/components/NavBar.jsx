import { NavLink } from 'react-router-dom';
import Button from './Button';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-xl border px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition duration-200',
    isActive
      ? 'border-blue-600 bg-blue-600 text-white'
      : 'border-transparent text-zinc-500 hover:border-blue-600 hover:bg-blue-600 hover:text-white',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between pr-4 py-4 sm:pr-6 lg:pr-8 md:grid md:grid-cols-3 md:justify-items-stretch md:gap-0 pl-4 sm:pl-6 lg:pl-8">
        <div className="justify-self-start">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/CAR-logo.svg" alt="Logo" className="h-8 w-auto" />
          </NavLink>
        </div>

        <nav className="hidden items-center justify-self-center gap-3 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex justify-self-end gap-2">
          <Button to="/auth/signin" variant="primary">
            Sign In
          </Button>
          <Button to="/auth/signup" variant="secondary">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;