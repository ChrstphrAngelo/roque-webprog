import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-slate-50 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-slate-300 bg-slate-100 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-slate-300 lg:p-16">
          <div className="flex w-full max-w-md items-center justify-center rounded-4xl border-2 border-dashed border-slate-400 bg-white/60 p-8 sm:p-10">
            <img
              src="/CAR-logo.svg"
              alt="CAR Logo"
              className="w-full max-w-xs object-contain"
            />
          </div>
        </div>

        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;