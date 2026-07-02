export default function GoogleButton() {
  return (
    <button
      type="button"
      className="flex h-14 w-full items-center justify-center rounded-xl border border-slate-300 bg-white text-lg font-medium text-slate-900 transition hover:bg-slate-50"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="mr-3 h-6 w-6"
      />

      Continue with Google
    </button>
  );
}