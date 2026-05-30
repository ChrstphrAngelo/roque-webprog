import Button from '../../components/Button';
import profilePicture from '../../assets/images/Profile-picture.png';
import reactImage from '../../assets/images/React.png';
import ciscoImage from '../../assets/images/Ciscopackettracer.png';
import nodejsImage from '../../assets/images/Nodejs.png';
import mongodbImage from '../../assets/images/Mongodb.png';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Profile header */}
      <section className="border-y-2 border-slate-300 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-slate-400 bg-slate-50 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-slate-100">
              <img
                src={profilePicture}
                alt="Profile Picture"
                className="h-64 w-64 rounded-full object-cover border-4 border-slate-400"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">About Me</p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Christopher Angelo Roque
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I'm an IT student in National University Manila specializing in Mobile and Web Application.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Personal information cards */}
      <section className="border-y-2 border-slate-300 bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Sample</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Personal Information</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-zinc-900">NU 2023-Present</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Education</p>
          </div>
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-zinc-900">Hobbies</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Cycling</p>
          </div>
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-zinc-900">BSIT-MWA</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Program</p>
          </div>
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-zinc-900">Backend Dev</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Role</p>
          </div>
        </div>
      </section>

      {/* More about me + tech */}
      <section className="border-y-2 border-slate-300 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Check this out</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">More about me</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900">Intro</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  I'm a 3rd year IT student at National University Manila, passionate about building web and mobile applications. Juggling academic requirements while working on personal projects to sharpen my development skills.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900">Featured Project</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Developed an online ordering system for Gendai Japanese Restaurant, allowing customers to browse the menu, place orders, and manage their cart. Built with React, Node.js, and MongoDB.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900">Details Block</h3>
                <div className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                  <div>
                    <p className="font-semibold text-zinc-800">Technical Skills:</p>
                    <p>JavaScript, React, Python, Node.js, Tailwind CSS, Git</p>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-800">Soft Skills:</p>
                    <p>Team collaboration, Problem-solving, Time management</p>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-800">Currently Learning:</p>
                    <p>Arduino, Cloud Computing (AWS)</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Tech</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-slate-100">
                <img src={reactImage} alt="React" className="rounded-[1.25rem] w-60 h-60 object-cover" />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-slate-100">
                <img src={ciscoImage} alt="Cisco Packet Tracer" className="rounded-[1.25rem] w-60 h-60 object-cover" />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-slate-100">
                <img src={nodejsImage} alt="Node.js" className="rounded-[1.25rem] w-60 h-60 object-cover" />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-slate-100">
                <img src={mongodbImage} alt="MongoDB" className="rounded-[1.25rem] w-60 h-60 object-cover" />
              </div>
            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;