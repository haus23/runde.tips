export function Logo() {
  return (
    <div className="flex items-center gap-x-1 text-foreground">
      <svg
        className="h-10 w-10"
        fill="currentColor"
        role="img"
        aria-label="Haus23 Logo"
      >
        <use href="/img/logo.svg#logo" />
      </svg>
      <span className="-translate-y-0.5 font-medium text-xl">runde.tips</span>
    </div>
  );
}
