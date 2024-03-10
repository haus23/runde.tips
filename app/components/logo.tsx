export function Logo() {
  return (
    <div className="flex items-center gap-x-1">
      <svg
        className="h-10 w-10 fill-current"
        role="img"
        aria-label="Haus23 Logo"
      >
        <use href="/img/logo.svg#logo" />
      </svg>
      <span className="text-xl font-medium -translate-y-0.5">runde.tips</span>
    </div>
  );
}
