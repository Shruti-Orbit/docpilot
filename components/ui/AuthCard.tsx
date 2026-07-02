interface AuthCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function AuthCard({
    title,
    subtitle,
    children,
}: AuthCardProps) {
    return (
        <div className="relative w-full max-w-lg rounded-[32px] border border-white/60 bg-white/90 p-10 shadow-2xl backdrop-blur-xl">

            <h1 className="text-center text-5xl font-bold text-slate-900">
                {title}
            </h1>

            <p className="mt-3 text-center text-lg text-slate-500">
                {subtitle}
            </p>

            <div className="mt-8">
                {children}
            </div>

        </div>
    );
}