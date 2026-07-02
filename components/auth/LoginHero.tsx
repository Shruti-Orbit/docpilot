import {
  ShieldCheck,
  Search,
  Lock,
  FileText,
  Bot,
  Sparkles,
} from "lucide-react";

export default function LoginHero() {
  return (
    <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#170F3D] via-[#3B1E8F] to-[#6D28D9] p-16 text-white">

      {/* Glow */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-violet-500/30 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

            <Sparkles className="h-8 w-8" />

          </div>

          <div>

            <h2 className="text-4xl font-bold">
              DocPilot <span className="text-violet-300">AI</span>
            </h2>

            <p className="mt-2 text-white/70">
              Secure Multi-Workspace AI Assistant
            </p>

          </div>

        </div>

      </div>

      {/* Center */}
      <div className="relative z-10 mt-12">

        <h1 className="max-w-xl text-6xl font-bold leading-tight">

          Intelligent
          <br />
          Document
          <br />
          Retrieval with{" "}
          <span className="text-violet-300">
            AI
          </span>

        </h1>

        <p className="mt-8 max-w-lg text-xl leading-9 text-white/80">

          Upload PDFs, chat with your documents,
          generate summaries and securely manage
          knowledge across multiple workspaces.

        </p>

        {/* Features */}

        <div className="mt-14 space-y-8">

          <div className="flex items-start gap-5">

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

              <ShieldCheck size={28} />

            </div>

            <div>

              <h3 className="text-2xl font-semibold">

                Workspace Isolation

              </h3>

              <p className="mt-1 text-white/70">

                Your data stays private and isolated.

              </p>

            </div>

          </div>

          <div className="flex items-start gap-5">

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

              <Search size={28} />

            </div>

            <div>

              <h3 className="text-2xl font-semibold">

                AI Powered Search

              </h3>

              <p className="mt-1 text-white/70">

                Find answers instantly using RAG.

              </p>

            </div>

          </div>

          <div className="flex items-start gap-5">

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

              <Lock size={28} />

            </div>

            <div>

              <h3 className="text-2xl font-semibold">

                Secure Documents

              </h3>

              <p className="mt-1 text-white/70">

                Enterprise-grade document security.

              </p>

            </div>

          </div>

        </div>

      </div>

     

    </section>
  );
}