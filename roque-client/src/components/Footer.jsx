import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo / Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/CAR-logo.svg" alt="Logo" className="h-8 w-auto" />
              <span className="text-sm font-semibold uppercase tracking-wider text-zinc-700">
                CAR
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-zinc-600">
              Aspiring IT professional
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Explore
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Connect
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} Christopher Angelo Roque. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;