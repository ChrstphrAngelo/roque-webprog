import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            404 Error
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base mx-auto">
            The link you followed to get here must be broken, or the page has been moved.
          </p>
          <p className="text-[50px]">
            (⊙_⊙)？
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button to="/" variant="primary">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;